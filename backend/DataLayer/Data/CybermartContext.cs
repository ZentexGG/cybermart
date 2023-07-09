using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Data;

// dotnet ef migrations add MIGRATION_NAME --startup-project PresentationLayer --project DataLayer --context CybermartContext
// dotnet ef database update --startup-project PresentationLayer --project DataLayer
public class CybermartContext : IdentityDbContext<IdentityUser>,IDbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Relationship: Product -> Category
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany()
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        // Relationship: Specification -> Product
        modelBuilder.Entity<Specification>()
            .HasOne(sp => sp.Product)
            .WithMany(p => p.Specifications)
            .HasForeignKey(sp => sp.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        // Relationship: Specification -> SpecificationType
        modelBuilder.Entity<Specification>()
            .HasOne(sp => sp.SpecificationType)
            .WithMany(st => st.Specifications)
            .HasForeignKey(sp => sp.SpecificationTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Relationship: SpecificationType -> Specification
        modelBuilder.Entity<SpecificationType>()
            .HasMany(st => st.Specifications)
            .WithOne(sp => sp.SpecificationType)
            .HasForeignKey(sp => sp.SpecificationTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique index on Specification's ProductId and SpecificationTypeId
        modelBuilder.Entity<Specification>()
            .HasIndex(sp => new { sp.ProductId, sp.SpecificationTypeId })
            .IsUnique();

        // Configure ProductPhoto's Size property as decimal(18,2)
        modelBuilder.Entity<ProductPhoto>()
            .Property(pp => pp.Size)
            .HasColumnType("decimal(18,2)");

        // Add any additional configurations for your entities

        base.OnModelCreating(modelBuilder);
        SeedRoles(modelBuilder);
    }
    
    public CybermartContext(DbContextOptions<CybermartContext> options) : base(options) { }

    public Task<int> SaveChangesAsync()
    {
        return base.SaveChangesAsync();
    }
    private void SeedRoles(ModelBuilder builder)
    {
        builder.Entity<IdentityRole>().HasData
        (
            new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "ADMIN" },
            new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "USER" }
        );
    }
    public void UpdateEntityState<TEntity>(TEntity entity, EntityState state) where TEntity : class
    {
        Entry(entity).State = state;
    }
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<ProductPhoto> ProductPhotos { get; set; } = null!;
    public DbSet<Specification> Specifications { get; set; } = null!;
    public DbSet<SpecificationType> SpecificationTypes { get; set; } = null!;
}