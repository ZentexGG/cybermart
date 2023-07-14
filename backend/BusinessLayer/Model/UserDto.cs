namespace BusinessLayer.Model;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public byte[] ImageData { get; set; }
    public string FileName { get; set; }
    // Other properties as needed
}