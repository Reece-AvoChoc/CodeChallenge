using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Data
{
    public static class SeedData
    {
        public static async Task Initialize(UserRepository repository)
        {
            if (!await repository.AnyUsersAsync())
            {
                var user = new User
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                    Issue = "Issue description"
                };

                await repository.AddOrUpdateUserAsync(user);
            }
        }
    }
}
