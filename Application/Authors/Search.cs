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
                var list = _dbContext.Authors.Where(r => (string.IsNullOrEmpty(request.Name) || r.LastName.ToLower().Contains(request.Name) || r.FirstName.ToLower().Contains(request.Name)) && !r.IsDeleted)
                    .OrderBy(r => r.LastName)
                    .Take(10)
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
