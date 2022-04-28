using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Polnet_api.Data;
using Polnet_api.Dtos;
using Polnet_api.Helpers;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Polnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _repository;
        private readonly IMapper _mapper;

        public OrderController(IOrderRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> InsertOrder([FromBody] OrderForInsertDto order)
        {
            // var userID = User.FindFirst(ClaimTypes.PrimarySid).Value;
            string seria = order.Series;
            int rok = int.Parse(DateTime.Now.Year.ToString());
            int maxNumber = await _repository.getlastNumberOfOrder(rok, seria);
            var orderToInsert = _mapper.Map<Order>(order);
            orderToInsert.DateCreation = DateTime.Now;
            orderToInsert.NumberYear = ((maxNumber + 1).ToString() + "/" + order.Series + "/" + rok.ToString());
            orderToInsert.Year = rok;
            orderToInsert.Number = maxNumber + 1;
            // orderToInsert.UserId = userID;

            _repository.InsertOrder(orderToInsert);
            if(await _repository.Save())
            {
                var orderInCustomer = await _repository.GetOrderInCustomer(orderToInsert.Id);
                return Ok(_mapper.Map<OrderForReturnDto>(orderInCustomer));
            }
            return BadRequest();

        }

        [HttpPost("currency")]
        public async Task<IActionResult> InsertCurrency([FromBody] CurrencyForInsertDto currency)
        {
            var currencyToInsert = _mapper.Map<Currency>(currency);
            _repository.InsertCurrency(currencyToInsert);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<CurrencyForReturnDto>(currencyToInsert));
            }
            return BadRequest();
        }
        [HttpPost("orderheader")]
        public async Task<IActionResult> InsertOrderHeader([FromBody] OrderHeaderForInsertDto header )
        {
            var OrderHeaderToInsert = _mapper.Map<OrderHeader>(header);
            _repository.InsertOrderHeader(OrderHeaderToInsert);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<OrderHeaderForReturnDto>(OrderHeaderToInsert));
            }
            return BadRequest();
        }
        [HttpPost("orderconf")]
        public async Task<IActionResult> InsertOrderElemConf([FromBody]OrderElemConf orderElemConf)
        {
            var orderConfForInsert = _mapper.Map<OrderElemConf>(orderElemConf);
            _repository.InsertOrderElemConfs(orderConfForInsert);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<OrderElemConfForReturnDto>(orderConfForInsert));
            }
            return BadRequest();
        }

        [HttpGet("currency")]
        public async Task<IActionResult> GetCurrencies()
        {
            var currency = _mapper.Map<CurrencyForReturnDto[]>(
                await _repository.GetCurrencies());
            return Ok(currency);
        }
        [HttpPut("Currency/{currencyid}")]
        public async Task<IActionResult> UpdateCurrency([FromBody] CurrencyForReturnDto currency, 
            Guid currencyid)
        {
            var currencyToUpdate = await _repository.GetCurrency(currencyid);
            _mapper.Map<CurrencyForReturnDto, Currency>(currency, currencyToUpdate);
           if(await _repository.Save())
            {
                return Ok(_mapper.Map<CurrencyForReturnDto>(currencyToUpdate));
            }
            return BadRequest();
        }
        [HttpPost("list")]
        public async Task<IActionResult> GetListOrders([FromBody] OrdersParameters parameters)
        {
            var orders = await _repository.GetOrdersList(parameters);
            if(orders != null)
            {
                return Ok(new { orders = _mapper.Map<OrderForReturnDto[]>(orders), total = orders.TotalCount });
            }
            return BadRequest();
        }
        [HttpGet("orderconf/{orderconfid}")]
        public async Task<IActionResult> GetProductOrderConf(Guid orderconfid)
        {
          return Ok( await _repository.GetOrderSElemConfWithProduct(orderconfid));
        }
        [HttpGet("orderheader/{orderid}")]
        public async Task<IActionResult> getOrserHeraterWithelem(Guid orderid)
        {
           return Ok( await _repository.GetOrderHeraderWithElem(orderid));
        }
        [HttpDelete("{orderid}")]
        public async Task<IActionResult> DeleteOrder(Guid orderid)
        {
            var orderToDelete = await _repository.GetOrder(orderid);
            _repository.DeleteOrder(orderToDelete);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<OrderForReturnDto>(orderToDelete));
            }
            return BadRequest();
        }
        [HttpDelete("header/{headerid}")]
        public async Task<IActionResult> DeleteHeader(Guid headerid)
        {
            if (await _repository.ExistElementInOrderHeader(headerid))
                return BadRequest("Pozycja jest związana z innymi elementami");
            
            var headerToDelate = await _repository.GetOrderHeader(headerid);
            _repository.DeleteOrderHeader(headerToDelate);
            if(await _repository.Save())
            {
                return Ok( _mapper.Map<OrderHeaderForReturnDto>(headerToDelate));
            }
          return  BadRequest();
        }
        [HttpPost("discount/{orderid}")]
        public async Task<IActionResult> setDiscount([FromBody]Decimal discount, Guid orderid)
        {
            var order = await _repository.GetOrder(orderid);
            if(order != null)
            {
                Decimal sumPricePurchase = 0;
                Decimal sumPrice = 0;
                Decimal sumDiscount = 0;
                Decimal sumPriceBrutto = 0;
                 var discountM = 1 - (discount / 100);
                // order elem
                var elem = await _repository.GetOrderElems(orderid);
                if(elem != null)
                {
                    foreach (var ielem in elem)
                    {
                        ielem.PriceAfterDiscount = (ielem.Price * ielem.Quantity) * discountM;
                        ielem.PriceBrutto = (((ielem.Price * ielem.Quantity) * discountM) 
                            * ((((decimal)ielem.Vat) / 100) + 1));
                    }
                    sumPricePurchase = sumPricePurchase + elem.Sum(s => s.PricePurchase * s.Quantity);
                    sumPrice = sumPrice + elem.Sum(s => s.Price * s.Quantity);
                    sumDiscount = sumDiscount + elem.Sum(s => s.PriceAfterDiscount);
                    sumPriceBrutto = sumPriceBrutto + elem.Sum(s => s.PriceBrutto);
                    _repository.UpdateOrderElems(elem);
                };
                var elemConf = await _repository.GetOrderElemConfs(orderid);
                if(elemConf != null)
                {
                    foreach( var ielem in elemConf)
                    {
                        ielem.PriceAfterDiscount = (ielem.Price * ielem.Quantity) * discountM;
                        ielem.PriceBrutto = ((ielem.Price * ielem.Quantity) * discountM) * ((((decimal)ielem.Vat) / 100) + 1);
                    }
                    sumPricePurchase = sumPricePurchase + elemConf.Sum(s => s.PricePurchase * s.Quantity);
                    sumPrice = sumPrice + elemConf.Sum(s => s.Price * s.Quantity);
                    sumDiscount = sumDiscount + elemConf.Sum(s => s.PriceAfterDiscount);
                    sumPriceBrutto = sumPriceBrutto + elemConf.Sum(s => s.PriceBrutto);
                    _repository.UpdateOrderElemConfs(elemConf);
                }
                var elemHand = await _repository.GetElemHands(orderid);
                if(elemHand != null)
                {
                    foreach( var ielem in elemHand)
                    {
                        ielem.PriceAfterDiscount = (ielem.Price * ielem.Quantity) * discountM;
                        ielem.PriceBrutto = ((ielem.Price * ielem.Quantity) * discountM) * ((((decimal)ielem.Vat) / 100) + 1);
                    }
                    sumPricePurchase = sumPricePurchase + elemHand.Sum(s => s.PricePurchase * s.Quantity);
                    sumPrice = sumPrice + elemHand.Sum(s => s.Price * s.Quantity);
                    sumDiscount = sumDiscount + elemHand.Sum(s => s.PriceAfterDiscount);
                    sumPriceBrutto = sumPriceBrutto + elemHand.Sum(s => s.PriceBrutto);
                    _repository.UpdateOrderElemHands(elemHand);
                }
                Decimal discountR = 0;
                if (sumPrice != 0)
                    discountR = (1 - (sumDiscount / sumPrice)) * 100;
                order.PricePurchase = sumPricePurchase;
                order.Discount = discountR;
                order.Value = sumDiscount;
                order.ValueBrutto = sumPriceBrutto;
                _repository.UpdateOrder(order);
            }
           
            if (await _repository.Save())
            {
              return Ok( await _repository.GetOrderHeraderWithElem(orderid));
            }
            return BadRequest();
        }
        [HttpPost("orderelem")]
        public async Task<IActionResult> InsertOrderElem([FromBody] OrderElemForInsertDto orderElem)
        {
            var orderElemToInsert = _mapper.Map<OrderElem>(orderElem);
            _repository.InsertOrderElem(orderElemToInsert);
            if(await _repository.Save())
            {
                var orderToUpdate = await _repository.UpdateOrderAndReturn(orderElemToInsert.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(_mapper.Map<OrderElemForReturnDto>(orderElemToInsert));
            }
            return BadRequest();
        }
        [HttpPut("orderheader/{orderheaderid}")]
        public async Task<IActionResult> UpdateOrderHeader([FromBody] OrderHeaderForReturnDto orderHeader, Guid orderheaderid)
        {
            var orderHeaderToUpdate = await _repository.GetOrderHeader(orderheaderid);
            _mapper.Map<OrderHeaderForReturnDto, OrderHeader>(orderHeader, orderHeaderToUpdate);
            _repository.UpdateOrderHeader(orderHeaderToUpdate);
            if(await _repository.Save())
            {

                return Ok(orderHeaderToUpdate);
            }
            return BadRequest();
        }

        [HttpPut("orderelem/{orderelemId}")]
        public async Task<IActionResult> UpdateOrderElem([FromBody] OrderElemForReturnDto orderElem,
            Guid orderelemId)
        {
           
            var orderElemForUpdate = await _repository.GetOrderElem(orderelemId);
            _mapper.Map<OrderElemForReturnDto, OrderElem>(orderElem, orderElemForUpdate);
            _repository.UpdateOrderElem(orderElemForUpdate);
            if(await _repository.Save())
            {
                var orderToUpdate = await _repository.UpdateOrderAndReturn(orderElemForUpdate.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(_mapper.Map<OrderElemForReturnDto>(orderElemForUpdate));
            }
            return BadRequest();
        }
        [HttpDelete("orderelem/{orderelemId}")]
        public async Task<IActionResult> DeleteOrderElem(Guid orderelemid)
        {
            var orderElemToDelete = await _repository.GetOrderElem(orderelemid);
            if(orderElemToDelete == null)
            {
                return NotFound();
            }
            _repository.DeleteOrderElem(orderElemToDelete);
            if(await _repository.Save())
            {
                var orderToUpdate = await _repository.UpdateOrderAndReturn(orderElemToDelete.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(_mapper.Map<OrderElemForReturnDto>(orderElemToDelete));
            }
            return BadRequest();
        }
        [HttpPut("orderelemconf/{orderelemconfid}")]
        public async Task<IActionResult> UpdateOrderElemConf([FromBody] OrderElemConfForReturnDto orderElemConf, Guid orderelemconfid)
        {
            var updateElemConf = await _repository.GetOrderElemConf(orderelemconfid);
            if(updateElemConf == null)
            {
                return NotFound();
            }
            _mapper.Map<OrderElemConfForReturnDto, OrderElemConf>(orderElemConf, updateElemConf);
            _repository.UpdateOrderelemConf(updateElemConf);
            if(await _repository.Save())
            {              
                var orderToUpdate = await _repository.UpdateOrderAndReturn(updateElemConf.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(_mapper.Map<OrderElemConfForReturnDto>(updateElemConf));
            }
            return BadRequest();
        }
        [HttpPost("orderselem")]
        public async Task<IActionResult> InsertOrderSelem([FromBody]OrderSElemConfForInsertDto orderSElem)
        {
            var orderSElemToInsert = _mapper.Map<OrderSElemConf>(orderSElem);
            _repository.InsertOrderSElemConf(orderSElemToInsert);
            if (await _repository.Save())
            {
                var orderElemConfSumToUpdate = await _repository.UpdateAndReturnElemConf(orderSElemToInsert.OrderElemConfId);
                _repository.UpdateOrderelemConf(orderElemConfSumToUpdate);
                await _repository.Save();
                var orderToUpdate = await _repository.UpdateOrderAndReturn(orderElemConfSumToUpdate.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(new
                {
                    orderSElemConf = _mapper.Map<OrderSElemConfForReturnDto>(orderSElemToInsert),
                    orderElem = _mapper.Map<OrderElemConfForReturnDto>(orderElemConfSumToUpdate)
                });
            }
            return BadRequest();
        }
        [HttpDelete("orderelemconf/{orderelemconfid}")]
        public async Task<IActionResult> DeleteOrderElemConf(Guid orderelemconfid)
        {
            var orderElemConfToDelete = await _repository.GetOrderElemConf(orderelemconfid);
            if (orderElemConfToDelete == null)
            {
                return NotFound();
            }
            _repository.DeleteOrderElemConfs(orderElemConfToDelete);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<OrderElemConfForReturnDto>(orderElemConfToDelete));
            }
            return BadRequest();
        }
        [HttpDelete("orderselem/{orderselemid}")]
        public async Task<IActionResult> DeleteOrderSElem(Guid orderselemid)
        {
            var orderSelemToDelete = await _repository.GetOrderSElem(orderselemid);
            if (orderSelemToDelete == null)
            {
                return NotFound();
            }
            _repository.DeleteOrderSElemConf(orderSelemToDelete);
            if(await _repository.Save())
            {
                var orderElemConfSumToUpdate = await _repository.UpdateAndReturnElemConf(orderSelemToDelete.OrderElemConfId);
                _repository.UpdateOrderelemConf(orderElemConfSumToUpdate);
                await _repository.Save();
                var orderToUpdate = await _repository.UpdateOrderAndReturn(orderElemConfSumToUpdate.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(new
                {
                    orderSElemConf = _mapper.Map<OrderSElemConfForReturnDto>(orderSelemToDelete),
                    orderElem = _mapper.Map<OrderElemConfForReturnDto>(orderElemConfSumToUpdate)
                });
            }
            return BadRequest();
        }
        [HttpPut("orderselem/{orderselemid}")]
        public async Task<IActionResult> UpdateOrderSElem([FromBody]OrderSElemConfForReturnDto orderSElem, Guid orderselemid)
        {
            var orderSelemToUpdate = await _repository.GetOrderSElem(orderselemid);
            _mapper.Map<OrderSElemConfForReturnDto, OrderSElemConf>(orderSElem, orderSelemToUpdate);
            _repository.UpdateOrderSelemconf(orderSelemToUpdate);
            if(await _repository.Save())
            {
                var orderElemConfSumToUpdate = await _repository.UpdateAndReturnElemConf(orderSelemToUpdate.OrderElemConfId);
                _repository.UpdateOrderelemConf(orderElemConfSumToUpdate);
                await _repository.Save();
                var orderToUpdate = await _repository.UpdateOrderAndReturn(orderElemConfSumToUpdate.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(new { orderSElemConf = _mapper.Map<OrderSElemConfForReturnDto>(orderSelemToUpdate), 
                    orderElem = _mapper.Map<OrderElemConfForReturnDto>(orderElemConfSumToUpdate) });
            }
            return BadRequest();
        }
        [HttpPost("orderelemhand")]
        public async Task<IActionResult> InsertOrderElemHand([FromBody] OrderElemHandForInsertDto orderElemHand)
        {
            var orderElemHandForInsert = _mapper.Map<OrderElemHand>(orderElemHand);
            _repository.InsertOrderElemHand(orderElemHandForInsert);
            if(await _repository.Save())
            {
                var orderToUpdate = await _repository.UpdateOrderAndReturn(orderElemHandForInsert.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(_mapper.Map<OrderElemHandForReturnDto>(orderElemHandForInsert));
            }
            return BadRequest();
        }
        [HttpPut("orderelemhand/{orderelemhandid}")]
        public async Task<IActionResult> UpdateOrderElemHand([FromBody]OrderElemHandForReturnDto orderElemHand, Guid orderelemhandid)
        {
            var oroderElemHandToUpdate = await _repository.GetElemHand(orderelemhandid);
            _mapper.Map<OrderElemHandForReturnDto, OrderElemHand>(orderElemHand, oroderElemHandToUpdate);
            _repository.UpdateOrderElemHand(oroderElemHandToUpdate);
            if(await _repository.Save())
            {
                var orderToUpdate = await _repository.UpdateOrderAndReturn(oroderElemHandToUpdate.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(_mapper.Map<OrderElemHandForReturnDto>(oroderElemHandToUpdate));
            }
            return BadRequest();
        }
        [HttpDelete("orderelemhand/{orderelemhandid}")]
        public async Task<IActionResult> DeleteOrderElemHand(Guid orderelemhandid)
        {
            var orderElemHandForDelete = await _repository.GetElemHand(orderelemhandid);
            if (orderElemHandForDelete == null)
            {
                return NotFound();
            }
            _repository.DeleteOrderElemHand(orderElemHandForDelete);
            if(await _repository.Save())
            {
                var orderToUpdate = await _repository.UpdateOrderAndReturn(orderElemHandForDelete.OrderId);
                _repository.UpdateOrder(orderToUpdate);
                await _repository.Save();
                return Ok(_mapper.Map<OrderElemHandForReturnDto>(orderElemHandForDelete));
            }
            return BadRequest();
        }


    }
}
