using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class PriceSpec
    {
        [Column(TypeName = "decimal(18, 4)")]
        public decimal Cost { get; set; }
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
        public Guid CustomerId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        public int Status { get; set; }
    }
}
