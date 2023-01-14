using Domain.Context;
using Domain.Helpers.JWT;
using FluentValidation;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Account
{
    public class Logout
    {
        public class Request : IRequest<bool>
        {
            public long SessionId { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.SessionId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Request, bool>
        {
            private readonly AppDbContext _dbContext;
            private readonly UserAccessor _userAccessor;

            public Handler(AppDbContext dbContext, UserAccessor userAccessor)
            {
                _dbContext = dbContext;
                _userAccessor = userAccessor;
            }

            public async Task<bool> Handle(Request request, CancellationToken cancellationToken)
            {
                try
                {
                    var userId = _dbContext.Users.Where(u => u.UserName == _userAccessor.GetCurrentUsername()).Select(u => u.Id).FirstOrDefault();
                    var refreshToken = _dbContext.RefreshTokens.Where(rt => rt.UserId == userId && rt.Id == request.SessionId).FirstOrDefault();
                    if (refreshToken != null)
                    {
                        _dbContext.RefreshTokens.Remove(refreshToken);
                        await _dbContext.SaveChangesAsync();
                    }
                    return true;
                }
                catch (Exception)
                {
                    return true;
                }
            }
        }
    }
}
