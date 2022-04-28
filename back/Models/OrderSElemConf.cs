using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class OrderSElemConf
    {
        [Key]
        public Guid Id { get; set; }
        public int Sort { get; set; }
        [MaxLength(20)]
        public string Lp { get; set; }
        [MaxLength(400)]
        public string Description { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string Code { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal PricePurchase { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal Price { get; set; }
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
        [ForeignKey("OrderElemConfId")]
        public OrderElemConf OrderElemConf { get; set; }
        public Guid OrderElemConfId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
    }
}
