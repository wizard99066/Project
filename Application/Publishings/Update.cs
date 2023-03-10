using Domain.Context;
using FluentValidation;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Publishings
{
    public class Update
    {
        public class Request : IRequest<bool>
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public string? City { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Name).MinimumLength(2);
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
                // publishing.Id = request.Id;
                publishing.Name = request.Name;
                publishing.Address = request.City;

                // _dbContext.Publishings.Update(publishing);
                return _dbContext.SaveChanges() > 0;
            }


        }
    }
}
