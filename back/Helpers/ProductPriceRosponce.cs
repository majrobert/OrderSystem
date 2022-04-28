using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Helpers
{
    public class ProductPriceRosponce
    {
        public int TotalPages { get; set; }
        public IEnumerable<ProductPrice> productPrice { get; set; }
        public IEnumerable<Product> product { get; set; }
    }
}
