using Microsoft.EntityFrameworkCore;
using Polnet_api.Helpers;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public bool CategoryProductExist(Guid categoryId)
        {
            if (categoryId == Guid.Empty)
                throw new ArgumentNullException(nameof(categoryId));
            return _context.CategoryProds.Any(a => a.Id == categoryId);
        }
        
        public void DeleteCategoryProduct(CategoryProd categoryProd)
        {
            if (categoryProd == null)
                throw new ArgumentNullException(nameof(categoryProd));
 
            _context.CategoryProds.Remove(categoryProd);
        }

        public void DeleteProduct(Product product)
        {
            if (product == null)
                throw new ArgumentNullException(nameof(product));
            // sprawdzic czy istnieje w ofertach

            _context.Products.Remove(product);
        }

        public async Task<bool> ExistProductInCategory(Guid categoryId)
        {
            if (categoryId == Guid.Empty)
                throw new ArgumentNullException(nameof(categoryId));
            return await _context.Products.AnyAsync(p => p.CategoryProd.Id == categoryId);
        }

        public async Task<CategoryProd> GetCategoryProduct(Guid categoryId)
        {
            if (categoryId == Guid.Empty)
                throw new ArgumentNullException(nameof(categoryId));

           return await _context.CategoryProds.Where(c => c.Id == categoryId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<CategoryProd>> GetCategorysProduct()
        {
           return await _context.CategoryProds.ToListAsync();
        }

        public async Task<Product> Getproduct(Guid productId)
        {
            if (productId == Guid.Empty)
                throw new ArgumentNullException(nameof(productId));
            return await _context.Products.Where(p => p.Id == productId).FirstOrDefaultAsync();
        }

        public async Task<Product> GetproductIncCategory(Guid productId)
        {
            if (productId == Guid.Empty)
                throw new ArgumentNullException(nameof(productId));
            return await _context.Products.Where(p => p.Id == productId)
                .FirstOrDefaultAsync();
        }

        public async Task<PagedList<Product>> GetProductList(ProductsResourceParameters productsResourceParameters)
        {
            if (productsResourceParameters == null)
                throw new ArgumentNullException(nameof(productsResourceParameters));
          //  _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            var colection = _context.Products as IQueryable<Product>;
            if (!string.IsNullOrEmpty(productsResourceParameters.Category))
            {
                var category = Guid.Parse(productsResourceParameters.Category.Trim());
                colection = colection.Where(b => b.CategoryProdId == category);
            }

            if (!string.IsNullOrEmpty(productsResourceParameters.Filter))
            {
                var filter = productsResourceParameters.Filter.Trim();
                colection = colection.Where(b => b.Name.Contains(filter) || b.Code.Contains(filter));
            }
            if(productsResourceParameters.Status != -1)
            {
                 colection = colection.Where(b => b.Status == productsResourceParameters.Status);
               // colection = colection.Where(b => b.ProductPrices.Any(e => e.PriceId == productsResourceParameters.).Count() > 0);
            }
            var totalCount = await colection.CountAsync();
            
            var items =  await colection
                .Skip(productsResourceParameters.PageSize * (productsResourceParameters.PageIndex -1) )
                .Take(productsResourceParameters.PageSize)
                .ToListAsync();
            return new PagedList<Product>(items, totalCount, 
                productsResourceParameters.PageIndex,
                productsResourceParameters.PageSize);
        }

        public void InsertCategorysProduct(CategoryProd categoryProd)
        {
            if (categoryProd == null)
                throw new ArgumentNullException(nameof(categoryProd));
            _context.CategoryProds.AddAsync(categoryProd);
        }

        public void InsertProduct(Product product)
        {
            if (product == null)
                throw new ArgumentNullException(nameof(product));
            _context.Products.AddAsync(product);
        }

        public async Task<bool> ProductExist(Guid productId)
        {
            if (productId == Guid.Empty)
                throw new ArgumentNullException(nameof(productId));
            return await _context.Products.AnyAsync(a => a.Id == productId);
         }

        public async Task<bool> Save()
        {
            return ( await _context.SaveChangesAsync() >= 0);
        }

        public void UpdateGetCategorysProduct(CategoryProd categoryProd)
        {
            if (categoryProd == null)
                throw new ArgumentNullException(nameof(categoryProd));
            _context.Update(categoryProd);
        }

        public void UpdateProduct(Product product)
        {
            if (product == null)
                throw new ArgumentNullException(nameof(product));
            _context.Update(product);
        }
    }
}
