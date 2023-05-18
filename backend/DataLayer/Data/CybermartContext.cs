using DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Data;

// dotnet ef migrations add MIGRATION_NAME --startup-project PresentationLayer --project DataLayer --context CybermartContext
// dotnet ef database update --startup-project PresentationLayer --project DataLayer
public class CybermartContext : DbContext
{
    public CybermartContext(DbContextOptions<CybermartContext> options) : base(options)
    {
        
    }
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

}