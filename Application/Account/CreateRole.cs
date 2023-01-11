using Domain.Models.Users;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Account
{
    public class CreateRole
    {
        public class Request : IRequest<bool>
        {
            public string Name { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
            }
        }

        public class Handler : IRequestHandler<Request, bool>
        {
            private readonly RoleManager<Role> _roleManager;

            public Handler(RoleManager<Role> roleManager)
            {
                _roleManager = roleManager;
            }

            public async Task<bool> Handle(Request request, CancellationToken cancellationToken)
            {
                var role = new Role
                {
                    Name = request.Name
                };

                await _roleManager.CreateAsync(role);

                return true;
            }

        }
    }
}
