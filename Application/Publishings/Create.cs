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

namespace Application.Publishings
{
    public class Create
    {

        public class Request : IRequest<bool>
        {
            public string Name { get; set; }
            public string? City { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Name).MinimumLength(2);
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
                request.Name = request.Name.Trim().ToLower();
                request.City = request.City?.Trim();
                var cityLower = request.City?.ToLower();
                var anyPublishing = _dbContext.Publishings.Any(r => r.Name == request.Name && r.City == cityLower);
                if (anyPublishing)
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Данное издательство уже присутствует.");
                }

                var publishing = new Publishing
                {
                    Name = request.Name,
                    City = request.City,
                };

                _dbContext.AddAsync(publishing);

                return _dbContext.SaveChanges() > 0;
            }

        }

    }
}
