using Domain.Context;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Books
{
    public class GetAll
    {

        public class Request : IRequest<string>
    {
    }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
            }
        }

        public class Handler : IRequestHandler<Request, string>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<string> Handle(Request request, CancellationToken cancellationToken)
            {
                
                return "1234";
            }

        }

    }
}
