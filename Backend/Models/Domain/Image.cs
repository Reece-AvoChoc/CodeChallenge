namespace Backend.Models.Domain
{
    public class Image
    {
        public int Id { get; set; }
        public string? FileName { get; set; }
        public string? FileExtension { get; set; }
        public string? Title { get; set; }
        public string? URL { get; set; }

    }
}