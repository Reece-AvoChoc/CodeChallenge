using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;



[Route("api/user")]
[ApiController]
public class AuthController : ControllerBase
{

    private readonly ApplicationDbContext dbContext;

    public AuthController(ApplicationDbContext context)
    {
        dbContext = context;
    }

    [HttpGet("all")]
    public IActionResult getAllUsers()
    {
        return Ok(dbContext.Users);
    }

    [HttpPut("sign-up")]
    public IActionResult signUp([FromBody] User user)
    {
        Console.WriteLine();
        Console.WriteLine("Signing up...");
        Console.WriteLine(user.FirstName);
        Console.WriteLine(user.LastName);
        Console.WriteLine(user.Email);
        Console.WriteLine(user.Password);
        Console.WriteLine();


        var existingUser = dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
        if (existingUser != null)
        {
            return Conflict();
        }

        //if any attribute is null, return bad request
        if (user.FirstName == null || user.LastName == null || user.Email == null || user.Password == null)
        {
            return BadRequest();
        }

        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

        dbContext.Users.Add(user);
        dbContext.SaveChanges();

        return Ok(user);
    }
    

    [HttpPost("login")]
    public IActionResult login([FromBody] LoginUser credentials)
    {

        Console.WriteLine();
        Console.WriteLine("Logging in...");
        Console.WriteLine(credentials.Email);
        Console.WriteLine(credentials.Password);
        Console.WriteLine();

        var existingUser = dbContext.Users.FirstOrDefault(u => u.Email == credentials.Email);

        if (existingUser == null)
        {
            return Unauthorized();
        }

        if (!BCrypt.Net.BCrypt.Verify(credentials.Password, existingUser.Password))
        {
            return Unauthorized();
        }

        var tokenHandler = new JwtSecurityTokenHandler();

        var key = Convert.FromBase64String("n45lgAcaDCrS8imzyeK95lulYepYrpAySyoR++kBj0M=");

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[] 
            {
                new Claim(ClaimTypes.Name, credentials.Email)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { Token = tokenString, FirstName = existingUser.FirstName, LastName = existingUser.LastName});
    }

    [HttpDelete("delete")]
    public IActionResult deleteUser([FromQuery] string email)
    {
        Console.WriteLine();
        Console.WriteLine("Deleting user...");
        Console.WriteLine(email);
        Console.WriteLine();

        var user = dbContext.Users.FirstOrDefault(u => u.Email == email);

        if (user == null)
        {
            return NotFound();
        }

        dbContext.Users.Remove(user);
        dbContext.SaveChanges();

        return Ok();
    }

    [HttpPut("update")]
    public IActionResult updateUser([FromBody] User user)
    {
        Console.WriteLine();
        Console.WriteLine("Updating user...");
        Console.WriteLine(user.Email);
        Console.WriteLine();

        var existingUser = dbContext.Users.FirstOrDefault(u => u.Email == user.Email);

        if (existingUser == null)
        {
            return NotFound();
        }

        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;

        if (!string.IsNullOrEmpty(user.Password))
        {
            if (!BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password))
            {
                existingUser.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            }
        }

        dbContext.SaveChanges();

        return Ok(existingUser);
    }

    [HttpPost("logout")]
    public IActionResult logout([FromQuery] string email)
    {

        var usr = dbContext.Users.FirstOrDefault(u => u.Email == email);

        if (usr == null)
        {
            return NotFound();
        }

        Console.WriteLine();
        Console.WriteLine("Logging out...");
        Console.WriteLine($"{usr.Email}: {usr.FirstName} {usr.LastName}");
        
        return Ok($"{usr.FirstName} {usr.LastName} has been logged out.");
    }
}