using Application;
using Application.Genres;
using Application.Genres.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Project.Controllers
{
    public class GenreController:BaseController
    {
        [HttpPost("Create")]
        [Authorize(Roles = "admin")]
        public async Task<bool> Create([FromBody] Create.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpPost("Update")]
        [Authorize(Roles = "admin")]
        public async Task<bool> Update([FromBody] Update.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("Delete")]
        [Authorize(Roles = "admin")]
        public async Task<bool> Delete([FromHeader] Delete.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("Restore")]
        [Authorize(Roles = "admin")]
        public async Task<bool> Restore([FromHeader] Restore.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("GetPages")]
        [Authorize(Roles = "admin")]
        public async Task<PageItems<GenreDto>> GetPaged([FromHeader] GetPages.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpPost("Search")]
        public async Task<List<IdNameDto>> Search([FromBody] Search.Request request)
        {
            return await Mediator.Send(request);
        }
    }
}
