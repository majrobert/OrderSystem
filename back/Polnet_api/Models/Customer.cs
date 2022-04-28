using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Models
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(50)]
        public string Akronim { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string Phone { get; set; }
        public string Contact { get; set; }
        public string Streed { get; set; }
        public string City { get; set; }
        public string Nip { get; set; }
        public string ZipCode { get; set; }
        public int Status { get; set; }
        public int GidCdn { get; set; }
        [ForeignKey("PriceId ")]
        public Price Price { get; set; }
        public Guid PriceId { get; set; }
        public ICollection<PriceSpec> PriceSpecs { get; set; } = new List<PriceSpec>();
        [ForeignKey("CategoryCustomerId")]
        public CategoryCustomer CategoryCustomer{ get; set; }
        public Guid CategoryCustomerId { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();


    }   
}
