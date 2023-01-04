using Domain.Context;
using Domain.Errors;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authors
{
    public class Restore
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
                var author = await _dbContext.Authors.Where(b => b.Id == request.Id).FirstOrDefaultAsync(cancellationToken);

                if (author == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Автор не найден.");

                author.IsDeleted = false;

                return _dbContext.SaveChanges() > 0;
            }
        }
    }
}
