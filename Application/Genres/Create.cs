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

namespace Application.Genres
{
    public class Create
    {

        public class Request : IRequest<bool>
        {
            public string Name { get; set; }
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
                request.Name =request.Name.Trim().ToLower();
                var anyGenre = _dbContext.Genres.Any(r=>r.Name==request.Name);
                if (anyGenre)
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Данный жанр уже присутствует.");
                }

                var genre = new Genre()
                {
                    Name = request.Name,
                };

                _dbContext.Genres.AddAsync(genre);

                return _dbContext.SaveChanges() > 0;
            }

        }

    }
}
