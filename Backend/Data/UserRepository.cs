using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class UserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddOrUpdateUserAsync(User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser == null)
            {
                _context.Users.Add(user);
            }
            else
            {
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.PasswordHash = user.PasswordHash;
                existingUser.Issue = user.Issue;
            }

            await _context.SaveChangesAsync();
        }

        public async Task<bool> AnyUsersAsync()
        {
            return await _context.Users.AnyAsync();
        }
    }
}
