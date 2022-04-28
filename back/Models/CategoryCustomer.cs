using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class CategoryCustomer
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public int Sort { get; set; }
        public int Status { get; set; }
        public ICollection<Customer> Customers { get; set; } = new List<Customer>();

    }
}
