﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class PriceForUpdateDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Decimal Margin { get; set; }
        public int Sort { get; set; }
        public int Status { get; set; }
    }
}
