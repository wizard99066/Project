using Microsoft.AspNetCore.Identity;

namespace Domain.Models.Users
{
    public class User : IdentityUser<Guid>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
