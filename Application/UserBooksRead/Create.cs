using Domain.Context;
using Domain.Errors;
using Domain.Models.Books;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<bool> Handle(Request request, CancellationToken cancellationToken)
            {
                var userId = Guid.Parse("5bf3415c-b87d-4859-b21f-0e604d8a1730");
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
                return _dbContext.SaveChanges() > 0;
            }

        }
    }
}
