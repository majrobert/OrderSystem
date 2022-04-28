using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class ProductConfElemForInsertDto
    {
        public decimal quantity { get; set; }
        public int Sort { get; set; }
        public int Status { get; set; }
        public Guid ProductConfId { get; set; }
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
    }
}
