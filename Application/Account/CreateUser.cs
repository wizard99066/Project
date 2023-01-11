using Domain.Models.Users;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Account
{
    public class CreateUser
    {
        public class Request : IRequest<bool>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public string Role { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
            }
        }

        public class Handler : IRequestHandler<Request, bool>
        {
            private readonly UserManager<User> _userManager;
            private readonly PasswordHasher<User> _passwordHasher;

            public Handler(
                UserManager<User> userManager,
                PasswordHasher<User> passwordHasher)
            {
                _userManager = userManager;
                _passwordHasher = passwordHasher;
            }

            public async Task<bool> Handle(Request request, CancellationToken cancellationToken)
            {
                User user = new User()
                {
                    UserName = request.UserName
                };

                user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

                await _userManager.CreateAsync(user);
                await _userManager.AddToRoleAsync(user, request.Role);

                return true;
            }

        }
    }
}
