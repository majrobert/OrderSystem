using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class Currency
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(10)]
        public string Name { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public Decimal Exchange { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
