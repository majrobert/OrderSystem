using Polnet_api.Models;
using Polnet_api.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<CategoryCustomer>> GetCategorysCustomer();
        Task<CategoryCustomer> GetCategoryCustomer(Guid categoryId);
        void UpdateCategoryCustomer(CategoryCustomer categoryCustomer);
        Task InsertCategoryCustomer(CategoryCustomer categoryCustomer);
        void DeleteCategoryCustomer(CategoryCustomer categoryCustomer);
        bool CategoryCustomerExist(Guid caregoryId);

        void InsertCustomer(Customer customer);
        Task<PagedList<Customer>> GetCustomerList(CustomersResourceParameters customersResourceParameters);
        Task<Customer> GetCustomer(Guid customerId);
        void DeleteCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        bool CustomerExist(Guid customerId);
        Task<bool> ExisCustomerInCategory(Guid categoryId);
        Task<bool> Save();
    }
}
