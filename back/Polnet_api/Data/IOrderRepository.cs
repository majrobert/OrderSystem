using Polnet_api.Helpers;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public interface IOrderRepository
    {
        // order
        void InsertOrder(Order order);
        void DeleteOrder(Order order);
        void UpdateOrder(Order order);

        Task<int> getlastNumberOfOrder(int year, string seria);
        Task<PagedList<Order>> GetOrdersList (OrdersParameters parameters);
        Task<Order> GetOrder (Guid orderId);
        Task<Order> GetOrderInCustomer(Guid orderId);
        Task<Order> UpdateOrderAndReturn(Guid orderId);

        // order header
        void InsertOrderHeader(OrderHeader header);
        void UpdateOrderHeader(OrderHeader header);
        void DeleteOrderHeader(OrderHeader header);
        Task<OrderHeader> GetOrderHeader(Guid orderHeaderId);
        Task<Object> GetOrderHeraderWithElem(Guid orderId);


        // Currency
        Task<IEnumerable<Currency>> GetCurrencies();
        Task<Currency> GetCurrency(Guid currencyid);
        void InsertCurrency(Currency currency);
        void UpdateCurrency(Currency currency);

        // order elem
        Task<bool> ExistElementInOrderHeader(Guid headerId);
        Task<OrderElem> GetOrderElem(Guid orderelemid);
        Task<IEnumerable<OrderElem>> GetOrderElems(Guid orderId);
        void UpdateOrderElems(IEnumerable<OrderElem> orderElems);
        void InsertOrderElem(OrderElem orderElem);
        void UpdateOrderElem(OrderElem orderElem);
        void DeleteOrderElem(OrderElem orderElem);

        // element config
        Task<IEnumerable<OrderElemConf>> GetOrderElemConfs(Guid orderId);
        Task<OrderElemConf> GetOrderElemConf(Guid orderElemConfId);
        Task<OrderElemConf> UpdateAndReturnElemConf(Guid orderElemConfId);
        Task<Object> GetOrderSElemConfWithProduct(Guid orderElemConfId);
        void UpdateOrderElemConfs(IEnumerable<OrderElemConf> orderElemConfs);
        void UpdateOrderelemConf(OrderElemConf orderElemConf);
        void InsertOrderElemConfs(OrderElemConf orderElemConfs);
        void DeleteOrderElemConfs(OrderElemConf orderElemConfs);
        // SElement conf
        Task<OrderSElemConf> GetOrderSElem(Guid orderSElemConfId);
        void InsertOrderSElemConf(OrderSElemConf orderSElem);
        void DeleteOrderSElemConf(OrderSElemConf orderSElem);
        void UpdateOrderSelemconf(OrderSElemConf orderSElem);

        // elem hand
        Task<IEnumerable<OrderElemHand>> GetElemHands(Guid orderId);
        Task<OrderElemHand> GetElemHand(Guid orderElemHandId);
        void UpdateOrderElemHands(IEnumerable<OrderElemHand> orderElemHands);
        void InsertOrderElemHand(OrderElemHand orderElemHand);
        void DeleteOrderElemHand(OrderElemHand orderElemHand);
        void UpdateOrderElemHand(OrderElemHand orderElemHand);

        Task<bool> Save();
    }
}
