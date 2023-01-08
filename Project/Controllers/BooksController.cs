﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Books;
using Domain.Models.Books;
using Application;

namespace Project.Controllers
{
    public class BooksController : BaseController
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
        public async Task<PageItems<BookDto>> GetPaged([FromHeader] GetPages.Request request)
        {
            return await Mediator.Send(request);
        }

        
    }
}
