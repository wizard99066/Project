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

namespace Application.Authors
{
    public class Add
    {

        public class Request : IRequest<bool>
        {
            public string? FirstName { get; set; }
            public string LastName { get; set; }
            public DateTime? Birthday { get; set; }
            public List<long> Books { get; set; }

        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.LastName).MinimumLength(2);
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
                //var listAuthorBooks = _dbContext.AuthorBooks.ToList();
                var authorBooks = new List<AuthorBook>();

                var author = new Author
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Birthday = request.Birthday,
                    //AuthorBooks = AuthorBooks,

                };

                request.Books?.ForEach(bookId =>
                 authorBooks.Add(new AuthorBook() { Author = author, BookId = bookId })
                );

                await _dbContext.AddAsync(author);

                _dbContext.AuthorBooks.AddRange(authorBooks);

                return _dbContext.SaveChanges() > 0;
            }

        }

    }
}
