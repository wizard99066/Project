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

namespace Application.Books
{
    public class Update
    {
        public class Request : IRequest<bool>
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public List<long> AuthorId { get; set; }
            public List<long> GenreId { get; set; }
            public string? Description { get; set; }
            public int? Year { get; set; }
            public List<long>? Publishings { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Name).MinimumLength(2);
                RuleFor(r => r.AuthorId).NotEmpty();
                RuleFor(r => r.Id).NotEmpty();
                RuleFor(r=> r.GenreId).NotEmpty();
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
                var book = _dbContext.Books.Where(b => b.Id == request.Id).FirstOrDefault();
                if (book == null) throw new Exception("Книга не найдена");

                var genres = _dbContext.GenreBooks.Where(genre => genre.BookId == request.Id).ToList();
                var genresToRemove = genres.Where(g=> !request.GenreId.Contains(g.GenreId)).ToList();
                var genresToAdd = request.GenreId.Where(g => !genres.Any(gen => gen.GenreId == g)).Select(g => new GenreBook
                {
                    BookId = request.Id,
                    GenreId = g
                }).ToList();

                _dbContext.GenreBooks.RemoveRange(genresToRemove);
                _dbContext.GenreBooks.AddRange(genresToAdd);


               

                var authors = _dbContext.AuthorBooks.Where(author=> request.Id == author.BookId).ToList();
                var authorsToRemove = authors.Where(g => !request.GenreId.Contains(g.AuthorId)).ToList();
                var authorsToAdd = request.AuthorId.Where(a => !authors.Any(ar => ar.AuthorId == a)).Select(a=> new AuthorBook
                {
                    BookId= request.Id,
                    AuthorId=a
                }).ToList();
                _dbContext.AuthorBooks.RemoveRange(authorsToRemove);
                _dbContext.AuthorBooks.AddRange(authorsToAdd);

                  
               // var listPublishings = _dbContext.Publishings.ToList();
                
                book.Year = request.Year.HasValue ? request.Year.Value : 0;
                book.Name = request.Name;
                book.Description = request.Description;
               //book.Publishings = listPublishings;
                _dbContext.Books.Update(book);
                return _dbContext.SaveChanges() > 0;
            }

         
        }
    }
}
