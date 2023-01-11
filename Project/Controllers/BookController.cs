using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Books;
using Domain.Models.Books;
using Application;
using Application.Books.Dto;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    public class BookController : BaseController
    {
        [HttpPost("Create")]
        public async Task<bool> Create([FromBody] Create.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpPost("Update")]
        public async Task<bool> Update([FromBody] Update.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("Delete")]
        public async Task<bool> Delete([FromHeader] Delete.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("Restore")]
        public async Task<bool> Restore([FromHeader] Restore.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpPost("GetPages")]
        public async Task<PageItems<BookDto>> GetPaged([FromBody] GetPages.Request request)
        {
            return await Mediator.Send(request);
        }
        [HttpGet("GetById")]
        public async Task<BookDto> GetById([FromHeader] GetById.Request request)
        {
            return await Mediator.Send(request);
        }
    }
}
