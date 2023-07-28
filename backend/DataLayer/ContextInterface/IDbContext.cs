using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.ContextInterface;

public interface IDbContext
{
    DbSet<Order> Orders { get; set; }
    DbSet<Category> Categories { get; set; }
    DbSet<Product> Products { get; set; }
    DbSet<Specification> Specifications { get; set; }
    DbSet<SpecificationType> SpecificationTypes { get; set; }
    DbSet<ProductPhoto> ProductPhotos { get; set; }
    DbSet<UserPhoto> UserPhotos { get; set; }

    DbSet<User> Users { get; set; }
    DbSet<OrderProduct> OrderProducts { get; set; }
    int SaveChanges();
    Task<int> SaveChangesAsync();
    void UpdateEntityState<TEntity>(TEntity entity, EntityState state) where TEntity : class;
}