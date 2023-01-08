using Application.Publishing;
using Domain.Models.Books;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application;

namespace Project.Controllers
{
    public class PublishingController:BaseController
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
        public async Task<PageItems<PublishingDto>> GetPages([FromHeader] GetPages.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("GetAll")]
        public async Task<PageItems<Publishing>> GetAll([FromHeader] GetAll.Request request)
        {
            return await Mediator.Send(request);
        }
    }
}
