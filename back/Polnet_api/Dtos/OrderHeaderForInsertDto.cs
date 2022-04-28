using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class OrderHeaderForInsertDto
    {
        public int Sort { get; set; }
        public string Name { get; set; }
        public Guid OrderId { get; set; }
    }
}
