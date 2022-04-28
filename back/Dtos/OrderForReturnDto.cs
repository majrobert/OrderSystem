using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class OrderForReturnDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string NumberYear { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateLimit { get; set; }
        public DateTime DateReali { get; set; }
        public int Status { get; set; }
        public CustomersToResponceDto Customer { get; set; }
        public Guid CustomerId { get; set; }
        public Guid CustomerDId { get; set; }
        public CurrencyForReturnDto Currency { get; set; }
        public Guid CurrencyId { get; set; }
        public decimal Exchange { get; set; }
        public string Series { get; set; }
        public string UserId { get; set; }
        public decimal Value { get; set; }
        public decimal ValueBrutto { get; set; }
        public decimal Discount { get; set; }
    }
}
