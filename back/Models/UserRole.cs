


using Microsoft.AspNetCore.Identity;
using System;

namespace Polnet_api.Models
{
    public class UserRole : IdentityUserRole<string>
    {
        public virtual AppUser AppUser { get; set; }
        public virtual Role Role { get; set; }
    }
}
