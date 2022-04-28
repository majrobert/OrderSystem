using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Polnet_api.Dtos;
using Polnet_api.Helpers;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public class PriceListRepository : IPriceListRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PriceListRepository(DataContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper;
        }
        public void DeletePriceListType(Price price)
        {
            if (price == null)
                throw new ArgumentNullException(nameof(price));

            _context.Prices.Remove(price);
        }

        public async Task<IEnumerable<Customer>> GetCustomersListForPriceSpec(Guid productId)
        {
            if (productId == Guid.Empty)
                throw new ArgumentNullException(nameof(productId));
            return await _context.PriceSpecs.AsNoTracking()
                .Where(x => x.ProductId == productId)
                .Select( c => c.Customer).ToListAsync();
        }

        public async Task<Price> GetOnePriceType(Guid id)
        {
            if (id == Guid.Empty)
                throw new ArgumentNullException(nameof(id));

            return await _context.Prices.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ProductPrice>> GetPricesByProduct(Guid productId)
        {
            if (productId == Guid.Empty)
                throw new ArgumentException(nameof(productId));
            return await  _context.ProductPrices.Where(x => x.ProductId == productId).ToListAsync();
        }

        public async Task<IEnumerable<PriceSpec>> GetPriceSpecsForProduct(Guid productId)
        {
            if (productId == Guid.Empty)
                throw new ArgumentNullException(nameof(productId));
            return await _context.PriceSpecs.Where(p => p.ProductId == productId).ToListAsync();
        }

        public async Task<IEnumerable<Price>> GetPriceTypeList()
        {
            return await _context.Prices.ToListAsync();
        }

        public async Task<ProductPrice> GetProductPrice(Guid productId, Guid priceType)
        {
            if (productId == Guid.Empty)
                throw new ArgumentNullException(nameof(productId));
            if (priceType == Guid.Empty)
                throw new ArgumentNullException(nameof(priceType));
            return await _context.ProductPrices.Where(p => p.ProductId == productId && 
            p.PriceId == priceType).FirstOrDefaultAsync();
        }

        public async Task<ProductPriceRosponce> GetProductPriceList(ProductsPricesParameters productsPricesParameters)
        {
            if (productsPricesParameters == null)
                throw new ArgumentNullException(nameof(productsPricesParameters));
            var colection =
                _context.ProductPrices.AsNoTracking()
                // .AsNoTracking().Include(p => p.Product)
                .Where(p => p.Product.Status == 1) as IQueryable<ProductPrice>;
            if (!string.IsNullOrEmpty(productsPricesParameters.Category))
            {
                var category = Guid.Parse(productsPricesParameters.Category.Trim());
                colection = colection.Where(b => b.Product.CategoryProdId == category);
            }
            if (!string.IsNullOrEmpty(productsPricesParameters.Filter.Trim()))
            {
                var filter = productsPricesParameters.Filter.Trim();
                colection = colection.Where(b => b.Product.Name.Contains(filter) 
                || b.Product.Code.Contains(filter));
            }
            if (!string.IsNullOrEmpty(productsPricesParameters.PriceType))
            {
                var prictType =  Guid.Parse(productsPricesParameters.PriceType.Trim());
                colection = colection.Where(b => b.PriceId == prictType);
            }

            var totalCount = await colection.CountAsync();
            var items = await colection
                .Skip(productsPricesParameters.PageSize * (productsPricesParameters.PageIndex - 1))
                .Take(productsPricesParameters.PageSize)
                .Select( x =>  new
                { 
                product = x.Product,
                productPrice = x})
                .ToListAsync();
            List<Product> product = new List<Product>();
            List<ProductPrice> productPrices = new List<ProductPrice>();
            
            items.ForEach(x =>
           {
               product.Add(x.product);
               productPrices.Add(x.productPrice);
           });
            ProductPriceRosponce productPriceRosponces = new ProductPriceRosponce
            {
                TotalPages = totalCount,
                product = product.Distinct(),
                productPrice = productPrices
            };
           
            return productPriceRosponces;

        }

        public async Task<object> GetProductPriceListOrderCustomer(ProductsPricesParameters productsPricesParameters, 
            Guid orderid, Guid customerid)
        {
            var order = await _context.Orders.Where(o => o.Id == orderid).FirstOrDefaultAsync();
            var customer = await _context.Customers.Where(c => c.Id == customerid).FirstOrDefaultAsync();
            Decimal exchange = order.Exchange;
            Guid priceId = customer.PriceId;
            Guid customerId = customer.Id;


            if (productsPricesParameters == null)
                throw new ArgumentNullException(nameof(productsPricesParameters));
            var colection =
                _context.ProductPrices.AsNoTracking()
                // .AsNoTracking().Include(p => p.Product)
                .Where(p => p.Product.Status == 1) as IQueryable<ProductPrice>;
            if (!string.IsNullOrEmpty(productsPricesParameters.Category))
            {
                var category = Guid.Parse(productsPricesParameters.Category.Trim());
                colection = colection.Where(b => b.Product.CategoryProdId == category);
            }
            if (!string.IsNullOrEmpty(productsPricesParameters.Filter.Trim()))
            {
                var filter = productsPricesParameters.Filter.Trim();
                colection = colection.Where(b => b.Product.Name.Contains(filter)
                || b.Product.Code.Contains(filter));
            }
   
                colection = colection.Where(b => b.PriceId == priceId);
            
            var totalCount = await colection.CountAsync();
            var items = await colection
                .Skip(productsPricesParameters.PageSize * (productsPricesParameters.PageIndex - 1))
                .Take(productsPricesParameters.PageSize)
                .Select(x => new
                {
                    product = x.Product,
                    specialPrice = x.Product.PriceSpecs.Where(c => c.CustomerId == customerId),
                    productPrice = x
                })
                .ToListAsync();
            List<Product> product = new List<Product>();
            List<ProductPrice> productPrices = new List<ProductPrice>();
            List<PriceSpec> priceSpecs = new List<PriceSpec>();

            items.ForEach(x =>
            {
                product.Add(x.product);
                x.productPrice.Cost = x.productPrice.Cost * exchange;
                productPrices.Add(x.productPrice);
                priceSpecs.AddRange(x.specialPrice);
            });
            return (new { total = totalCount, 
                productPrice = _mapper.Map<ProductPriceResponceDto[]>(productPrices.Distinct()),
                product = _mapper.Map<ProductForReturnDto[]>(product.Distinct()), 
                priceSpec = _mapper.Map<PriceSpecForReturnDto[]>(priceSpecs.Distinct())
            });

        }

        public async Task<IEnumerable<PriceSpec>> GetProductPriceSpecOneCustomer(Guid customerId)
        {
            if (customerId == Guid.Empty)
                throw new ArgumentNullException(nameof(customerId));

            return await _context.PriceSpecs.Where(c => c.CustomerId == customerId).ToListAsync();
        }

        public void InsertPriceListType(Price price)
        {
            if (price == null)
                throw new ArgumentNullException(nameof(price));
            _context.Prices.AddAsync(price);
        }

        public void InsertProductPrice(ProductPrice productPrice)
        {
            if (productPrice == null)
                throw new ArgumentNullException(nameof(productPrice));
            _context.ProductPrices.AddAsync(productPrice);
        }

        public async Task<bool> Save()
        {
            return( await _context.SaveChangesAsync() >= 0);
        }

        public void UpdatePriceListType(Price price)
        {
            if (price == null)
                throw new ArgumentNullException(nameof(price));
            _context.Update(price);
        }

        public void UpdateProductPrice(ProductPrice productPrice)
        {
            if (productPrice == null)
                throw new ArgumentNullException(nameof(productPrice));
            _context.ProductPrices.Update(productPrice);
        }
    }
}
