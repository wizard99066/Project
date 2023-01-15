using Application;
using Application.Books.Dto;
using Application.UserBooksFavorite;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Project.Controllers
{
    public class UserBookFavoriteController : BaseController
    {
        [HttpGet("Create")]
        [Authorize(Roles = "user")]
        public async Task<bool> Create([FromHeader] Create.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("Delete")]
        [Authorize(Roles = "user")]
        public async Task<bool> Delete([FromHeader] Delete.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("GetPaged")]
        [Authorize(Roles = "user")]
        public async Task<PageItems<UserBookDto>> GetPaged([FromHeader] GetPaged.Request request)
        {
            return await Mediator.Send(request);
        }

    }
}
