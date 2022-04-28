using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class ProductForReturnDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public decimal Price { get; set; }
        public int Vat { get; set; }
        public string Jm { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
        public int GidCdn { get; set; }
        public Guid CategoryProdId { get; set; }

    }
}
