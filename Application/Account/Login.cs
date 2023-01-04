using Domain.Context;
using Domain.Models.Books;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Account
{
    public class Login
    {
        public class Request : IRequest<string>
        {
            public long Id { get; internal set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
            }
        }

        public class Handler : IRequestHandler<Request, string>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<string> Handle(Request request, CancellationToken cancellationToken)
            {
                var book = _dbContext.Books.Where(book => book.AuthorBooks.Any(authorBook => authorBook.Author.LastName == "оруэл")).ToList();
                //Book book = new Book();
                //book.Year = 2000;
                //book.Name = "Мы";
                //book.Description = "Замятин";
                //_dbContext.Books.Add(book);
                //_dbContext.SaveChanges();
                //_dbContext.Books.RemoveRange(books);
                //_dbContext.Books.Update(books);
                //_dbContext.SaveChanges();

                return "1234";
            }
            
        }
    }
}
