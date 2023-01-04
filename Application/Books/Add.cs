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

namespace Application.Books
{
    public class Add
    {

        public class Request : IRequest<bool>
        {
            public string Name { get; set; }
            public List<long> AuthorId { get; set; }
            public List<long> GenreId { get; set; }
            public string? Description { get; set; }
            public int? Year { get; set; }
            public List<long> Publishings { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Name).MinimumLength(2);
                RuleFor(r => r.AuthorId).NotEmpty();
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
                var listGenre = _dbContext.Genres.ToList();
                var listAuthor = _dbContext.Authors.ToList();
                var listPublishings= _dbContext.Publishings.ToList();
                //var book = new Book{
                //    Year = request.Year.HasValue ? request.Year.Value : 0,
                //    Name = request.Name,
                //    Description = request.Description,
                //    GenreBooks = listGenre,
                //    AuthorBooks=listAuthor,
                //    Publishings=listPublishings,
                //};
                
                //_dbContext.AddAsync(book);

                return _dbContext.SaveChanges() > 0;
            }

        }

    }
}
