using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Polnet_api.Data;
using Polnet_api.Dtos;
using Polnet_api.Helpers;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceListController : ControllerBase
    {
        private readonly IPriceListRepository _repository;
        private readonly IMapper _mapper;

        public PriceListController(IPriceListRepository repository, IMapper mapper)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        [HttpPost("pricelist")]
      public async Task<IActionResult> GetProductWitchPrice([FromBody]ProductsPricesParameters pricesParameters)
        {
            var items = await _repository.GetProductPriceList(pricesParameters);
            var price = await _repository.GetPriceTypeList();
            return  Ok( new { total = items.TotalPages,
              productsPrice = _mapper.Map<ProductPriceResponceDto[]>(items.productPrice) ,
              products = _mapper.Map<ProductForReturnDto[]>(items.product),
              priceType = price
            });
        }

        [HttpPost("pricelistorder/{orderid}/{customerid}")]
        public async Task<IActionResult> GetProductWitchPriceOrcerClient(
            [FromBody]ProductsPricesParameters pricesParameters, Guid orderid, Guid customerid)
        {
            var items = await _repository.GetProductPriceListOrderCustomer(pricesParameters, orderid, customerid);
            return Ok(items);
        }

        [HttpGet("product/{productid}")]
        public async Task<IActionResult> getPriceByProduct(Guid productid)
        {
            var productPrice = await _repository.GetPricesByProduct(productid);
            if (productPrice == null)
                return NotFound();
           return Ok(productPrice);
        }
        [HttpGet("productprice/{productid}")]
        public async Task<IActionResult> getPricesSpecByProduct(Guid productid)
        {
            // powieranie ceny dla grypy cen oraz cenę specialna dla klienta oraz dane klienta
            var productPrice= await _repository.GetPricesByProduct(productid);
            if (productPrice == null)
                return NotFound();
            var priceSpec = await _repository.GetPriceSpecsForProduct(productid);
            var customwerForPriceSpec = await _repository.GetCustomersListForPriceSpec(productid);
            return Ok( new {productPrice = _mapper.Map<ProductPriceResponceDto[]>(productPrice), 
                priceSpec =_mapper.Map<PriceSpecForReturnDto[]>(priceSpec) , 
                customer = _mapper.Map<CustomersToResponceDto[]>(customwerForPriceSpec.Distinct())});
        }
        [HttpPost("productprice")]
        public async Task<IActionResult> AddProductPrice([FromBody] ProductPriceResponceDto productPrice)
        {
            var productPriceForInsert = _mapper.Map<ProductPrice>(productPrice);
            _repository.InsertProductPrice(productPriceForInsert);
            if (await _repository.Save())
            {
                return Ok(await _repository.GetPricesByProduct(productPriceForInsert.ProductId));
            }
            return BadRequest();
        }
        [HttpPut("productprice/{productid}")]
        public async Task<IActionResult> UpdateProductPrice([FromBody] ProductPriceResponceDto productPriceResponceDto, Guid productId)
        {
            var ProductPriceforForUpdate = await _repository.GetProductPrice(productId, productPriceResponceDto.PriceId);
            _mapper.Map<ProductPriceResponceDto, ProductPrice>(productPriceResponceDto, ProductPriceforForUpdate);
            _repository.UpdateProductPrice(ProductPriceforForUpdate);
            if(await _repository.Save())
            {
                return Ok(await _repository.GetPricesByProduct(productId));
            }
            return BadRequest();
        }

        [HttpPost("type")]
        public async Task<IActionResult> InsertPriceType([FromBody] PriceForInsertDto pricetype)
        {
            var priceTypeToInsert = _mapper.Map<Price>(pricetype);
            _repository.InsertPriceListType(priceTypeToInsert);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<Price>(priceTypeToInsert));
            }
            return BadRequest();
        }
        [HttpGet("type")]
        public async Task<IActionResult> GetAllPriceListType()
        {
            var price = await _repository.GetPriceTypeList();
            if (price == null)
                return NotFound();
            return Ok(price);
        }
        [HttpPut("type/{id}")]
        public async Task<IActionResult> UpdatePriceType([FromBody]PriceForUpdateDto price, Guid id)
        {
            var priceTypeToUpdate = await _repository.GetOnePriceType(id);
            _mapper.Map<PriceForUpdateDto, Price>(price, priceTypeToUpdate);
            if (priceTypeToUpdate == null)
                return NotFound();
            _repository.UpdatePriceListType(priceTypeToUpdate);
            if (await _repository.Save())
            {
                return Ok(await _repository.GetPriceTypeList());
            }
            return BadRequest();
        }
    }
}
