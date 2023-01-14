using System;
using System.Collections.Generic;

namespace Application.Account.Dto
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public long SessionId { get; set; }
        public string UserName { get; set; }
        public IList<string> Roles { get; set; }
    }
}
