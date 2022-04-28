using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Polnet_api.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api.Data
{
    public class DataContext : IdentityDbContext<AppUser, Role, string>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Price> Prices { get; set; }
        public DbSet<PriceSpec> PriceSpecs { get; set; }
        public DbSet<ProductPrice> ProductPrices { get; set; }
        public DbSet<CategoryProd> CategoryProds { get; set; }
        public DbSet<CategoryCustomer> CategoryCustomers { get; set; }
        public DbSet<OrderElemHand> OrderElemHands { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<OrderElemConf> OrderElemConfs { get; set; }
        public DbSet<OrderElem> OrderElems { get; set; }
        public DbSet<ProductConfElem> ProductConfElems { get; set; }
        public DbSet<ProductConf> ProductConfs { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderSElemConf> OrderSElemConfs { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<OrderHeader> OrderHeaders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppUser>(b =>
            {
                b.HasMany(e => e.UserRoles)
                .WithOne(e => e.AppUser)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            });

            builder.Entity<Role>(b =>
            {
                b.HasMany(e => e.UserRoles)
                               .WithOne(e => e.Role)
                               .HasForeignKey(ur => ur.RoleId)
                               .IsRequired();
            });

            builder.Entity<PriceSpec>().HasKey(s => new { s.CustomerId, s.ProductId });
            builder.Entity<ProductPrice>().HasKey(s => new { s.ProductId, s.PriceId });


        }
    }

    
}
