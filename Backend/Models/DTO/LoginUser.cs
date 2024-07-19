namespace Backend.Models.DTO
{
    public class LoginUser
    {
        // public Guid Id { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}