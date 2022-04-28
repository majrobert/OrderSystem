using Polnet_api.Helpers;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public interface IProductRepository
    {
        Task<IEnumerable<CategoryProd>> GetCategorysProduct();
        Task<CategoryProd> GetCategoryProduct(Guid categoryId);
        void UpdateGetCategorysProduct(CategoryProd categoryProd);
        void InsertCategorysProduct(CategoryProd categoryProd);
        void DeleteCategoryProduct(CategoryProd categoryProd);
        bool CategoryProductExist(Guid categoryId);
        Task<bool> ExistProductInCategory(Guid categoryId);
        // products
        void InsertProduct(Product product);
        Task<PagedList<Product>> GetProductList(ProductsResourceParameters productsResourceParameters);
        Task<Product> Getproduct(Guid productId);
        Task<Product> GetproductIncCategory(Guid productId);
        void DeleteProduct(Product product);
        void UpdateProduct(Product product);

        Task<bool> ProductExist(Guid productId);
        Task<bool> Save();
    }
}
