using Application.Books.Dto;
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
    public class GetById
    {
        public class Request : IRequest<BookDto>
        {
            public long BookId { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.BookId).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Request, BookDto>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<BookDto> Handle(Request request, CancellationToken cancellationToken)
            {

                var book = _dbContext.Books.Where(r => r.Id == request.BookId)
                     .Select(r => new BookDto
                     {
                         NameBook = r.Name,
                         Description = r.Description,
                         LastNameAuthor = string.Join(", ", r.AuthorBooks.Select(a => $"{a.Author.FirstName} {a.Author.LastName}"))
                     })
                     .FirstOrDefault();//первая запись или null вернется
                return book;
            }
        }
    }
}