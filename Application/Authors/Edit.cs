using Domain.Context;
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
    public class Edit
    {
        public class Request : IRequest<bool>
        {
            public long Id { get; set; }
            public string? FirstName { get; set; }
            public string LastName { get; set; }
            public DateTime? Birthday { get; set; }
            public List<long> BooksId { get; set; }

        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.LastName).MinimumLength(2);
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
                var listAuthorBooks = _dbContext.AuthorBooks.ToList();

                var author = _dbContext.Authors.Where(b => b.Id == request.Id).FirstOrDefault();
                if ( author == null) 
                    throw new Exception("Автор не найден");
                
                //author.Id = request.Id;
                author.LastName = request.LastName;
                author.FirstName=request.FirstName;
                author.Birthday = request.Birthday;
                author.AuthorBooks = listAuthorBooks;
                _dbContext.Authors.Update(author);
                return _dbContext.SaveChanges() > 0;
            }

            
        }
    }
}
