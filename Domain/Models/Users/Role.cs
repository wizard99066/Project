using Microsoft.AspNetCore.Identity;

namespace Domain.Models.Users
{
    public class Role : IdentityRole<Guid>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
