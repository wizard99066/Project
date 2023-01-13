using Application.Authors.Dto;
using Domain.Context;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authors
{
    public class Search
    {
        public class Request : IRequest<List<IdNameDto>>
        {
            public string? Name { get; set; }
            public List<long> Ids { get; set; } = new List<long>();
        }


        public class Handler : IRequestHandler<Request, List<IdNameDto>>
        {
            private readonly AppDbContext _dbContext;

            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<List<IdNameDto>> Handle(Request request, CancellationToken cancellationToken)
            {
                request.Name = request.Name?.Trim().ToLower();
                var list = _dbContext.Authors.Where(r => (string.IsNullOrEmpty(request.Name) || (r.LastName.ToLower() + " " + r.FirstName.ToLower()).Contains(request.Name)) && (request.Ids.Count == 0 || request.Ids.Contains(r.Id)) && (request.Ids.Count != 0 || !r.IsDeleted))
                    .OrderBy(r => r.LastName)
                    .Take(request.Ids.Count == 0 ? 10 : request.Ids.Count)
                    .Select(r => new IdNameDto
                    {
                        LastName = r.LastName,
                        FirstName= r.FirstName,
                        Id = r.Id
                    }).ToList();


                return list;
            }

        }

    }
}
