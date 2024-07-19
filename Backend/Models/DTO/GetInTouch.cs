namespace Backend.Models.DTO
{
    public class GetInTouch
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string Request { get; set; }
    }
}