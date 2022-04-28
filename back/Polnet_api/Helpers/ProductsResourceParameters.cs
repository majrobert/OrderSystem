using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Helpers
{
    public class ProductsResourceParameters
    {
        public string Category { get; set; }
        public int Status { get; set; }
        public string Filter { get; set; }
        public string SortDirection { get; set; }
        public string SortField { get; set; }
        public int PageIndex { get; set; } = 1;
        public int PageSize { 
            get => _pageSize;
            set => _pageSize = (value > maxPageSize) ? maxPageSize : value;
        }
        const int maxPageSize = 15;
        private int _pageSize = 5;

    }
}
