using Domain.Context;
using Domain.Errors;
using Domain.Helpers.JWT;
using Domain.Models.Books;
using FluentValidation;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserBooksRead
{
    public class Create
    {
        public class Request : IRequest<bool>
        {
            public long BookId { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.BookId).NotEmpty();
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
                var userId = _dbContext.Users.Where(u => u.UserName == _userAccessor.GetCurrentUsername()).Select(u => u.Id).FirstOrDefault();
                var anyBook = _dbContext.UserBookReads
                    .Any(UserBookReads => UserBookReads.BookId == request.BookId && UserBookReads.UserId == userId);
                if (anyBook)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Данная книга уже присутствует в списке.");
                var userBookReads = new UserBookRead()
                {
                    BookId = request.BookId,
                    UserId = userId
                };
                await _dbContext.UserBookReads.AddAsync(userBookReads);
                _dbContext.UserBookWantToReads.RemoveRange(_dbContext.UserBookWantToReads.Where(UserBookReads => UserBookReads.BookId == request.BookId && UserBookReads.UserId == userId));
                return _dbContext.SaveChanges() > 0;
            }

        }
    }
}
