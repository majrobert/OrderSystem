using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public PagedList(List<T> items, int totalCount, int pageIndex,
            int pageSize)
        {
            TotalCount = totalCount;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            AddRange(items);
        }
        //public static async Task<PagedList<T>> Create(IQueryable<T> source, int pageIndex,
        //    int pageSize)
        //{
        //    var count = source.Count();
        //    var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        //    return await new PagedList<T>(items, count, pageIndex, pageSize);
        //}
    }
}
