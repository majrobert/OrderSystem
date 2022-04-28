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
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repository, IMapper mapper)
        {
           _repository = repository ?? throw new  ArgumentNullException(nameof(repository));
           _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper)); 
        }

        [HttpPost]
        public async Task<IActionResult> InsertProduct([FromBody] ProductForInsertDto productInset)
        {
            var productToInsert = _mapper.Map<Product>(productInset);
            _repository.InsertProduct(productToInsert);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<ProductForReturnDto>(await _repository.GetproductIncCategory(productToInsert.Id)) );
            }
            return BadRequest();
        }
        [HttpPost("productslist")]
        public async Task<IActionResult> GetProductsList([FromBody]ProductsResourceParameters productsResourceParameters)
        {
            var products = await _repository.GetProductList(productsResourceParameters);
            if(products != null)
            {
                return Ok(new { products = _mapper.Map<ProductForReturnDto[]>(products), total= products.TotalCount });
            }
            return BadRequest();
        }

        [HttpGet("category")]
        public async Task<IActionResult> GetAllProductCategory()
        {
            var category = _mapper.Map<IEnumerable<CategoryProductForReturnDto>>(await _repository.GetCategorysProduct());
            return Ok(category);
        }
        [HttpPost("category")]
        public async Task<IActionResult> InserCategory([FromBody] CategoryProductToInsertDto category)
        {
            var categoryToInsert = _mapper.Map<CategoryProd>(category);
             _repository.InsertCategorysProduct(categoryToInsert);
         // var result = await _repository.Save();
            if(await _repository.Save())
            {
                return Ok( _mapper.Map<CategoryProductForReturnDto[]>( await _repository.GetCategorysProduct()));
            }
            return BadRequest();
        }

        [HttpPost("categoryupdate")]
        public async Task<IActionResult> UpdateCategory([FromBody] CategoryProductForReturnDto category)
        {
            var categoryToUpdate = await _repository.GetCategoryProduct(category.Id);
            categoryToUpdate.Name = category.Name;
            categoryToUpdate.Details = category.Details;
            categoryToUpdate.Sort = category.Sort;
            if (categoryToUpdate == null)
            {
                return NotFound();
            }
            _repository.UpdateGetCategorysProduct(categoryToUpdate);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<CategoryProductForReturnDto[]>(await _repository.GetCategorysProduct()));
            }
            return BadRequest();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct([FromBody]ProductForUpdateDto productForUpdateDto, Guid id)
        {
            var product = await _repository.Getproduct(productForUpdateDto.Id);
            if (product == null)
                return NotFound("nie znaleziono pozycji w bazie");
            _mapper.Map<ProductForUpdateDto, Product>(productForUpdateDto, product);
            _repository.UpdateProduct(product);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<ProductForReturnDto>(product));
            }
            return BadRequest("nie zaktualizowano pozycji");
        }

        [HttpDelete("category/{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id )
        {
            var categoryToDelelete = await _repository.GetCategoryProduct(id);

            if (await _repository.ExistProductInCategory(id))
                return NotFound("Produkt istnieje w kategorji");

            if (categoryToDelelete == null)
            {
                return NotFound();
            }
            _repository.DeleteCategoryProduct(categoryToDelelete);
            if (await _repository.Save())
            {
                return Ok(_mapper.Map<CategoryProductForReturnDto[]>(await _repository.GetCategorysProduct()));
            }
            return BadRequest();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var productToDelete = await _repository.Getproduct(id);
            if (productToDelete == null)
                return NotFound("Nie znaleziono pozycji w bazie");
            _repository.DeleteProduct(productToDelete);
            if(await _repository.Save())
            {
                return Ok();
            }
            return BadRequest("Błąd nie skazowano pozycji");
        }


    }
}
