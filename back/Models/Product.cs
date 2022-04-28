using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(200)]
        public string  Name { get; set; }
        public string Description { get; set; }
        [MaxLength(100)]
        public string Code { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal Price { get; set; }
        [MaxLength(50)]
        public string Jm { get; set; }
        public int Vat { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
        public int GidCdn { get; set; }
        [ForeignKey("CategoryProdId")]
        public CategoryProd  CategoryProd { get; set; }
        public Guid CategoryProdId { get; set; }
        public ICollection<ProductPrice> ProductPrices { get; set; } = new List<ProductPrice>();
        public ICollection<PriceSpec> PriceSpecs { get; set; } = new List<PriceSpec>();
        public ICollection<ProductConfElem> ProductConfElems { get; set; } = new List<ProductConfElem>();
        public ICollection<OrderElem> OrderElems { get; set; } = new List<OrderElem>();
        public ICollection<OrderSElemConf> OrderSElemConfs { get; set; } = new List<OrderSElemConf>();

    }
}
