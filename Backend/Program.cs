using Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Npgsql; // Ensure you have this package

public partial class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins("http://localhost:4200") // Adjust for your Angular frontend URL
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        // JWT Configuration
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        builder.Services.Configure<JwtSettings>(jwtSettings);

        var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"] ?? throw new InvalidOperationException("JWT Secret is not configured"));

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };
        });

        builder.Services.AddAuthorization();

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("Connection string is missing or empty.");
        }

        // Register the IDbConnection with NpgsqlConnection
        builder.Services.AddScoped<IDbConnection>(sp => new NpgsqlConnection(connectionString));

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        builder.Services.AddScoped<UserRepository>();  // Ensure UserRepository is registered

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Apply pending migrations at application startup
        using (var scope = app.Services.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            dbContext.Database.Migrate();
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseCors(); // Enable CORS
        app.UseStaticFiles(); // Enable serving static files
        app.UseAuthentication(); // Add this
        app.UseAuthorization(); // Add this

        using (var scope = app.Services.CreateScope())
        {
            var repository = scope.ServiceProvider.GetRequiredService<UserRepository>();
            //SeedData.Initialize(repository).Wait();
        }

        // Endpoint for user information by email
        app.MapGet("/userinfo/{email}", [Authorize] async (string email, UserRepository repository) =>
        {
            var user = await repository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return Results.NotFound(new { message = "User not found" });
            }
            return Results.Ok(user);
        })
        .WithName("GetUserInfo")
        .WithOpenApi();

        app.MapPost("/userinfo", async (User newUserDTO, UserRepository repository) =>
        {
            // Validate required fields
            if (string.IsNullOrWhiteSpace(newUserDTO.Email))
            {
                return Results.BadRequest(new { message = "Email is required." });
            }
            if (string.IsNullOrWhiteSpace(newUserDTO.FirstName) || string.IsNullOrWhiteSpace(newUserDTO.LastName))
            {
                return Results.BadRequest(new { message = "First name and last name are required." });
            }

            // Create a new user object
            var user = new User
            {
                FirstName = newUserDTO.FirstName,
                LastName = newUserDTO.LastName,
                Email = newUserDTO.Email,
                PasswordHash = HashPassword(newUserDTO.PasswordHash), // Implement a method to hash the password
                Issue = newUserDTO.Issue
            };

            await repository.AddOrUpdateUserAsync(user);
            return Results.Ok(user);
        })
        .WithName("UpdateOrCreateUserInfo")
        .WithOpenApi();

        // Endpoint for serving specific site images
        app.MapGet("/siteimages/{img}", (string img) =>
        {
            var filePath = Path.Combine(app.Environment.WebRootPath, "images", $"{img}.jpeg");

            if (!System.IO.File.Exists(filePath))
            {
                return Results.NotFound(new { message = "Image not found" });
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return Results.File(fileBytes, "image/jpeg");
        })
        .WithName("GetSiteImages")
        .WithOpenApi();

        // Endpoint for About Us page text
        app.MapGet("/aboutus", () =>
        {
            var aboutUsInfo = new AboutUs(
                "Step into The Zen Den and embark on a journey of relaxation and self-discovery. Let us pamper you with our luxurious treatments and serene ambiance, leaving you feeling refreshed, revitalized, and ready to face the world anew.",
                "Rediscover your energy and vitality with treatments designed to replenish your mind and body, leaving you feeling renewed and ready to take on the day.",
                "Unwind in our tranquil oasis where soothing massages and calming aromatherapy create a peaceful atmosphere, helping you melt away tension and stress.",
                "Experience the transformative power of our holistic treatments and wellness rituals, designed to restore balance and enhance your overall well-being, leaving you feeling youthful and revitalized.",
                "Awaken your senses and revitalize your skin with refreshing facials and therapies that cleanse and invigorate, giving your complexion a radiant glow."
            );
            return Results.Ok(aboutUsInfo);
        })
        .WithName("GetAboutUs")
        .WithOpenApi();

        // User registration endpoint
        app.MapPost("/register", async (User newUserDTO, UserRepository repository) =>
        {
            if (string.IsNullOrWhiteSpace(newUserDTO.Email) || string.IsNullOrWhiteSpace(newUserDTO.PasswordHash))
            {
                return Results.BadRequest(new { message = "Email and password are required." });
            }

            var existingUser = await repository.GetUserByEmailAsync(newUserDTO.Email);
            if (existingUser != null)
            {
                return Results.BadRequest(new { message = "User already exists." });
            }

            var user = new User
            {
                FirstName = newUserDTO.FirstName,
                LastName = newUserDTO.LastName,
                Email = newUserDTO.Email,
                PasswordHash = HashPassword(newUserDTO.PasswordHash),
                Issue = newUserDTO.Issue
            };

            await repository.AddOrUpdateUserAsync(user);
            return Results.Ok(new { message = "User registered successfully." });
        })
        .WithName("RegisterUser")
        .WithOpenApi();

        // User login endpoint
        app.MapPost("/login", async (LoginDTO loginDTO, UserRepository repository, IConfiguration config) =>
        {
            var user = await repository.GetUserByEmailAsync(loginDTO.Email);
            if (user == null || !VerifyPassword(loginDTO.Password, user.PasswordHash))
            {
                return Results.Unauthorized();
            }

            var token = GenerateJwtToken(user, config);
            return Results.Ok(new { token });
        })
        .WithName("LoginUser")
        .WithOpenApi();

        // Modify user endpoint
        app.MapPut("/userinfo/{email}", [Authorize] async (string email, User updatedUserDTO, UserRepository repository) =>
        {
            var user = await repository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return Results.NotFound(new { message = "User not found" });
            }

            user.FirstName = updatedUserDTO.FirstName;
            user.LastName = updatedUserDTO.LastName;
            user.Email = updatedUserDTO.Email;
            if (!string.IsNullOrWhiteSpace(updatedUserDTO.PasswordHash))
            {
                user.PasswordHash = HashPassword(updatedUserDTO.PasswordHash);
            }
            user.Issue = updatedUserDTO.Issue;

            await repository.AddOrUpdateUserAsync(user);
            return Results.Ok(new { message = "User updated successfully." });
        })
        .WithName("ModifyUserInfo")
        .WithOpenApi();

        // Delete user endpoint
        app.MapDelete("/userinfo/{email}", [Authorize] async (string email, UserRepository repository) =>
        {
            var user = await repository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return Results.NotFound(new { message = "User not found" });
            }

            await repository.DeleteUserAsync(email);
            return Results.Ok(new { message = "User deleted successfully." });
        })
        .WithName("DeleteUserInfo")
        .WithOpenApi();

        app.Run();
    }

    static string GenerateJwtToken(User user, IConfiguration config)
    {
        var jwtSettings = config.GetSection("JwtSettings");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["ExpiryMinutes"])),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    static bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}

public class AboutUs
{
    public string Subtitle { get; set; }
    public string Recharge { get; set; }
    public string Relax { get; set; }
    public string Rejuvenate { get; set; }
    public string Refresh { get; set; }

    public AboutUs(string subtitle, string recharge, string relax, string rejuvenate, string refresh)
    {
        Subtitle = subtitle;
        Recharge = recharge;
        Relax = relax;
        Rejuvenate = rejuvenate;
        Refresh = refresh;
    }
}

public class LoginDTO
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class JwtSettings
{
    public string? Secret { get; set; }
    public string? Issuer { get; set; }
    public string? Audience { get; set; }
    public int ExpiryMinutes { get; set; }
}


