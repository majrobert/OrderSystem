using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class UserForUpdateDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
    }
}
