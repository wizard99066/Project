using Application.Account.Dto;
using Domain.Context;
using Domain.Helpers.JWT;
using Domain.Models.Users;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Account
{
    public class RefreshUserData
    {
        public class Request : IRequest<UserDto>
        {
        }

        public class RequestValidator : AbstractValidator<UserDto>
        {
            public RequestValidator()
            {
            }
        }

        public class Handler : IRequestHandler<Request, UserDto>
        {
            private readonly AppDbContext _dbContext;
            private readonly UserAccessor _userAccessor;
            private readonly UserManager<User> _userManager;

            public Handler(AppDbContext dbContext, UserAccessor userAccessor, UserManager<User> userManager)
            {
                _dbContext = dbContext;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<UserDto> Handle(Request request, CancellationToken cancellationToken)
            {
                string userName = _userAccessor.GetCurrentUsername();
                var user = await _dbContext.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();
                if (user == null)
                    return null;
                var roles = await _userManager.GetRolesAsync(user);
                return new UserDto
                {
                    UserName = user.UserName,
                    Roles = roles,
                };
            }
        }
    }
}
