using Application.Books.Dto;
using Application.Books;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.UserBooksWantToRead.Dto;
using Application;
using Application.UserBooksWantToRead;
using Delete = Application.UserBooksWantToRead.Delete;
using Create = Application.UserBooksWantToRead.Create;

namespace Project.Controllers
{
    public class UserBookWantToReadController : BaseController
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
        public async Task<PageItems<UserBookWantToReadDto>> GetPaged([FromHeader] GetPaged.Request request)
        {
            return await Mediator.Send(request);
        }
        
        
    }
}
