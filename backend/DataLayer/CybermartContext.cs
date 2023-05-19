using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public class CybermartContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> ProductTypes { get; set; }
        public DbSet<Specifications> Specifications { get; set; }
        public DbSet<ProductsSpecifications> ProductSpecifications { get; set; }

        public CybermartContext(DbContextOptions<CybermartContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=""90.95.196.253, 1433"";Initial Catalog=Cybermart;Persist Security Info=True;User ID=Dani;Password=***********");
        }
    }

}
