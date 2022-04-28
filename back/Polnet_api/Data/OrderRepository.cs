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
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OrderRepository(DataContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper;
        }

        public void DeleteOrder(Order order)
        {
            if (order == null)
                throw new ArgumentNullException(nameof(order));
            _context.Orders.Remove(order);
        }

        public void DeleteOrderElem(OrderElem orderElem)
        {
            if (orderElem == null)
                throw new ArgumentNullException(nameof(orderElem));
            _context.OrderElems.Remove(orderElem);
        }

        public void DeleteOrderElemConfs(OrderElemConf orderElemConfs)
        {
            if (orderElemConfs == null)
                throw new ArgumentNullException(nameof(orderElemConfs));
            _context.OrderElemConfs.Remove(orderElemConfs);
        }

        public void DeleteOrderHeader(OrderHeader header)
        {
            if (header == null)
                throw new ArgumentNullException(nameof(header));
            _context.OrderHeaders.Remove(header);
        }

        public async Task<bool> ExistElementInOrderHeader(Guid headerId)
        {
            if (headerId == Guid.Empty)
                throw new ArgumentNullException(nameof(headerId));
            return await _context.Orders.AnyAsync(h =>
            h.OrderElem.Any(e => e.OrderHeaderId == headerId) ||
            h.OrderElemConfs.Any(e => e.OrderHeaderId == headerId) ||
            h.OrderElemHand.Any(e => e.OrderHeaderId == headerId)
            ); 
        }

        public async Task<IEnumerable<Currency>> GetCurrencies()
        {
            return await _context.Currencies.ToListAsync();
        }

        public async Task<Currency> GetCurrency(Guid currencyid)
        {
            if (currencyid == Guid.Empty)
                throw new ArgumentNullException(nameof(currencyid));
            return await _context.Currencies.Where(c => c.Id == currencyid)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<OrderElemHand>> GetElemHands(Guid orderId)
        {
            if (orderId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderId));
            return await _context.OrderElemHands.Where(o => o.OrderId == orderId).ToListAsync();
        }

        public async Task<int> getlastNumberOfOrder(int year, string seria)
        {
            return await _context.Orders.Where(o => o.Year == year && o.Series == seria)
                .OrderByDescending(x => x.Number).Select( s => s.Number).FirstOrDefaultAsync();
        }

        public async Task<Order> GetOrder(Guid orderId)
        {
            if (orderId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderId));
            return await _context.Orders.AsNoTracking()
                .Where(x => x.Id == orderId).FirstOrDefaultAsync();
        }

        public async Task<OrderElem> GetOrderElem(Guid orderelemid)
        {
            if (orderelemid == Guid.Empty)
                throw new ArgumentNullException(nameof(orderelemid));
            return await _context.OrderElems.Where(oe => oe.Id == orderelemid).FirstOrDefaultAsync();
        }

        public async Task<OrderElemConf> GetOrderElemConf(Guid orderElemConfId)
        {
            if (orderElemConfId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderElemConfId));
            return await _context.OrderElemConfs
                .Where(o => o.Id == orderElemConfId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<OrderElemConf>> GetOrderElemConfs(Guid orderId)
        {
            if (orderId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderId));
            return await _context.OrderElemConfs.Where(o => o.OrderId == orderId).ToListAsync();
        }

        public async Task<object> GetOrderSElemConfWithProduct(Guid orderElemConfId)
        {
            if (orderElemConfId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderElemConfId));
 

            var orderElementConf = await _context.OrderElemConfs
                .Include(v => v.Order).ThenInclude( c => c.Customer)
                .Where(o => o.Id == orderElemConfId)
                .FirstOrDefaultAsync();
            var products = await _context.Products.AsNoTracking().Where(p => p.ProductConfElems
                .Any(o => o.ProductConfId == orderElementConf.ProductConfId))
                    .Select(x => new
                    {
                        orderSElemConf = x.OrderSElemConfs.Where(v => v.OrderElemConfId == orderElemConfId),
                        products = x,
                        productConfElem = x.ProductConfElems.Where( c => c.ProductConfId == orderElementConf.ProductConfId),
                        productPrice = x.ProductPrices.Where(p => p.PriceId == orderElementConf.Order.Customer.PriceId),
                        priceSpec = x.PriceSpecs.Where(ps => ps.CustomerId == orderElementConf.Order.CustomerId)

                    })
                    .ToListAsync();
            List<Product> product = new List<Product>();
            List<OrderSElemConf> orderSElemConf = new List<OrderSElemConf>();
            List<ProductConfElem> productConf = new List<ProductConfElem>();
            List<ProductPrice> productPrice = new List<ProductPrice>();
            List<PriceSpec> priceSpec = new List<PriceSpec>();
            products.ForEach(x =>
           {
               product.Add(x.products);
               orderSElemConf.AddRange(x.orderSElemConf);
               productConf.AddRange(x.productConfElem);
               productPrice.AddRange(x.productPrice);
               priceSpec.AddRange(x.priceSpec);
           });
            productPrice.ForEach(p => p.Cost = p.Cost * orderElementConf.Order.Exchange);
            priceSpec.ForEach(p => p.Cost = p.Cost * orderElementConf.Order.Exchange);

            return (new { 
                product = _mapper.Map<ProductForReturnDto[]>(product) , 
                orderSElemConf = _mapper.Map<OrderSElemConfForReturnDto[]>(orderSElemConf),
                productConfElem = _mapper.Map<ProductConfElemForUpdateDto[]>(productConf),
                productPrice = _mapper.Map<ProductPriceResponceDto[]>(productPrice),
                priceSpec = _mapper.Map<PriceSpecForReturnDto[]>(priceSpec)
            });
        }

        public async Task<IEnumerable<OrderElem>> GetOrderElems(Guid orderId)
        {
            if (orderId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderId));
            return await _context.OrderElems.Where(o => o.OrderId == orderId).ToListAsync();
        }

        public async Task<OrderHeader> GetOrderHeader(Guid orderHeaderId)
        {
            if (orderHeaderId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderHeaderId));
            return await _context.OrderHeaders.Where(x => x.Id == orderHeaderId).FirstOrDefaultAsync();
        }

        public async Task<object> GetOrderHeraderWithElem(Guid orderId)
        {
            if (orderId == Guid.Empty) {
                throw new ArgumentNullException(nameof(orderId));
            }
             // var collection = _context.OrderHeaders as IQueryable<OrderHeader>;
            //var query = _context.OrderHeaders.Where(c => c.OrderId == orderId)
            var query = await _context.OrderHeaders.Where(c => c.OrderId == orderId)
                .Select(x => new
                {
                    header = x,
                    orderElem  = x.Order.OrderElem.Where(c => c.OrderHeaderId == x.Id),
                    orderElemConf = x.Order.OrderElemConfs.Where(d => d.OrderHeaderId == x.Id),
                    orderElemHands = x.Order.OrderElemHand.Where(f => f.OrderHeaderId == x.Id)
                }).ToListAsync();
            List<OrderHeader> orderHeader = new List<OrderHeader>();
            List<OrderElem> orderElem = new List<OrderElem>();
            List<OrderElemConf> orderElemConf = new List<OrderElemConf>();
            List<OrderElemHand> orderElemHand = new List<OrderElemHand>();

            query.ForEach(x =>
            {
                orderHeader.Add(x.header);
                orderElem.AddRange(x.orderElem);
                orderElemConf.AddRange(x.orderElemConf);
                orderElemHand.AddRange(x.orderElemHands);
            });

            var order = await _context.Orders.Where(o => o.Id == orderId)
               .AsNoTracking().Include(c => c.Customer)
               .Include( c => c.Currency)
               .FirstOrDefaultAsync();


            return new { 
                order = _mapper.Map<OrderForReturnDto>(order),
                orderHeader = _mapper.Map<OrderHeaderForReturnDto[]>(orderHeader),
                orderElem = _mapper.Map<OrderElemForReturnDto[]>(orderElem.Distinct()),
                orderElemConf = _mapper.Map<OrderElemConfForReturnDto[]>(orderElemConf), 
                orderElemHand = _mapper.Map<OrderElemHandForReturnDto[]>(orderElemHand) }; 
        }

        public async Task<PagedList<Order>> GetOrdersList(OrdersParameters parameters)
        {
            if (parameters == null)
                throw new ArgumentNullException(nameof(parameters));
            var collection = _context.Orders as IQueryable<Order>;
            if (!string.IsNullOrEmpty(parameters.Filter))
            {
                var filter = parameters.Filter.Trim();
                collection = collection.Where(b => b.Customer.Akronim.Contains(filter)
                || b.Customer.Name.Contains(filter) || b.Customer.Nip.Contains(filter) 
                || b.NumberYear.Contains(filter) );
            }
            if(!string.IsNullOrEmpty(parameters.CurrencyId))
            {
                var currencyGid = Guid.Parse(parameters.CurrencyId);
                collection = collection
                    .Where(c => c.CurrencyId == currencyGid);
            }
            if(parameters.Status != -1)
            {
                collection = collection.Where(b => b.Status == parameters.Status);
            }
            if(parameters.DateStart < parameters.DateEnd)
            {
                collection = collection.Where(d => d.DateCreation >= parameters.DateStart 
                && d.DateCreation <= parameters.DateEnd);
            }
            if (!string.IsNullOrEmpty(parameters.Series))
            {
                collection = collection.Where(s => s.Series == parameters.Series);
            }

            var totalCount = await collection.CountAsync();

            var items = await collection.AsNoTracking().Include(c => c.Customer)
                        .AsNoTracking().Include(c => c.Currency)
                .Skip(parameters.PageSize * (parameters.PageIndex - 1))
                .Take(parameters.PageSize)
                .ToListAsync();
            return new PagedList<Order>(items, totalCount, parameters.PageIndex, parameters.PageSize);
        }

        public void InsertCurrency(Currency currency)
        {
            if (currency == null)
                throw new Exception(nameof(currency));
            _context.Currencies.AddAsync(currency);
        }

        public void InsertOrder(Order order)
        {
            if (order == null)
                throw new ArgumentNullException(nameof(order));
            _context.Orders.AddAsync(order);
        }

        public void InsertOrderElem(OrderElem orderElem)
        {
            if (orderElem == null)
                throw new ArgumentNullException(nameof(orderElem));
            _context.OrderElems.AddAsync(orderElem);
        }

        public void InsertOrderElemConfs(OrderElemConf orderElemConfs)
        {
            if (orderElemConfs == null)
                throw new ArgumentNullException(nameof(orderElemConfs));
            _context.OrderElemConfs.AddAsync(orderElemConfs);
        }

        public void InsertOrderHeader(OrderHeader header)
        {
            if (header == null)
                throw new ArgumentNullException(nameof(header));
            _context.OrderHeaders.AddAsync(header);
        }

        public  async Task<bool> Save()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }

        public void UpdateCurrency(Currency currency)
        {
            if (currency == null)
                throw new ArgumentNullException(nameof(currency));
            _context.Currencies.Update(currency);
        }

        public void UpdateOrder(Order order)
        {
            if (order == null)
                throw new ArgumentNullException(nameof(order));
            _context.Orders.Update(order);
        }

        public void UpdateOrderElem(OrderElem orderElem)
        {
            if (orderElem == null)
                throw new ArgumentNullException(nameof(orderElem));
            _context.OrderElems.Update(orderElem);
        }

        public void UpdateOrderElemConfs(IEnumerable<OrderElemConf> orderElemConfs)
        {
            _context.OrderElemConfs.UpdateRange(orderElemConfs);
        }

        public void UpdateOrderElemHands(IEnumerable<OrderElemHand> orderElemHands)
        {
            _context.OrderElemHands.UpdateRange(orderElemHands);
        }

        public void UpdateOrderElems(IEnumerable<OrderElem> orderElems)
        {
            _context.OrderElems.UpdateRange(orderElems);
        }

        public void UpdateOrderHeader(OrderHeader header)
        {
            if (header == null)
                throw new ArgumentNullException(nameof(header));
            _context.OrderHeaders.Update(header);
        }

        public async Task<OrderSElemConf> GetOrderSElem(Guid orderSElemConfId)
        {
            if (orderSElemConfId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderSElemConfId));
            return await _context.OrderSElemConfs.Where(x => x.Id == orderSElemConfId).FirstOrDefaultAsync();
        }

        public void InsertOrderSElemConf(OrderSElemConf orderSElem)
        {
            if (orderSElem == null)
                throw new ArgumentNullException(nameof(orderSElem));
            _context.OrderSElemConfs.AddAsync(orderSElem);
        }

        public void DeleteOrderSElemConf(OrderSElemConf orderSElem)
        {
            if (orderSElem == null)
                throw new ArgumentNullException(nameof(orderSElem));
            _context.OrderSElemConfs.Remove(orderSElem);
        }

        public void UpdateOrderSelemconf(OrderSElemConf orderSElem)
        {
            if (orderSElem == null)
                throw new ArgumentNullException(nameof(orderSElem));
            _context.OrderSElemConfs.Update(orderSElem);
        }

        public async Task<OrderElemConf> UpdateAndReturnElemConf(Guid orderElemConfId)
        {
            if (orderElemConfId == null)
                throw new ArgumentNullException(nameof(orderElemConfId));
            var sumSElements = await _context.OrderElemConfs.Where(x => x.Id == orderElemConfId)
                .Select(s => new
                {   orderElemConf = s,
                    pricePurchase = s.OrderSElemConfs.Sum(o => o.PricePurchase * o.Quantity),
                    price = s.OrderSElemConfs.Sum(o => o.PriceAfterDiscount),
                    priceAfterDiscount = s.OrderSElemConfs.Sum(o => o.PriceAfterDiscount ),
                    priceBrutto = s.OrderSElemConfs.Sum(o => (o.PriceAfterDiscount)* (((((decimal)o.Vat) /100)) + 1) )
                }).FirstOrDefaultAsync();
            sumSElements.orderElemConf.PricePurchase = sumSElements.pricePurchase;
            sumSElements.orderElemConf.Price = sumSElements.price;
            sumSElements.orderElemConf.PriceAfterDiscount = sumSElements.priceAfterDiscount * sumSElements.orderElemConf.Quantity;
            sumSElements.orderElemConf.PriceBrutto = sumSElements.priceBrutto * sumSElements.orderElemConf.Quantity;
            return sumSElements.orderElemConf;

        }

        public void UpdateOrderelemConf(OrderElemConf orderElemConf)
        {
            if (orderElemConf == null)
                throw new ArgumentNullException(nameof(orderElemConf));
            _context.OrderElemConfs.Update(orderElemConf);
        }

        public async Task<Order> UpdateOrderAndReturn(Guid orderId)
        {
            if (orderId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderId));
            var sumOrder = await _context.Orders.Where(x => x.Id == orderId)
                .Select( s => new
                {
                    order = s,
                    pricePurchaseE = s.OrderElem.Sum(o => o.PricePurchase * o.Quantity),
                    pricePurchaseC = s.OrderElemConfs.Sum(o => o.PricePurchase * o.Quantity),
                    pricePurchaseH = s.OrderElemHand.Sum(o => o.PricePurchase * o.Quantity),
                    priceE = s.OrderElem.Sum( o => o.Price * o.Quantity),
                    priceC =  s.OrderElemConfs.Sum(o => o.Price * o.Quantity),
                    priceH =s.OrderElemHand.Sum(o => o.Price * o.Quantity),
                    priceAfterDiscountE = s.OrderElem.Sum(o => o.PriceAfterDiscount),
                    priceAfterDiscountC  = s.OrderElemConfs.Sum(o => o.PriceAfterDiscount),
                    priceAfterDiscountH = s.OrderElemHand.Sum(o => o.PriceAfterDiscount),
                    priceBruttoE = s.OrderElem.Sum(o => o.PriceBrutto),
                    priceBruttoH =  s.OrderElemHand.Sum(o => o.PriceBrutto),
                    priceBruttoC  = s.OrderElemConfs.Sum(o => o.PriceBrutto)
                }).FirstOrDefaultAsync();
            Decimal discountR = 0;
            if ((sumOrder.priceE + sumOrder.priceC + sumOrder.priceH) != 0)
                discountR = (1 - ( (sumOrder.priceAfterDiscountE + sumOrder.priceAfterDiscountC + sumOrder.priceAfterDiscountH) 
                    / (sumOrder.priceE + sumOrder.priceC + sumOrder.priceH))) * 100;
            sumOrder.order.PricePurchase = (sumOrder.pricePurchaseE + sumOrder.pricePurchaseC + sumOrder.pricePurchaseH ) ;
            sumOrder.order.Value = (sumOrder.priceAfterDiscountE + sumOrder.priceAfterDiscountC + sumOrder.priceAfterDiscountH);
            sumOrder.order.ValueBrutto = ( sumOrder.priceBruttoE + sumOrder.priceBruttoC + sumOrder.priceBruttoH );
            sumOrder.order.Discount = discountR;
            return sumOrder.order;
        }

        public void InsertOrderElemHand(OrderElemHand orderElemHand)
        {
            if (orderElemHand == null)
                throw new ArgumentNullException(nameof(orderElemHand));
            _context.OrderElemHands.AddAsync(orderElemHand);
        }

        public void DeleteOrderElemHand(OrderElemHand orderElemHand)
        {
            if (orderElemHand == null)
                throw new ArgumentNullException(nameof(orderElemHand));
            _context.OrderElemHands.Remove(orderElemHand);
        }

        public async Task<OrderElemHand> GetElemHand(Guid orderElemHandId)
        {
            if (orderElemHandId == Guid.Empty)
                throw new ArgumentNullException(nameof(orderElemHandId));

            return await _context.OrderElemHands.Where(o => o.Id == orderElemHandId)
                .FirstOrDefaultAsync();
        }

        public void UpdateOrderElemHand(OrderElemHand orderElemHand)
        {
            if (orderElemHand == null)
                throw new ArgumentNullException(nameof(orderElemHand));
            _context.OrderElemHands.Update(orderElemHand);
        }

        public async Task<Order> GetOrderInCustomer(Guid orderId)
        {
            if(orderId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(orderId));
            }
            var order = await _context.Orders.Where(o => o.Id == orderId)
                .AsNoTracking().Include(c => c.Customer).FirstOrDefaultAsync();
            return order;
        }
    }
}
