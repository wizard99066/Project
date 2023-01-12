using Domain.Context;
using Domain.Errors;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Books
{
    public class GetAvatar
    {
        public class Request : IRequest<FileResult>
        {
            public long Id { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Id).NotEmpty();
            }
        }

        public class Handler : ControllerBase, IRequestHandler<Request, FileResult>
        {
            private readonly AppDbContext _dbContext;
            public Handler(AppDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<FileResult> Handle(Request request, CancellationToken cancellationToken)
            {
                var file = _dbContext.Files.Where(f => f.Id == request.Id).FirstOrDefault();
                if (file == null) 
                    throw new RestException(System.Net.HttpStatusCode.NotFound, "Файла с таким Id не существует");
                
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                ms.Write(file.Content, 0, (int)file.FileLength);
                ms.Position = 0;
                return File(ms, file.ContentType, file.FileName + file.FileExtension);
            }

        }

    }
}

