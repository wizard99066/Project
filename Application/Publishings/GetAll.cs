using Domain.Context;
using Domain.Models.Books;
using FluentValidation;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace Application.Publishings
{
    public class GetAll
    {

        public class Request : IRequest<PageItems<Publishing>>
        {
            public string? Name { get; set; }
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

        public class Handler : BaseService<Publishing>, IRequestHandler<Request, PageItems<Publishing>>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<PageItems<Publishing>> Handle(Request request, CancellationToken cancellationToken)
            {
                request.Name = request.Name?.Trim().ToLower();
                var query = _dbContext.Publishings
                    .Where(a => string.IsNullOrEmpty(request.Name) || a.Name.ToLower().Contains(request.Name))
                    .OrderBy(a => a.Name);
                var result = await ToPageAsync(query, request.Page, request.PageSize);
                return result;
            }
        }


    }
}
