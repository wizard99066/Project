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
        [HttpPost("test")]
        public async Task<string> Test([FromBody] Login.Request request)
        {
            return await Mediator.Send(request);
        }
    };
}