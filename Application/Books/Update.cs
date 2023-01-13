using Domain.Context;
using Domain.Errors;
using Domain.Models.Books;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using File = Domain.Models.Files.File;


namespace Application.Books
{
    public class Update
    {
        public class Request : IRequest<bool>
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public List<long> AuthorIds { get; set; }
            public List<long> GenreIds { get; set; }
            public string? Description { get; set; }
            public int? Year { get; set; }
            public List<long>? Publishings { get; set; }
            public IFormFile? File { get; set; }
            public bool IsEditAvatar { get; set; }
        }
        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(r => r.Name).MinimumLength(2);
                RuleFor(r => r.AuthorIds).NotEmpty();
                RuleFor(r => r.Id).NotEmpty();
                RuleFor(r=> r.GenreIds).NotEmpty();
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
                var book = _dbContext.Books.Where(b => b.Id == request.Id).FirstOrDefault();
                if (book == null) throw new Exception("Книга не найдена");

                var genres = _dbContext.GenreBooks.Where(genre => genre.BookId == request.Id).ToList();
                var genresToRemove = genres.Where(g=> !request.GenreIds.Contains(g.GenreId)).ToList();
                var genresToAdd = request.GenreIds.Where(g => !genres.Any(gen => gen.GenreId == g)).Select(g => new GenreBook
                {
                    BookId = request.Id,
                    GenreId = g
                }).ToList();

                _dbContext.GenreBooks.RemoveRange(genresToRemove);
                _dbContext.GenreBooks.AddRange(genresToAdd);


               

                var authors = _dbContext.AuthorBooks.Where(author=> request.Id == author.BookId).ToList();
                var authorsToRemove = authors.Where(g => !request.AuthorIds.Contains(g.AuthorId)).ToList();
                var authorsToAdd = request.AuthorIds.Where(a => !authors.Any(ar => ar.AuthorId == a)).Select(a=> new AuthorBook
                {
                    BookId= request.Id,
                    AuthorId=a
                }).ToList();
                _dbContext.AuthorBooks.RemoveRange(authorsToRemove);
                _dbContext.AuthorBooks.AddRange(authorsToAdd);

                File? avatar = null;
                if (request.File != null)
                {
                    MemoryStream ms = new MemoryStream();
                    request.File.CopyTo(ms);
                    avatar =
                        new File
                        {
                            FileExtension = Path.GetExtension(request.File.FileName),
                            FileLength = request.File.Length,
                            FileName = request.File.FileName,
                            ContentType = request.File.ContentType,
                            Content = ms.ToArray(),
                            UploadDate = DateTime.Now
                        };
                }
                if (request.IsEditAvatar)
                {
                    if (book.AvatarId.HasValue)
                    {
                        _dbContext.Files.Remove(new File { Id = book.AvatarId.Value });
                    }
                    book.AvatarId = null;
                    book.Avatar = avatar;
                }


                // var listPublishings = _dbContext.Publishings.ToList();

                book.Year = request.Year.HasValue ? request.Year.Value : 0;
                book.Name = request.Name;
                book.Description = request.Description;
               //book.Publishings = listPublishings;
                _dbContext.Books.Update(book);
                return _dbContext.SaveChanges() > 0;
            }

         
        }
    }
}
