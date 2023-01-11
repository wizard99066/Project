using Application.Account;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Project.Controllers
{

    public class AccountController : BaseController
    {
        [HttpPost("login")]
        public async Task<string> Login([FromBody] Login.Request request)
        {
            return await Mediator.Send(request);
        }
        [HttpPost("CreateRole")]
        public async Task<bool> CreateRole([FromBody] CreateRole.Request request)
        {
            return await Mediator.Send(request);
        }
        [HttpPost("CreateUser")]
        public async Task<bool> CreateUser([FromBody] CreateUser.Request request)
        {
            return await Mediator.Send(request);
        }
    };
}