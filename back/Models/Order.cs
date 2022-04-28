using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }
        public int Number { get; set; }
        [MaxLength(50)]
        public string NumberYear { get; set; }
        public int Year { get; set; }
        [MaxLength(200)]
        public string Description { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateLimit { get; set; }
        public DateTime DateReali { get; set; }
        public int Status { get; set; }
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
        public Guid CustomerId { get; set; }
        public Guid CustomerDId { get; set; }

        [ForeignKey("CurrencyId")]
        public Currency  Currency { get; set; }
        public Guid CurrencyId { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal Exchange { get; set; }
        public string Series { get; set; }
        public string UserId { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal PricePurchase { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal Value { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal ValueBrutto { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal Discount { get; set; }
        public int GidCdn { get; set; }

        public ICollection<OrderElemConf> OrderElemConfs { get; set; } = new List<OrderElemConf>();
        public ICollection<OrderElem> OrderElem { get; set; } = new List<OrderElem>();
        public ICollection<OrderElemHand> OrderElemHand { get; set; } = new List<OrderElemHand>();
        public ICollection<OrderHeader> OrderHeader { get; set; } = new List<OrderHeader>();



    }
}
