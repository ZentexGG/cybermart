using System.ComponentModel.DataAnnotations;

namespace DataLayer.Entities
{
    public class UserPhoto
    {
        [Key]
        public int Id { get; set; }

        public string FileName { get; set; }

        public byte[] ImageData { get; set; }

        public DateTime UploadDate { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}