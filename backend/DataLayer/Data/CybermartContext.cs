using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Data;

// dotnet ef migrations add MIGRATION_NAME --startup-project PresentationLayer --project DataLayer --context CybermartContext
// dotnet ef database update --startup-project PresentationLayer --project DataLayer
public class CybermartContext : DbContext
{

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
    }

    public CybermartContext(DbContextOptions<CybermartContext> options) : base(options)
    {
        
    }
    public DbSet<ProductsSpecifications> ProductsSpecifications { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; } 
    public DbSet<User> Users { get; set; } 

}