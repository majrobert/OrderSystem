using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class OrderHeader
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(200)]
        public int Sort { get; set; }
        public string Name { get; set; }

        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        public Guid OrderId { get; set; }
    }
}
