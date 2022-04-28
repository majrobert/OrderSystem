using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class CurrencyForInsertDto
    {
        public string Name { get; set; }
        public Decimal Exchange { get; set; }
    }
}
