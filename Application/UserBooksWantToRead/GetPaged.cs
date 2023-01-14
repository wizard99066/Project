using Application.Books.Dto;
using Application.UserBooksWantToRead.Dto;
using Domain.Context;
using Domain.Helpers.JWT;
using FluentValidation;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserBooksWantToRead
{
    public class GetPaged
    {
        public class Request : IRequest<PageItems<UserBookDto>>
        {

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

        public class Handler : BaseService<UserBookDto>, IRequestHandler<Request, PageItems<UserBookDto>>
        {
            private readonly AppDbContext _dbContext;
            private readonly UserAccessor _userAccessor;
            public Handler(AppDbContext dbContext, UserAccessor userAccessor)
            {
                _dbContext = dbContext;
                _userAccessor = userAccessor;
            }

            public async Task<PageItems<UserBookDto>> Handle(Request request, CancellationToken cancellationToken)
            {
                var query = _dbContext.UserBookWantToReads
                    .Where(a => a.User.UserName == _userAccessor.GetCurrentUsername())
                    .OrderBy(a => a.Book.Name)
                    .Select(r => new UserBookDto()
                    {
                        NameBook = r.Book.Name,
                        Description = r.Book.Description,
                        Authors = string.Join(", ", r.Book.AuthorBooks.Select(a => $"{a.Author.FirstName} {a.Author.LastName}")),
                        Genres = string.Join(", ", r.Book.GenreBooks.Select(a => a.Genre.Name)),
                        AvatarId = r.Book.AvatarId,
                        Id = r.BookId,
                        IsRead = r.Book.UsersBookReads.Any(b => b.UserId == r.UserId),
                        IsWantToRead = true,
                        IsToFavorite = r.Book.UsersBookFavorites.Any(b => b.UserId == r.UserId),
                    });
                var result = await ToPageAsync(query, request.Page, request.PageSize);
                return result;
            }
        }
    }
}