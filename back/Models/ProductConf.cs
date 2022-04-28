using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class ProductConf
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string Code { get; set; }
        public string Description { get; set; }
        public int Vat { get; set; }
        public string Jm { get; set; }
        public int Type { get; set; }
        [MaxLength(50)]
        public string CategoryProdId { get; set; }
        public int Sort { get; set; }
        public int Status { get; set; }
        public int GidCdn { get; set; }
        public ICollection<ProductConfElem> ProductConfElems { get; set; } = new List<ProductConfElem>();
        public ICollection<OrderElemConf> OrderElemConfs { get; set; } = new List<OrderElemConf>();

    }
}
