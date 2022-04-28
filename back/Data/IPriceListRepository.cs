using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Polnet_api.Helpers;
using Polnet_api.Models;

namespace Polnet_api.Data
{
    public interface IPriceListRepository
    {
        Task<IEnumerable<Price>> GetPriceTypeList();
        void InsertPriceListType(Price price);
        void UpdatePriceListType(Price price);
        void DeletePriceListType(Price price);
        Task<Price> GetOnePriceType(Guid id);
        
        Task<ProductPriceRosponce> GetProductPriceList(ProductsPricesParameters productsPricesParameters);
        Task<Object> GetProductPriceListOrderCustomer(ProductsPricesParameters productsPricesParameters,
            Guid orderid, Guid customerid);

        // ==== for products
        Task<IEnumerable<ProductPrice>> GetPricesByProduct(Guid productId);
        Task<IEnumerable<PriceSpec>> GetPriceSpecsForProduct(Guid productId);
        Task<ProductPrice> GetProductPrice(Guid productId, Guid priceType);
        void InsertProductPrice(ProductPrice productPrice);
        void UpdateProductPrice(ProductPrice productPrice);

        // ==== for customers
         Task<IEnumerable<PriceSpec>> GetProductPriceSpecOneCustomer(Guid customerId);
        // customers for product  price spec
        Task<IEnumerable<Customer>> GetCustomersListForPriceSpec(Guid productId);

        Task<bool> Save();

    }
}
