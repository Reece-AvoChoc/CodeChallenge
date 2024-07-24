using System.Data;
using Dapper;

namespace Backend.Data
{
    public class UserRepository
    {
        private readonly IDbConnection _dbConnection;

        public UserRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var query = "SELECT * FROM Users WHERE Email = @Email";
            return await _dbConnection.QueryFirstOrDefaultAsync<User>(query, new { Email = email });
        }

        public async Task AddOrUpdateUserAsync(User user)
        {
            var query = @"
                INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Issue)
                VALUES (@FirstName, @LastName, @Email, @PasswordHash, @Issue)
                ON CONFLICT (Email) 
                DO UPDATE SET 
                    FirstName = EXCLUDED.FirstName,
                    LastName = EXCLUDED.LastName,
                    PasswordHash = EXCLUDED.PasswordHash,
                    Issue = EXCLUDED.Issue;";
            await _dbConnection.ExecuteAsync(query, user);
        }

        public async Task<bool> DeleteUserAsync(string email)
        {
            var query = "DELETE FROM Users WHERE Email = @Email";
            var result = await _dbConnection.ExecuteAsync(query, new { Email = email });
            return result > 0;
        }
    }
}
