using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class ProductPhotoService : IProductPhotoService
{
    private readonly IDbContext _context;

    public ProductPhotoService(IDbContext context)
    {
        _context = context;
    }
    public async Task<ProductPhotoDto> Modify(int imgId, IFormFile newPhoto)
    {
        var photoToModify = await _context.ProductPhotos.FirstOrDefaultAsync(p => p.Id == imgId);
        if (photoToModify == null)
        {
            throw new KeyNotFoundException("The specified image ID was not found!");
        }

        try
        {
            using var stream = new MemoryStream();
            await newPhoto.CopyToAsync(stream);

            photoToModify.FileName = newPhoto.FileName;
            photoToModify.ImageData = stream.ToArray();
            photoToModify.UploadDate = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            return new ProductPhotoDto
            {
                FileName = photoToModify.FileName,
                Id = photoToModify.Id,
                ImageData = photoToModify.ImageData,
                UploadDate = photoToModify.UploadDate
            };
        }
        catch (Exception e)
        {
            throw new ApplicationException("Failed to save due to a database error.", e);
        }
    }

    public async Task<ProductPhotoDto> AddSingle(int productId, IFormFile newPhoto)
    {
        var productIdExists = await _context.Products.FirstOrDefaultAsync(p => p.ID == productId) != null;
        if (!productIdExists)
        {
            throw new KeyNotFoundException("The specified product ID was not found!");
        }

        try
        {
            using var stream = new MemoryStream();
            await newPhoto.CopyToAsync(stream);
            var newImg = new ProductPhoto
            {
                FileName = newPhoto.FileName,
                ImageData = stream.ToArray(),
                UploadDate = DateTime.UtcNow,
                ProductId = productId
            };
            await _context.ProductPhotos.AddAsync(newImg);
            await _context.SaveChangesAsync();
            return new ProductPhotoDto
            {
                FileName = newImg.FileName,
                Id = newImg.Id,
                UploadDate = newImg.UploadDate,
                ImageData = newImg.ImageData
            };
        }
        catch (Exception e)
        {
            throw new ApplicationException("Failed to save due to a database error ", e);
        }
    }

    public async Task Delete(int imgId)
    {
        var photoToDelete = await _context.ProductPhotos.FirstOrDefaultAsync(p => p.Id == imgId);
        if (photoToDelete == null)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }

        try
        {
            _context.ProductPhotos.Remove(photoToDelete);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new ApplicationException("Failed to save due to a database error", e);
        }}
    }