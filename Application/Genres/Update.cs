using Domain.Context;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Genres
{
    public class Update
    {
        public class Request : IRequest<bool>
        {
            public string Name { get; set; }
            public long Id { get; set; }


        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Name).MinimumLength(2);
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
                
                var genre = _dbContext.Genres.Where(b => b.Id == request.Id).FirstOrDefault();
                if (genre == null) throw new Exception("Жанр не найден");
                //genre.Id = request.Id;
                genre.Name = request.Name;
               // _dbContext.Genres.Update(genre);
                return _dbContext.SaveChanges() > 0;
            }

            
        }
    }
}
