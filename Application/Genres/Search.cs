using Application.Genres.Dto;
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

namespace Application.Genres
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
                var list = _dbContext.Genres.Where(r => (string.IsNullOrEmpty(request.Name) || r.Name.ToLower().Contains(request.Name)) && !r.IsDeleted)
                    .OrderBy(r => r.Name)
                    .Take(10)
                    .Select(r => new IdNameDto
                    {
                        Name = r.Name,
                        Id = r.Id
                    }).ToList();


                  return list;
            }

        }

    }
}
