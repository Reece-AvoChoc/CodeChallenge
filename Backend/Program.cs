using Backend.Data;
using Microsoft.EntityFrameworkCore;

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

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string is missing or empty.");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddScoped<UserRepository>();  // Change to scoped

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

using (var scope = app.Services.CreateScope())
{
    var repository = scope.ServiceProvider.GetRequiredService<UserRepository>();
    await SeedData.Initialize(repository);
}

// Endpoint for user information by email
app.MapGet("/userinfo/{email}", async (string email, UserRepository repository) =>
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


app.Run();

string HashPassword(string password)
{
    return BCrypt.Net.BCrypt.HashPassword(password);
}

bool VerifyPassword(string password, string hashedPassword)
{
    return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
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
