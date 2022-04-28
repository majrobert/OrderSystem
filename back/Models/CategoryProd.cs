using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class CategoryProd
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public string Details { get; set; }
        public int Sort { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
       
    }
}
