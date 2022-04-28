using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class ProductPrice
    {
        [Column(TypeName = "decimal(18, 4)")]
        public Decimal Cost{ get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        [ForeignKey("PriceId")]
        public Price Price { get; set; }
        public Guid PriceId { get; set; }

    }
}
