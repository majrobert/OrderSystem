using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Helpers
{
    public class ProductConfRosponce
    {
        public int TotalPages { get; set; }
        public IEnumerable<ProductConf> productConf { get; set; }
        public IEnumerable<ProductConfElem> productConfElem { get; set; }

    }
}
