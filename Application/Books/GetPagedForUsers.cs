using Application.Books.Dto;
using Domain.Context;
using Domain.Helpers.JWT;
using Domain.Models.Users;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Books
{
    public class GetPagedForUsers
    {
        public class Request : IRequest<PageItems<UserBookDto>>
        {
            public string? BookName { get; set; }
            public List<long> Authors { get; set; } = new List<long>();
            public List<long> Genres { get; set; } = new List<long>();
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
                string userName = _userAccessor.GetCurrentUsername();
                var userId = await _dbContext.Users.Where(u => u.UserName == userName).Select(u => u.Id).FirstOrDefaultAsync();
                request.BookName = request.BookName?.Trim().ToLower();

                var query = _dbContext.Books.Where(r => (string.IsNullOrEmpty(request.BookName) || r.Name.Trim().ToLower().Contains(request.BookName)) &&
                                                       (request.Genres.Count == 0 || r.GenreBooks.Any(r => request.Genres.Contains(r.GenreId))) &&
                                                       (request.Authors.Count == 0 || r.AuthorBooks.Any(r => request.Authors.Contains(r.AuthorId))) &&
                                                       (!r.IsDeleted) 
                                                       )
                    .Select(r => new UserBookDto()
                    {
                        NameBook = r.Name,
                        Description = r.Description,
                        Authors = string.Join(", ", r.AuthorBooks.Select(a => $"{a.Author.FirstName} {a.Author.LastName}")),
                        Genres = string.Join(", ", r.GenreBooks.Select(a => a.Genre.Name)),
                        AvatarId = r.AvatarId,
                        Id = r.Id,
                        IsRead = r.UsersBookReads.Any(UserBookReads => UserBookReads.UserId == userId),
                        IsWantToRead = r.UsersBookWantToReads.Any(r => r.UserId == userId),
                        IsToFavorite = r.UsersBookFavorites.Any(r => r.UserId == userId),
                    })
                    .OrderBy(r => r.NameBook);

                var result = await ToPageAsync(query, request.Page, request.PageSize);
                return result;
            }
        }
    }
}
