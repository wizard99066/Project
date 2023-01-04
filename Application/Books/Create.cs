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
    public class Create
    {

        public class Request : IRequest<bool>
        {
            public string Name { get; set; }
            public List<long> AuthorIds { get; set; }
            public List<long> GenreIds { get; set; }
            public string? Description { get; set; }
            public int? Year { get; set; }
            public List<long> PublishingIds { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Name).NotEmpty().MinimumLength(2);
                RuleFor(r => r.AuthorIds).NotEmpty();
                RuleFor(r => r.GenreIds).NotEmpty();
                RuleFor(r => r.PublishingIds).NotEmpty();
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
                request.Name = request.Name.Trim();
                request.Description = request.Description?.Trim();
                request.AuthorIds = request.AuthorIds.Distinct().ToList();
                request.PublishingIds = request.PublishingIds.Distinct().ToList();
                request.GenreIds = request.GenreIds.Distinct().ToList();

                var genres = _dbContext.Genres.Where(genre => request.GenreIds.Contains(genre.Id)).ToList();
                foreach (var genreId in request.GenreIds)
                {
                    var genre = genres.FirstOrDefault(g => g.Id == genreId);
                    if (genre == null)
                        throw new RestException(System.Net.HttpStatusCode.NotFound, $"Жанр c Id {genreId} не найден.");
                    if (genre.IsDeleted)
                        throw new RestException(System.Net.HttpStatusCode.NotFound, $"Жанр \"{genre.Name}\" не является актуальным.");
                }
                if (request.Year <= 0)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, "Год не может быть отрицательным.");

                var book = new Book
                {
                    Year = request.Year,
                    Name = request.Name,
                    Description = request.Description
                };
                _dbContext.Books.Add(book);
                var bookAuthors = request.AuthorIds.Select(authorId => new AuthorBook { AuthorId = authorId, Book = book });
                var bookGenres = request.GenreIds.Select(genreId => new GenreBook { GenreId= genreId, Book = book });
                var bookPublishings = request.PublishingIds.Select(publishingId => new PublishingBook { PublishingId= publishingId, Book = book });
                _dbContext.AuthorBooks.AddRange(bookAuthors);
                _dbContext.GenreBooks.AddRange(bookGenres);
                _dbContext.PublishingBooks.AddRange(bookPublishings);
                return _dbContext.SaveChanges() > 0;
            }

        }

    }
}
