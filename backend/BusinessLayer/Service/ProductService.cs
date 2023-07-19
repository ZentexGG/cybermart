using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class ProductService : IProductService
{
    private readonly IDbContext _context;

    public ProductService(IDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductDto>> GetProductsAsync(int page = 1, int limit = 10)
    {
        var offset = (page - 1) * limit;
        var products = await _context.Products.Include(p=>p.Photos)
            .OrderBy(p => p.ID)
            .Skip(offset)
            .Take(limit)
            .ToListAsync();
        
        var productDtos = products.Select(product => new ProductDto
        {
            ID = product.ID,
            Name = product.Name,
            Price = product.Price,
            Description = product.Description,
            CategoryId = product.CategoryId,
            Specifications = product.Specifications,
            Photos = product.Photos.Select(photo => new ProductPhotoDto
            {
                Id = photo.Id,
                FileName = photo.FileName,
                ImageData = photo.ImageData,
                UploadDate = photo.UploadDate
            }).ToList()
        });

        return productDtos;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
        var products = await _context.Products
            .Include(p => p.Photos)
            .ToListAsync();

        var productDtos = products.Select(product => new ProductDto
        {
            ID = product.ID,
            Name = product.Name,
            Price = product.Price,
            Description = product.Description,
            CategoryId = product.CategoryId,
            Specifications = product.Specifications,
            Photos = product.Photos.Select(photo => new ProductPhotoDto
            {
                Id = photo.Id,
                FileName = photo.FileName,
                ImageData = photo.ImageData,
                UploadDate = photo.UploadDate
            }).ToList()
        });

        return productDtos;
    }



    public async Task<ProductDto> GetByIdAsync(int id)
    {
        var product = await _context.Products
            .Include(product => product.Specifications )
            .Include(p => p.Photos)
            .FirstOrDefaultAsync(p => p.ID == id);
        if (product == null)
        {
            return null;
        }

        // Ensure that the necessary properties are not null
        if (product.Name == null || product.Price == null)
        {
            return null;
        }

        var productDto = new ProductDto
        {
            ID = product.ID,
            Name = product.Name,
            Price = product.Price,
            Description = product.Description,
            CategoryId = product.CategoryId,
            Specifications = product.Specifications,
            Photos = product.Photos?.Select(photo => new ProductPhotoDto
            {
                Id = photo.Id,
                FileName = photo.FileName,
                ImageData = photo.ImageData,
                UploadDate = photo.UploadDate
            }).ToList() ?? new List<ProductPhotoDto>()
        };

        return productDto;
    }



    public async Task CreateAsync(int ID, string Name, double Price, string Description, int CategoryId, List<Specification> specifications, List<IFormFile> photos)
    {
        try
        {
            var product = new Product
            {
                ID = ID,
                Name = Name,
                Price = Price,
                Description = Description,
                CategoryId = CategoryId,
                Specifications = specifications,
                // Set other properties as needed
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            if (photos != null && photos.Any())
            {
                foreach (var file in photos)
                {
                    using var stream = new MemoryStream();
                    await file.CopyToAsync(stream);

                    var photo = new ProductPhoto
                    {
                        FileName = file.FileName,
                        ImageData = stream.ToArray(),
                        UploadDate = DateTime.UtcNow,
                        ProductId = product.ID
                    };

                    _context.ProductPhotos.Add(photo);
                }

                await _context.SaveChangesAsync();
            }
        }
        catch (DbUpdateException e)
        {
            throw new ApplicationException("Failed to save due to a database error.", e);
        }
    }










    public async Task UpdateAsync(int id, Product product)
    {
        var productToUpdate = await _context.Products.FirstOrDefaultAsync(p => p.ID == id);
        if (productToUpdate == null) throw new KeyNotFoundException("The specified ID was not found!");

        var properties = typeof(Product).GetProperties();
        foreach (var property in properties)
        {
            var value = property.GetValue(product);
            property.SetValue(productToUpdate, value);
        }

        _context.UpdateEntityState(productToUpdate, EntityState.Modified);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var productToDelete = await _context.Products.FirstOrDefaultAsync(p => p.ID == id);
        if (productToDelete == null) throw new KeyNotFoundException("The specified ID was not found!");

        _context.Products.Remove(productToDelete);
        await _context.SaveChangesAsync();
    }
}