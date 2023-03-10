using Domain.Context;
using Domain.Errors;
using Domain.Models.Books;
using FluentValidation;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authors
{
    public class Create
    {
        public class Request : IRequest<bool>
        {
            public string? FirstName { get; set; }
            public string LastName { get; set; }
            public DateTime Birthday { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.LastName).NotEmpty().MinimumLength(2);
                RuleFor(r => r.Birthday).NotEmpty();
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
                request.FirstName = request.FirstName?.Trim();
                request.LastName = request.LastName.Trim();
                var lowerFirstName = request.FirstName?.ToLower();
                var anyAuthor = _dbContext.Authors
                    .Any(a => a.FirstName.ToLower() == lowerFirstName && a.LastName.ToLower() == request.LastName.ToLower() &&
                    a.Birthday == request.Birthday.Date);
                if (anyAuthor)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Данный автор уже присутствует.");

                var author = new Author
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Birthday = request.Birthday.Date,
                };

                await _dbContext.Authors.AddAsync(author);

                return _dbContext.SaveChanges() > 0;
            }
        }
    }
}
