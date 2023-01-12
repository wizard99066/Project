using Application.UserBooksRead.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Delete = Application.UserBooksRead.Delete;
using Create = Application.UserBooksRead.Create;
using GetPaged = Application.UserBooksRead.GetPaged;
using Application;

namespace Project.Controllers
{
    public class UserBookReadController:BaseController
    {
        [HttpGet("Create")]
        public async Task<bool> Create([FromHeader] Create.Request request)
        {
            return await Mediator.Send(request);
        }



        [HttpGet("Delete")]
        public async Task<bool> Delete([FromHeader] Delete.Request request)
        {
            return await Mediator.Send(request);
        }



        [HttpGet("GetPaged")]
        public async Task<PageItems<UserBookReadDto>> GetPaged([FromHeader] GetPaged.Request request)
        {
            return await Mediator.Send(request);
        }
    }
}
