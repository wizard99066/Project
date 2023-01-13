using Application;
using Application.Authors;
using Application.Authors.Dto;


using Domain.Models.Books;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Project.Controllers
{
    public class AuthorController : BaseController
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

        [HttpGet("GetPaged")]
        public async Task<PageItems<AuthorDto>> GetPaged([FromHeader] GetPaged.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("GetAllPaged")]
        public async Task<PageItems<Author>> GetAllPaged([FromHeader] GetAllPaged.Request request)
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
