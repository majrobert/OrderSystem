using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class ProductConfForInsertDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int Vat { get; set; }
        public string Jm { get; set; }
        public int Type { get; set; }
        public string CategoryProdId { get; set; }
        public int Sort { get; set; }
        public int Status { get; set; }
    }
}
