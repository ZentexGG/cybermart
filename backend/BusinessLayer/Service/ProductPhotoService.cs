using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.ContextInterface;
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

    public async Task Add(int productId, ProductPhotoDto newPhoto)
    {
        throw new NotImplementedException();
    }

    public async Task Delete(int imgId)
    {
        throw new NotImplementedException();
    }
}