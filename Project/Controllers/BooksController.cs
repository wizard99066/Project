using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Books;


namespace Project.Controllers
{
    public class BooksController : BaseController
    {
        [HttpGet("GetAll")]
        public async Task<string> GetAll([FromHeader] GetAll.Request request)
        {
            return await Mediator.Send(request);
        }
        [HttpGet("GetPaged")]
        public async Task<string> GetPaged([FromHeader] GetPaged.Request request)
        {
            return await Mediator.Send(request);
        }
        [HttpPost("Add")]
        public async Task<string> Add([FromHeader] Add.Request request)
        {
            return await Mediator.Send(request);
        }
        [HttpPost("Delete")]
        public async Task<string> Delete([FromHeader] Delete.Request request)
        {
            return await Mediator.Send(request);
        }
        [HttpPost("Edit")]
        public async Task<string> Edit([FromHeader] Edit.Request request)
        {
            return await Mediator.Send(request);
        }
    }
}
