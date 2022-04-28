using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class OrderElemConf
    {
        [Key]
        public Guid Id { get; set; }
        public int Sort { get; set; }
        [MaxLength(20)]
        public string Lp { get; set; }
        public string Description { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string Code { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal Price { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal PricePurchase { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal PriceAfterDiscount { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal PriceBrutto { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal Quantity { get; set; }
        [MaxLength(50)]
        public string Jm { get; set; }
        [MaxLength(10)]
        public string Currency { get; set; }
        public int Vat { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        public Guid OrderId { get; set; }
        [ForeignKey("ProductConfId ")]
        public ProductConf ProductConf { get; set; }
        public Guid ProductConfId { get; set; }
        public Guid OrderHeaderId { get; set; }
        public ICollection<OrderSElemConf> OrderSElemConfs { get; set; } = new List<OrderSElemConf>();

    }
}
