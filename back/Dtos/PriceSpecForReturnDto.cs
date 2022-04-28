using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class PriceSpecForReturnDto
    {

        public decimal Cost { get; set; }
        public Guid CustomerId { get; set; }
        public Guid ProductId { get; set; }
        public int Status { get; set; }
    }
}
