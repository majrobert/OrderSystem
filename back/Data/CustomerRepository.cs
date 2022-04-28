using Microsoft.EntityFrameworkCore;
using Polnet_api.Helpers;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly DataContext _context;
        public CustomerRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public bool CategoryCustomerExist(Guid caregoryId)
        {
            if (caregoryId == Guid.Empty)
                throw new ArgumentNullException(nameof(caregoryId));
            return _context.CategoryCustomers.Any(a => a.Id == caregoryId);
        }

        public bool CustomerExist(Guid customerId)
        {
            if(customerId == Guid.Empty)
                throw new ArgumentNullException(nameof(customerId));
            return _context.Customers.Any(p => p.Id == customerId);
        }

        public void DeleteCategoryCustomer(CategoryCustomer categoryCustomer)
        {
            if(categoryCustomer == null)
                throw new ArgumentNullException(nameof(categoryCustomer));
            _context.CategoryCustomers.Remove(categoryCustomer);
        }

        public void DeleteCustomer(Customer customer)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));
            _context.Customers.Remove(customer);
        }

        public async Task<bool> ExisCustomerInCategory(Guid categoryId)
        {
            if (categoryId == Guid.Empty)
               throw new ArgumentNullException(nameof(categoryId));
            return await _context.Products.AnyAsync(p => p.CategoryProd.Id == categoryId);
        }

        public async Task<CategoryCustomer> GetCategoryCustomer(Guid categoryId)
        {
            if(categoryId == Guid.Empty)
                throw new ArgumentNullException(nameof(categoryId));
            return await _context.CategoryCustomers.Where(c => c.Id == categoryId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<CategoryCustomer>> GetCategorysCustomer()
        {
            return  await _context.CategoryCustomers.ToListAsync();
        }

        public async Task<Customer> GetCustomer(Guid customerId)
        {
            if (customerId == Guid.Empty)
                throw new ArgumentNullException(nameof(customerId));
            return await _context.Customers.Where(c => c.Id == customerId).FirstOrDefaultAsync();
                
        }

        public async Task<PagedList<Customer>> GetCustomerList(CustomersResourceParameters customersParameters)
        {
            if (customersParameters == null)
                throw new ArgumentNullException(nameof(customersParameters));
            var colection = _context.Customers as IQueryable<Customer>;
            if (!string.IsNullOrEmpty(customersParameters.Pricegroup))
            {
                var catPrice = Guid.Parse(customersParameters.Pricegroup.Trim());
                colection = colection.Where(c => c.PriceId == catPrice);
            }
            if (!string.IsNullOrEmpty(customersParameters.Category))
            {
                var category = Guid.Parse(customersParameters.Category.Trim());
                colection = colection.Where(c => c.CategoryCustomerId == category);
            }
            if (!string.IsNullOrEmpty(customersParameters.Filter))
            {
                var filter = customersParameters.Filter.Trim();
                colection = colection.Where(c => c.Akronim.Contains(filter) ||
                c.Name.Contains(filter) || c.Nip.Contains(filter));
            }
            if(customersParameters.Status != -1)
            {
                colection = colection.Where(c => c.Status == customersParameters.Status);
            }
            var totalCount = await colection.CountAsync();
            var items = await colection
                .Skip(customersParameters.PageSize * (customersParameters.PageIndex - 1))
                .Take(customersParameters.PageSize)
                .ToListAsync();
            return new PagedList<Customer>(items, totalCount,
                customersParameters.PageIndex,
                customersParameters.PageSize);

        }

        public async Task InsertCategoryCustomer(CategoryCustomer categoryCustomer)
        {
            if (categoryCustomer == null)
                throw new ArgumentNullException(nameof(categoryCustomer));
            await _context.CategoryCustomers.AddAsync(categoryCustomer);
        }

        public void InsertCustomer(Customer customer)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));
            _context.Customers.AddAsync(customer);
        }

        public async Task<bool> Save()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }

        public void UpdateCategoryCustomer(CategoryCustomer categoryCustomer)
        {
            if (categoryCustomer == null)
                throw new ArgumentNullException(nameof(categoryCustomer));
            _context.CategoryCustomers.Update(categoryCustomer);
        }

        public void UpdateCustomer(Customer customer)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));
            _context.Customers.Update(customer);
        }
    }
}
