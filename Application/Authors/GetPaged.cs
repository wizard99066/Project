using Application.Authors.Dto;
using Domain.Context;
using FluentValidation;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authors
{
    public class GetPaged
    {
        public class Request : IRequest<PageItems<AuthorDto>>
        {
            public string? FirstName { get; set; }
            public string? LastName { get; set; }
            public DateTime? Birthday { get; set; }
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

        public class Handler : BaseService<AuthorDto>, IRequestHandler<Request, PageItems<AuthorDto>>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<PageItems<AuthorDto>> Handle(Request request, CancellationToken cancellationToken)
            {
                request.FirstName = request.FirstName?.Trim().ToLower();
                request.LastName = request.LastName?.Trim().ToLower();
                request.Birthday = request.Birthday?.Date;
                var query = _dbContext.Authors
                    .Where(a => string.IsNullOrEmpty(request.FirstName) || a.FirstName.ToLower().Contains(request.FirstName))
                    .Where(a => string.IsNullOrEmpty(request.LastName) || a.LastName.ToLower().Contains(request.LastName))
                    .Where(a => request.Birthday == null || a.Birthday < request.Birthday)
                    .OrderBy(a => a.LastName).ThenBy(a => a.FirstName).ThenBy(a => a.Birthday)
                    .Select(a => new AuthorDto
                    {
                        Id = a.Id,
                        FirstName = a.FirstName,
                        LastName = a.LastName,
                        Birthday = a.Birthday.HasValue ? a.Birthday.Value.ToString("dd.MM.yyyy") : null,
                        isDeleted = a.IsDeleted
                    });
                var result = await ToPageAsync(query, request.Page, request.PageSize);
                return result;
            }
        }
    }
}
