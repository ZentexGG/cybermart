namespace BusinessLayer.Model;

public class ProductPhotoDto
{
    public int Id { get; set; }
    public string FileName { get; set; }
    public byte[] ImageData { get; set; }
    public DateTime UploadDate { get; set; }
}