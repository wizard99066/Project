using Application.Account.Dto;
using Domain.Context;
using Domain.Errors;
using Domain.Helpers.JWT;
using Domain.Models.Users;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Account
{
    public class Login
    {
        public class Request : IRequest<UserDto>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public string? IP { get; set; }
            public string? UserAgent { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Request, UserDto>
        {
            private readonly AppDbContext _dbContext;
            private readonly PasswordHasher<User> _passwordHasher;
            private readonly UserManager<User> _userManager;
            private readonly JwtGenerator _jwtGenerator;

            public Handler(AppDbContext dbContext, PasswordHasher<User> passwordHasher, UserManager<User> userManager, JwtGenerator jwtGenerator)
            {
                _dbContext = dbContext;
                _passwordHasher = passwordHasher;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserDto> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _dbContext.Users.Where(u => u.UserName == request.UserName).FirstOrDefaultAsync();
                if (user == null)
                    throw new RestException(HttpStatusCode.InternalServerError, "Неправильный логин или пароль.");
                var roles = await _userManager.GetRolesAsync(user);

                if (user.LockoutEnd != null)
                {
                    if (user.LockoutEnd > DateTime.Now)
                    {
                        throw new RestException(HttpStatusCode.Locked, $"Вход в учётную запись заблокирован до {user.LockoutEnd.Value.ToString("dd.MM.yyyy HH:mm:ss")}");
                    }
                    else
                    {
                        user.AccessFailedCount = 0;
                        user.LockoutEnd = null;
                    }
                }

                if (_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
                {
                    if (user.UserName != "admin")
                    {
                        user.AccessFailedCount += 1;
                        var limit = 5;

                        if (user.AccessFailedCount >= limit)
                        {
                            var time = 15;
                            user.LockoutEnd = DateTime.Now.AddMinutes(time);
                        }
                        await _dbContext.SaveChangesAsync();
                    }
                    throw new RestException(HttpStatusCode.InternalServerError, "Неправильный логин или пароль.");
                }
                else
                {
                    if (user.AccessFailedCount != 0)
                        user.AccessFailedCount = 0;
                }

                var refreshToken = _jwtGenerator.GenerateRefreshToken();
                var token = new RefreshToken
                {
                    User = user,
                    Value = refreshToken,
                    IP = request.IP,
                    UserAgent = request.UserAgent,
                    Date = DateTime.Now
                };
                _dbContext.RefreshTokens.Add(token);
                await _dbContext.SaveChangesAsync();

                return new UserDto
                {
                    Id = user.Id,
                    Token = _jwtGenerator.CreateTokenWithRoles(user, roles.ToList()),
                    RefreshToken = refreshToken,
                    SessionId = token.Id,
                    UserName = user.UserName,
                    Roles = roles,
                };

            }
        }
    }
}
