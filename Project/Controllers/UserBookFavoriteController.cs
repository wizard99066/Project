using Application;
using Application.UserBooksFavorite;
using Application.UserBooksFavorite.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Project.Controllers
{
    public class UserBookFavoriteController : BaseController
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
        public async Task<PageItems<UserBookFavoriteDto>> GetPaged([FromHeader] GetPaged.Request request)
        {
            return await Mediator.Send(request);
        }

    }
}
