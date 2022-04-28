using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class ProductConfElem
    {
        [Key]
        public Guid Id { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal quantity { get; set; }
        public int Sort { get; set; }
        public int Status { get; set; }
        [ForeignKey("ProductConfId")]
        public ProductConf ProductConf { get; set; }
        public Guid ProductConfId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        public string Description { get; set; }
        [MaxLength(100)]
        public string Code { get; set; }
    }
}
