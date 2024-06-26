﻿using BusinessLayer.Interfaces;
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

    public async Task<IEnumerable<ProductDto>> GetSearchedProducts(string name)
    {
        var products = await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Photos)
            .Where(p => p.Name.ToLower().Contains(name.ToLower()))
            .Take(5)
            .ToListAsync();
        var productDtos = products.Select(product => new ProductDto
        {
                ID = product.ID,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
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
    public async Task<IEnumerable<ProductDto>> GetProductsAsync(int page = 1, int limit = 20)
    {
        var offset = (page - 1) * limit;
        var products = await _context.Products.Include(p => p.Photos)
            .Include(p => p.Category)
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
            CategoryName = product.Category.Name,
            Photos = product.Photos.Take(1).Select(photo => new ProductPhotoDto
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
            Specifications = product.Specifications.Select(spec => new SpecificationDto
            {
                SpecificationTypeId = spec.SpecificationTypeId,
                Value = spec.Value
            }).ToList(),
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
            .Include(product => product.Category)
            .Include(product => product.Specifications )
            .ThenInclude(s => s.SpecificationType)
            .Include(p => p.Photos)
            .FirstOrDefaultAsync(p => p.ID == id);
        if (product == null)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }

        if (product.Name == null)
        {
            throw new KeyNotFoundException("Product name and price fields are null!");
        }

        var productDto = new ProductDto
        {
            ID = product.ID,
            Name = product.Name,
            Price = product.Price,
            Description = product.Description,
            CategoryId = product.CategoryId,
            CategoryName = product.Category.Name,
            Specifications = product.Specifications.Select(spec => new SpecificationDto
            {
                SpecificationTypeName = spec.SpecificationType.Name,
                SpecificationTypeId = spec.SpecificationTypeId,
                Value = spec.Value
            }).ToList(),
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



    public async Task<Product> CreateAsync(int ID, string Name, double Price, string Description, int CategoryId, List<SpecificationDto> specifications, List<IFormFile> photos)
    {
        try
        {
            var product = new Product
            {
                ID = ID,
                Name = Name,
                Price = Price,
                Description = Description,
                CategoryId = CategoryId
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            if (!photos.Any()) return product;
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

            return product;
        }
        catch (DbUpdateException e)
        {
            throw new ApplicationException("Failed to save due to a database error.", e);
        }
    }

    public async Task<Product> PutAsync(int ID, string Name, double Price, string Description, int CategoryId,
        List<SpecificationDto> specifications, List<IFormFile> photos)
    {
        var productToModify = await _context.Products.FirstAsync(p => p.ID == ID);
        productToModify.Name = Name;
        productToModify.Price = Price;
        productToModify.Description = Description;
        // If the product category changes, all current specs are deleted
        // since they are redundant and to make room for the new specs
        if (productToModify.CategoryId != CategoryId)
        {
            productToModify.CategoryId = CategoryId;
            var specsToRemove =
                await _context.Specifications.Where(s => s.ProductId == productToModify.ID).ToListAsync();
            _context.Specifications.RemoveRange(specsToRemove);
        }
        await _context.SaveChangesAsync();
        return productToModify;
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
        var specsToDelete = await _context.Specifications.Where(s => s.ProductId == id).ToListAsync();
        foreach (var specification in specsToDelete)
        {
            _context.Specifications.Remove(specification);
        }
        _context.Products.Remove(productToDelete);
        await _context.SaveChangesAsync();
    }

    public async Task<int> GetProductCountAsync()
    {
        try
        {
            return await _context.Products.CountAsync();
        }
        catch (Exception e)
        {
            throw new InvalidDataException(e.Message);
        }
    }
}