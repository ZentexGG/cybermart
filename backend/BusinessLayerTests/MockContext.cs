using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayerTests;

public class MockContext : DbContext, IDbContext
{
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Specification> Specifications { get; set; }
    public virtual DbSet<SpecificationType> SpecificationTypes { get; set; }
    public virtual DbSet<ProductPhoto> ProductPhotos { get; set; }
    public virtual DbSet<User> Users { get; set; }

    public virtual Task<int> SaveChangesAsync()
    {
        return base.SaveChangesAsync();
    }

    public virtual void UpdateEntityState<TEntity>(TEntity entity, EntityState state) where TEntity : class
    {
        Entry(entity).State = state;
    }
}