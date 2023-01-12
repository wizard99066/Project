using Application;
using Application.Genres;
using Application.Genres.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Project.Controllers
{
    public class GenreController:BaseController
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

        [HttpGet("GetPages")]
        public async Task<PageItems<GenreDto>> GetPaged([FromHeader] GetPages.Request request)
        {
            return await Mediator.Send(request);
        }
        [HttpGet("Search")]
        public async Task<List<IdNameDto>> Search([FromHeader] Search.Request request)
        {
            return await Mediator.Send(request);
        }



    }
}
