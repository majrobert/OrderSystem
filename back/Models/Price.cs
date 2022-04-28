using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class Price
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public Decimal Margin { get; set; }
        public int Sort { get; set; }
        public int Status { get; set; }
   
}
}
