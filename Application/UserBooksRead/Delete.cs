using Domain.Context;
using Domain.Errors;
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
    public class Delete
    {
        public class Request : IRequest<bool>
        {
            public long Id { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Id).NotEmpty();
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
                var book = _dbContext.UserBookReads.Where(b => b.Id == request.Id && b.UserId == userId).FirstOrDefault();

                if (book == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Книги нет в списке.");

                _dbContext.UserBookReads.Remove(book);

                return _dbContext.SaveChanges() > 0;
            }
        }
    }
}
