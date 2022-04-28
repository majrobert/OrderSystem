using AutoMapper;
using Polnet_api.Controllers;
using Polnet_api.Dtos;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserForListDto>();
            CreateMap<Role, RoleToInsertDto>().ReverseMap();
            CreateMap<AppUser, UserRoleDto>().ReverseMap();
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<CategoryProd, CategoryProductToInsertDto>().ReverseMap();
            CreateMap<CategoryProd, CategoryProductForReturnDto>().ReverseMap();
            CreateMap<CategoryCustomer, CategoryCustomerForReturnDto>().ReverseMap();
            CreateMap<CategoryCustomer, CategoryCustomerForInsertDto>().ReverseMap();
            CreateMap<Product, ProductForInsertDto>().ReverseMap();
            CreateMap<Product, ProductForReturnDto>().ReverseMap();
            CreateMap<Product, ProductForUpdateDto>().ReverseMap();
            CreateMap<Price, PriceForInsertDto>().ReverseMap();
            CreateMap<Price, PriceForUpdateDto>().ReverseMap();
            CreateMap<Customer, CustomerToInsertDto>().ReverseMap();
            CreateMap<Customer, CustomersToResponceDto>().ReverseMap();
            CreateMap<ProductPrice, ProductPriceResponceDto>().ReverseMap();
            CreateMap<PriceSpec, PriceSpecForReturnDto>().ReverseMap();
            CreateMap<ProductConf, ProductConfForInsertDto>().ReverseMap();
            CreateMap<ProductConf, ProductConfForUpdateDto>().ReverseMap();
            CreateMap<ProductConfElem, ProductConfElemForInsertDto>().ReverseMap();
            CreateMap<ProductConfElem, ProductConfElemForUpdateDto>().ReverseMap();
            CreateMap<Currency, CurrencyForInsertDto>().ReverseMap();
            CreateMap<Currency, CurrencyForReturnDto>().ReverseMap();
            CreateMap<Order, OrderForInsertDto>().ReverseMap();
            CreateMap<Order, OrderForReturnDto>().ReverseMap();
            CreateMap<OrderHeader, OrderHeaderForInsertDto>().ReverseMap();
            CreateMap<OrderHeader, OrderHeaderForReturnDto>().ReverseMap();
            CreateMap<OrderElem, OrderElemForReturnDto>().ReverseMap();
            CreateMap<OrderElem, OrderElemForInsertDto>().ReverseMap();
            CreateMap<OrderElemConf, OrderElemConfForReturnDto>().ReverseMap();
            CreateMap<OrderElemConf, OrderElemConfForInsertDto>().ReverseMap();
            CreateMap<OrderElemHand, OrderElemHandForReturnDto>().ReverseMap();
            CreateMap<OrderElemHand, OrderElemHandForInsertDto>().ReverseMap();
            CreateMap<OrderSElemConf, OrderSElemConfForReturnDto>().ReverseMap();
            CreateMap<OrderSElemConf, OrderSElemConfForInsertDto>().ReverseMap();
            
        }
    }
}
