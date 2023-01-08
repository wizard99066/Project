using Domain.Context;
using Domain.Errors;
using FluentValidation;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authors
{
    public class Update
    {
        public class Request : IRequest<bool>
        {
            public long Id { get; set; }
            public string? FirstName { get; set; }
            public string LastName { get; set; }
            public DateTime? Birthday { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.LastName).NotEmpty().MinimumLength(2);
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
                request.FirstName = request.FirstName?.Trim();
                request.LastName = request.LastName.Trim();
                var lowerFirstName = request.FirstName?.ToLower();
                var author = _dbContext.Authors.Where(b => b.Id == request.Id).FirstOrDefault();
                if (author == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Автор не найден");
                var anyAuthor = _dbContext.Authors
                   .Any(a => a.Id != request.Id && a.FirstName.ToLower() == lowerFirstName && a.LastName.ToLower() == request.LastName.ToLower() && a.Birthday == request.Birthday);
                if (anyAuthor)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Данный автор уже присутствует.");
                author.LastName = request.LastName;
                author.FirstName = request.FirstName;
                author.Birthday = request.Birthday?.Date;
                //_dbContext.Authors.Update(author);
                return _dbContext.SaveChanges() > 0;
            }
        }
    }
}
