using Application.UserBooksFavorite.Dto;
using Application.UserBooksRead.Dto;
using Domain.Context;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserBooksRead
{
    public class GetPaged
    {
        public class Request : IRequest<PageItems<UserBookReadDto>>
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

        public class Handler : BaseService<UserBookReadDto>, IRequestHandler<Request, PageItems<UserBookReadDto>>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<PageItems<UserBookReadDto>> Handle(Request request, CancellationToken cancellationToken)
            {

                var userId = Guid.Parse("5bf3415c-b87d-4859-b21f-0e604d8a1730");
                var query = _dbContext.UserBookReads
                    .Where(a => a.UserId == userId)
                    .OrderBy(a => a.Book.Name)
                    .Select(a => new UserBookReadDto
                    {

                        NameBook = a.Book.Name,
                        LastNameAuthor = string.Join(", ", a.Book.AuthorBooks.Select(ab => ab.Author.LastName)),
                        Avatar = a.Book.Avatar
                    });
                var result = await ToPageAsync(query, request.Page, request.PageSize);
                return result;
            }
        }
    }
}

