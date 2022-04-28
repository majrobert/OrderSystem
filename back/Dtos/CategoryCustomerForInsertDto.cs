using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class CategoryCustomerForInsertDto
    {
        public string Name { get; set; }
        public int Sort { get; set; }
        public int Status { get; set; }
    }
}
