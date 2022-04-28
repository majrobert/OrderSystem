using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class OrderElemForInsertDto
    {
        public int Sort { get; set; }
        public string Lp { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal Price { get; set; }
        public decimal PricePurchase { get; set; }
        public decimal PriceAfterDiscount { get; set; }
        public decimal PriceBrutto { get; set; }
        public decimal Quantity { get; set; }
        public string Jm { get; set; }
        public string Currency { get; set; }
        public int Vat { get; set; }
        public int Type { get; set; }
        public Guid OrderId { get; set; }
        public Guid OrderHeaderId { get; set; }
        public Guid ProductId { get; set; }
        public int Status { get; set; }
        public string Typ { get; set; }

    }
}
