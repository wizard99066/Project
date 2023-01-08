﻿using Domain.Context;
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
    public class GetAll
    {

        public class Request : IRequest<PageItems<Genre>>
        {
            public string? NameGenre { get; set; }
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

        public class Handler : BaseService<Genre>, IRequestHandler<Request, PageItems<Genre>>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<PageItems<Genre>> Handle(Request request, CancellationToken cancellationToken)
            {
                request.NameGenre = request.NameGenre?.Trim().ToLower();
                 var query = _dbContext.Genres
                     .Where(a => string.IsNullOrEmpty(request.NameGenre) || a.Name.ToLower().Contains(request.NameGenre))
                     .OrderBy(a => a.Name);
                var result = await ToPageAsync(query, request.Page, request.PageSize);
                return result;
            }
        }

    }
}
