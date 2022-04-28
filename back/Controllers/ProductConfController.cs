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
    public class ProductConfController : ControllerBase
    {
        private readonly IProductConfRepository _repository;
        private readonly IMapper _mapper;

        public ProductConfController(IProductConfRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> InsertProductConf([FromBody] ProductConfForUpdateDto productConf)
        {
            var priceToInsert = _mapper.Map<ProductConf>(productConf);
            _repository.InsertProductConf(priceToInsert);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<ProductConfForUpdateDto>(priceToInsert));
            }
            return BadRequest();
        }
        [HttpPost("list")]
        public async Task<IActionResult> GetProductConfList([FromBody] 
        ProductsResourceParameters productsResource)
        {
            var items = await _repository.GetProductConfList(productsResource);
            return Ok(new { total = items.TotalPages, 
                productConf = _mapper.Map<ProductConfForUpdateDto[]>(items.productConf),
                productConfElem = _mapper.Map<ProductConfElemForUpdateDto[]>(items.productConfElem)
            });
        }
        [HttpDelete("{productid}")]
        public async Task<IActionResult> DeleteProductConf(Guid productid)
        {
            var productToDelete = await _repository.GetProductConf(productid);
            if (productToDelete == null)
                return NotFound("nie znaleziono pozycji");

            _repository.DeleteProductConf(productToDelete);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<ProductConfForUpdateDto>(productToDelete));
            }
            return BadRequest();
        }
        [HttpPut("{productid}")]
        public async Task<IActionResult> UpdateProductConf(
            [FromBody]ProductConfForUpdateDto product, Guid productid)
        {
            var productForUpdate = await _repository.GetProductConf(productid);
            if (productForUpdate == null)
                return NotFound("nie znaleziono pozycji");
            _mapper.Map<ProductConfForUpdateDto, ProductConf>(product, productForUpdate);
            _repository.UpdateProductConf(productForUpdate);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<ProductConfForUpdateDto>(productForUpdate));
            }
            return BadRequest();
        }
        [HttpPost("elem")]
        public async Task<IActionResult> addproductConfElem([FromBody]ProductConfElemForInsertDto productConf)
        {
            var categoryToInsert = _mapper.Map<ProductConfElem>(productConf);
            _repository.InsertProductConfElem(categoryToInsert);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<ProductConfElemForUpdateDto>(categoryToInsert));
            }
            return BadRequest();
        }
        [HttpDelete("elem/{productid}")]
        public async Task<IActionResult> deleteConfElement(Guid productid)
        {
            var productToDelete = await _repository.GetProductConfElem(productid);
            if (productToDelete == null)
                return NotFound();
            _repository.DeleteProductContElem(productToDelete);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<ProductConfElemForUpdateDto>(productToDelete));
            }
            return BadRequest();
        }
        [HttpPut("elem/{productid}")]
        public async Task<IActionResult> updateProductConfElem([FromBody] ProductConfElemForUpdateDto product, Guid productid)
        {
            var productToUpdate = await _repository.GetProductConfElem(productid);
            if (productToUpdate == null)
                return NotFound();
            _mapper.Map<ProductConfElemForUpdateDto, ProductConfElem>(product, productToUpdate);
            _repository.UpdateProductConfElem(productToUpdate);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<ProductConfElemForUpdateDto>(productToUpdate));
            }
            return BadRequest();
        }
    }
}
