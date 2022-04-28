using Polnet_api.Models;
using Polnet_api.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public interface IProductConfRepository
    {
        void InsertProductConf(ProductConf productConf);
        Task<ProductConfRosponce> GetProductConfList(ProductsResourceParameters productsResourceParameters);
        void UpdateProductConf(ProductConf productConf);
        void DeleteProductConf(ProductConf productConf);
        Task<ProductConf> GetProductConf(Guid productConfId);


        // product conf element
        void InsertProductConfElem(ProductConfElem productConfElem);
        void UpdateProductConfElem(ProductConfElem productConfElem);
        void DeleteProductContElem(ProductConfElem productConfElem);
        Task<ProductConfElem> GetProductConfElem(Guid productConfElemId);

        Task<bool> Save();
    }
}
