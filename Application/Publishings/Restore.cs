using Domain.Context;
using FluentValidation;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Publishings
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

                var publishing = _dbContext.Publishings.Where(b => b.Id == request.Id).FirstOrDefault();

                if (publishing == null) throw new Exception("Издательство не найдено");

                publishing.IsDeleted = true;

                return _dbContext.SaveChanges() > 0;
            }

        }
    }
}
