using Application.Account.Dto;
using Domain.Context;
using Domain.Errors;
using Domain.Helpers.JWT;
using Domain.Models.Users;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Account
{
    public class Refresh
    {
        public class Request : IRequest<UserDto>
        {
            public string Token { get; set; }
            public long SessionId { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.Token).NotEmpty();
                RuleFor(x => x.SessionId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Request, UserDto>
        {
            private readonly AppDbContext _dbContext;
            private readonly UserManager<User> _userManager;
            private readonly JwtGenerator _jwtGenerator;

            public Handler(AppDbContext dbContext, UserManager<User> userManager, JwtGenerator jwtGenerator)
            {
                _dbContext = dbContext;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserDto> Handle(Request request, CancellationToken cancellationToken)
            {
                try
                {
                    _jwtGenerator.ValidateToken(request.Token);
                    return null;
                }
                catch (Exception e)
                {
                    if (e.Message == "Token expired")
                    {
                        var userName = _jwtGenerator.GetUserameFromExpiredToken(request.Token);

                        if (userName == null)
                            throw new RestException(System.Net.HttpStatusCode.Forbidden, "Невалидный RefreshToken");

                        var user = await _userManager.FindByNameAsync(userName);
                        var userRefreshToken = _dbContext.RefreshTokens.Where(rt => rt.User.Id == user.Id && rt.Id == request.SessionId).FirstOrDefault();

                        if (userRefreshToken != null)
                        {
                            var newRefreshToken = _jwtGenerator.GenerateRefreshToken();
                            userRefreshToken.Value = newRefreshToken;
                            _dbContext.RefreshTokens.Update(userRefreshToken);
                            await _dbContext.SaveChangesAsync();
                            var roles = await _userManager.GetRolesAsync(user);

                            return new UserDto
                            {
                                Token = _jwtGenerator.CreateTokenWithRoles(user, roles.ToList()),
                                RefreshToken = newRefreshToken,
                                UserName = user.UserName,
                                SessionId = userRefreshToken.Id,
                                Roles = roles,
                                Id = user.Id
                            };
                        }
                        else
                            throw new RestException(System.Net.HttpStatusCode.Forbidden, "Невалидный RefreshToken");
                    }
                    else
                        throw;
                }
            }
        }
    }
}
