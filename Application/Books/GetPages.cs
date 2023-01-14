using Application.Books.Dto;
using Domain.Context;
using FluentValidation;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Books
{
    public class GetPages
    {
        public class Request : IRequest<PageItems<BookDto>>
        {
            public string? Name { get; set; }
            public List<long>? GenreId { get; set; }
            public List<long>? AuthorId { get; set; }
            public int Page { get; set; }
            public int PageSize { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.Page).NotEmpty().LessThanOrEqualTo(10000);
                RuleFor(x => x.PageSize).NotEmpty().LessThanOrEqualTo(10000);
            }
        }

        public class Handler : BaseService<BookDto>, IRequestHandler<Request, PageItems<BookDto>>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<PageItems<BookDto>> Handle(Request request, CancellationToken cancellationToken)
            {
                request.Name = request.Name?.Trim().ToLower();

                var query = _dbContext.Books.Where(r => (string.IsNullOrEmpty(request.Name) || r.Name.Trim().ToLower().Contains(request.Name)) &&
                                                       (request.GenreId == null || request.GenreId.Count == 0 || r.GenreBooks.Any(r => request.GenreId.Contains(r.GenreId))) &&
                                                       (request.AuthorId == null || request.AuthorId.Count == 0 || r.AuthorBooks.Any(r => request.AuthorId.Contains(r.AuthorId))))
                    .Select(r => new BookDto()
                    {
                        NameBook = r.Name,
                        Id = r.Id,
                        LastNameAuthor = string.Join(", ", r.AuthorBooks.Select(a => $"{a.Author.FirstName} {a.Author.LastName}")),
                        Genre = string.Join(", ", r.GenreBooks.Select(g => g.Genre.Name)),
                        Description = r.Description,
                        IsDeleted = r.IsDeleted,
                        GenresId = r.GenreBooks.Select(r => r.GenreId).ToList(),
                        AuthorsId = r.AuthorBooks.Select(r => r.AuthorId).ToList(),
                        AvatarId = r.AvatarId
                    })
                    .OrderBy(r => r.IsDeleted).ThenBy(r => r.NameBook);

                var result = await ToPageAsync(query, request.Page, request.PageSize);
                return result;
            }
        }
    }
}

