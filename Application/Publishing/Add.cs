using Domain.Context;
using Domain.Models.Books;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Publishing
{
    public class Add
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

                var publishing = new Publishings
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
