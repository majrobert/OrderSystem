using Microsoft.EntityFrameworkCore;
using Polnet_api.Helpers;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public class ProductConfRepository : IProductConfRepository
    {
        private readonly DataContext _context;

        public ProductConfRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void DeleteProductConf(ProductConf productConf)
        {
            if (productConf == null)
                throw new ArgumentException(nameof(productConf));
            _context.ProductConfs.Remove(productConf);
        }

        public void DeleteProductContElem(ProductConfElem productConfElem)
        {
            if (productConfElem == null)
                throw new ArgumentNullException(nameof(productConfElem));
            _context.ProductConfElems.Remove(productConfElem);
        }

        public async Task<ProductConf> GetProductConf(Guid productConfId)
        {
            if (productConfId == Guid.Empty)
                throw new ArgumentNullException(nameof(productConfId));
            return await _context.ProductConfs
                .Where(p => p.Id == productConfId).FirstOrDefaultAsync();
        }

        public async Task<ProductConfElem> GetProductConfElem(Guid productConfElemId)
        {
            if (productConfElemId == Guid.Empty)
                throw new ArgumentNullException(nameof(productConfElemId));
            return await _context.ProductConfElems
                .Where(p => p.Id == productConfElemId).FirstOrDefaultAsync();
        }

        public async Task<ProductConfRosponce> GetProductConfList
            (ProductsResourceParameters productsResourceParameters)
        {
            if (productsResourceParameters == null)
                throw new ArgumentNullException(nameof(productsResourceParameters));
            var colection = _context.ProductConfs as IQueryable<ProductConf>;
            if (!string.IsNullOrEmpty(productsResourceParameters.Category))
            {
                var category = productsResourceParameters.Category.Trim();
                colection = colection.Where(b => b.CategoryProdId == category);
            }
            if (!string.IsNullOrEmpty(productsResourceParameters.Filter))
            {
                var filter = productsResourceParameters.Filter.Trim();
                colection = colection.Where(b => b.Name.Contains(filter) || b.Code.Contains(filter));
            }
            if (productsResourceParameters.Status != -1)
            {
                colection = colection.Where(b => b.Status == productsResourceParameters.Status);
            }
            var totalCount = await colection.CountAsync();
            var items = await colection
                .Skip(productsResourceParameters.PageSize * (productsResourceParameters.PageIndex - 1))
                .Take(productsResourceParameters.PageSize)
                .Select(x => new
                {
                    productConfElem = x.ProductConfElems.ToList(),
                    productConf = x
                })
                .ToListAsync();
            List<ProductConfElem> productConfElem = new List<ProductConfElem>();
            List<ProductConf> productConf = new List<ProductConf>();

            items.ForEach(x => {
                productConf.Add(x.productConf);
                productConfElem.AddRange(x.productConfElem);
            });
            ProductConfRosponce productConfRosponce = new ProductConfRosponce
            {
                TotalPages = totalCount,
                productConf = productConf,
                productConfElem = productConfElem
            };
            return productConfRosponce;

        }

        public void InsertProductConf(ProductConf productConf)
        {
            if (productConf == null)
                throw new ArgumentNullException(nameof(productConf));
            _context.ProductConfs.AddAsync(productConf);
        }

        public void InsertProductConfElem(ProductConfElem productConfElem)
        {
            if (productConfElem == null)
                throw new ArgumentNullException(nameof(productConfElem));
            _context.ProductConfElems.AddAsync(productConfElem);
        }

        public async Task<bool> Save()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }

        public void UpdateProductConf(ProductConf productConf)
        {
            if (productConf == null)
                throw new ArgumentNullException(nameof(productConf));
            _context.ProductConfs.Update(productConf);
        }

        public void UpdateProductConfElem(ProductConfElem productConfElem)
        {
            if (productConfElem == null)
                throw new ArgumentNullException(nameof(productConfElem));
            _context.ProductConfElems.Update(productConfElem);
        }
    }
}
