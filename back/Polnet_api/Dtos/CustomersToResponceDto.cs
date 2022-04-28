using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class CustomersToResponceDto
    {
        public Guid Id { get; set; }
        public string Akronim { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Contact { get; set; }
        public string Streed { get; set; }
        public string City { get; set; }
        public string Nip { get; set; }
        public string ZipCode { get; set; }
        public int Status { get; set; }
        public int GidCdn { get; set; }
        public Guid PriceId { get; set; }
        public Guid CategoryCustomerId { get; set; }
    }
}
