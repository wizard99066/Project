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
    public class Edit
    {
        public class Request : IRequest<bool>
        {
            public long Id { get; set; }
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
                var listGenre = _dbContext.Genres.ToList();
                var listAuthor = _dbContext.Authors.ToList();
                var listPublishings = _dbContext.Publishings.ToList();
                var book = _dbContext.Books.Where(b => b.Id== request.Id).FirstOrDefault();
                if (book == null) throw new Exception("Книга не найдена");
                book.Id = request.Id;
                book.Year = request.Year.HasValue ? request.Year.Value : 0;
                book.Name = request.Name;
                book.Description = request.Description;
                   book.GenreBooks = listGenre;
                book.AuthorBooks = listAuthor;
               book.Publishings = listPublishings;
                _dbContext.Books.Update(book);
                return _dbContext.SaveChanges() > 0;
            }

         
        }
    }
}
