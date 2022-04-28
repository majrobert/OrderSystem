using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Polnet_api.Data;
using Polnet_api.Dtos;
using Polnet_api.Models;
using AutoMapper;
using Polnet_api.Helpers;

namespace Polnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _repository;
        private readonly IMapper _mapper;

        public CustomerController(ICustomerRepository repository, IMapper mapper)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("category")]
        public async Task<IActionResult> GetAllCategorysCustomer()
        {
            var category = _mapper.Map<CategoryCustomerForReturnDto[]>(await _repository.GetCategorysCustomer());
            return Ok(category);
        }
        [HttpGet("{customerid}")]
        public async Task<IActionResult> GetCustomer(Guid customerid)
        {
            var customerToReturn = await _repository.GetCustomer(customerid);
            if (customerToReturn == null)
                return NotFound();
            return Ok(_mapper.Map<CustomersToResponceDto>(customerToReturn));
        }

        [HttpPost("category")]
        public async Task<IActionResult> InserCategory([FromBody] CategoryCustomerForInsertDto category)
        {
            var categoryToAdd = _mapper.Map<CategoryCustomer>(category);
            await _repository.InsertCategoryCustomer(categoryToAdd);
            if (await _repository.Save())
            {
                return Ok(_mapper.Map<CategoryCustomerForReturnDto[]>(await _repository.GetCategorysCustomer()));
            }
            return BadRequest();
        }


        [HttpPost("categoryupdate")]
        public async Task<IActionResult> UpdateCategory([FromBody] CategoryCustomerForReturnDto category)
        {
            var categoryForUpdate = await _repository.GetCategoryCustomer(category.Id);
            if (categoryForUpdate == null)
                return NotFound("Katagoria do aktualizacji nie istnieje");
            _mapper.Map(category, categoryForUpdate);
            _repository.UpdateCategoryCustomer(categoryForUpdate);
            if (await _repository.Save())
            {
                return Ok(_mapper.Map<CategoryCustomerForReturnDto[]>(await _repository.GetCategorysCustomer()));
            }
            return BadRequest();
        }
        [HttpPut("{customerid}")]
        public async Task<IActionResult> UpdateCustomer([FromBody] CustomersToResponceDto customer, Guid customerid)
        {
            var customerForUpdate = await _repository.GetCustomer(customer.Id);
            if(customerForUpdate == null)
            {
                return NotFound();
            }
            _mapper.Map<CustomersToResponceDto, Customer>(customer, customerForUpdate);
            _repository.UpdateCustomer(customerForUpdate);
            if(await _repository.Save())
            {
                return Ok(_mapper.Map<CustomersToResponceDto>(customerForUpdate));
            }
            return BadRequest();
            
        }

        [HttpDelete("category/{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var categoryToDelete = await _repository.GetCategoryCustomer(id);

            if (categoryToDelete == null)
                return NotFound("");            
            if (await _repository.ExisCustomerInCategory(id))
                return BadRequest("Istnieje Klient w danej kategorji");

            _repository.DeleteCategoryCustomer(categoryToDelete);
            if (await _repository.Save())
            {
                return Ok(_mapper.Map<CategoryCustomerForReturnDto[]>(await _repository.GetCategorysCustomer()));
            }
            return BadRequest();
        }
        [HttpDelete("{customerid}")]
        public async Task<IActionResult> DeleteCustomer(Guid customerid)
        {
            var customerforDelete = await _repository.GetCustomer(customerid);
            if (customerforDelete == null)
                return NotFound();
            _repository.DeleteCustomer(customerforDelete);
            if (await _repository.Save())
            {
                return Ok(_mapper.Map<CustomersToResponceDto>(customerforDelete));
            }
            return BadRequest();

        }
        [HttpPost]
        public async Task<IActionResult> InsertCustomer([FromBody]CustomerToInsertDto customerInsert)
        {
            var customerToAdd = _mapper.Map<Customer>(customerInsert);  
            _repository.InsertCustomer(customerToAdd);
            if(await _repository.Save())
            {
                return Ok(customerToAdd);
            }
            return BadRequest();
        }

        [HttpPost("customerlist")]
        public async Task<IActionResult> GetCuatomersList([FromBody]CustomersResourceParameters customersParameters)
        {
            var customers = await _repository.GetCustomerList(customersParameters);
            if(customers != null)
            {
                return Ok(new { customers = _mapper.Map<CustomersToResponceDto[]>(customers)
                , total = customers.TotalCount});
            }
            return BadRequest();
        }

    }
}
