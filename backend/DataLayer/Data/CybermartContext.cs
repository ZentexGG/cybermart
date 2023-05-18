using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Data;

public class CybermartContext : DbContext
{
    public DbSet<Order> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"");
    }
}