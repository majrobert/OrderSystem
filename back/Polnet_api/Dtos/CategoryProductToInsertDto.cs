﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Dtos
{
    public class CategoryProductToInsertDto
    {
        public string Name { get; set; }
        public string Details { get; set; }
        public int Sort { get; set; }
    }
}
