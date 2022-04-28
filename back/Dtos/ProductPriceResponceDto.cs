using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class ProductPriceResponceDto
    {
        public Decimal Cost { get; set; }
        public Guid ProductId { get; set; }
        public Guid PriceId { get; set; }
    }
}
