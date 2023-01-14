using Domain.Context;
using Domain.Errors;
using Domain.Models.Users;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Account
{
    public class Register
    {
        public class Request : IRequest<bool>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.UserName).NotEmpty();
                RuleFor(r => r.Password).NotEmpty();
                RuleFor(r => r.Email).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Request, bool>
        {
            private readonly UserManager<User> _userManager;
            private readonly PasswordHasher<User> _passwordHasher;
            private readonly AppDbContext _dbContext;

            public Handler(UserManager<User> userManager, PasswordHasher<User> passwordHasher, AppDbContext dbContext)
            {
                _userManager = userManager;
                _passwordHasher = passwordHasher;
                _dbContext = dbContext;
            }

            public async Task<bool> Handle(Request request, CancellationToken cancellationToken)
            {
                var checkUserName = new Regex(@"^[a-zA-Z]+$");
                if (!checkUserName.IsMatch(request.UserName))
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Некорректный логин.");
                var checkPassword = new Regex(@"^[a-zA-Z0-9.!@#$%]+$");
                if (!checkPassword.IsMatch(request.Password))
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Некорректный пароль.");
                var checkEmail = new Regex(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
                if (!checkEmail.IsMatch(request.Email))
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Некорректный адрес электронной почты.");
                if (_dbContext.Users.Any(u => u.UserName.ToLower() == request.UserName.ToLower() || u.Email.ToLower() == request.Email.ToLower()))
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Данный логин или адрес электронной почты уже существует в системе.");
                var user = new User
                {
                    UserName = request.UserName,
                    Email = request.Email,
                    EmailConfirmed = true,
                };
                user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

                await _userManager.CreateAsync(user);
                await _userManager.AddToRoleAsync(user, "user");

                return true;
            }

        }
    }
}
