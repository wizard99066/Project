using Application.Account;
using Application.Account.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Project.Controllers
{
    public class AccountController : BaseController
    {
        [HttpPost("login")]
        public async Task<UserDto> Login([FromBody] Login.Request request)
        {
            request.UserAgent = Request.Headers["User-Agent"].ToString();
            request.IP = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            return await Mediator.Send(request);
        }

        [HttpPost("register")]
        public async Task<bool> Register([FromBody] Register.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpPost("refresh")]
        public async Task<UserDto> Refresh([FromBody] Refresh.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpGet("refreshUserData")]
        [Authorize]
        public async Task<UserDto> RefreshUserData([FromHeader] RefreshUserData.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<bool> Logout([FromBody] Logout.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpPost("CreateRole")]
        [Authorize(Roles = "admin")]
        public async Task<bool> CreateRole([FromBody] CreateRole.Request request)
        {
            return await Mediator.Send(request);
        }

        [HttpPost("CreateUser")]
        [Authorize(Roles = "admin")]
        public async Task<bool> CreateUser([FromBody] CreateUser.Request request)
        {
            return await Mediator.Send(request);
        }
    };
}