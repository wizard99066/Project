using Application;
using Application.Books.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Create = Application.UserBooksRead.Create;
using Delete = Application.UserBooksRead.Delete;
using GetPaged = Application.UserBooksRead.GetPaged;

namespace Project.Controllers
{
    public class UserBookReadController : BaseController
    {
        [HttpGet("Create")]
        [Authorize]
        public async Task<bool> Create([FromHeader] Create.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("Delete")]
        [Authorize]
        public async Task<bool> Delete([FromHeader] Delete.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("GetPaged")]
        [Authorize]
        public async Task<PageItems<UserBookDto>> GetPaged([FromHeader] GetPaged.Request request)
        {
            return await Mediator.Send(request);
        }
    }
}
