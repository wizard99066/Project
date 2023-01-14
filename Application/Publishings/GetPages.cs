using Application.Publishings.Dto;
using Domain.Context;
using FluentValidation;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Publishings
{
    public class GetPages
    {
        public class Request : IRequest<PageItems<PublishingDto>>
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

        public class Handler : BaseService<PublishingDto>, IRequestHandler<Request, PageItems<PublishingDto>>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<PageItems<PublishingDto>> Handle(Request request, CancellationToken cancellationToken)
            {
                request.Name = request.Name?.Trim().ToLower();
                var query = _dbContext.Genres
                                             .Where(a => !a.IsDeleted &&
                                              string.IsNullOrEmpty(request.Name) || a.Name.ToLower().Contains(request.Name))
                                             .OrderBy(a => a.Name)
                                             .Select(a => new PublishingDto()
                                             {
                                                 Name = a.Name,
                                                 isDeleted = a.IsDeleted
                                             });
                var result = await ToPageAsync(query, request.Page, request.PageSize);
                return result;
            }
        }
    }
}
