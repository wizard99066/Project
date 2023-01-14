using Domain.Context;
using Domain.Errors;
using Domain.Helpers.JWT;
using FluentValidation;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserBooksRead
{
    public class Delete
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
                var book = _dbContext.UserBookReads.Where(b => b.BookId == request.BookId && b.UserId == userId).FirstOrDefault();

                if (book == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Книги нет в списке.");

                _dbContext.UserBookReads.Remove(book);

                return _dbContext.SaveChanges() > 0;
            }
        }
    }
}
