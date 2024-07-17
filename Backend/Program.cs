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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(); // Enable CORS

app.UseStaticFiles(); // Enable serving static files

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

// Existing WeatherForecast endpoint
app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

// List of user information
var users = new List<UserInfo>
{
    new UserInfo("John", "Doe", "john.doe@example.com"),
    new UserInfo("Jane", "Smith", "jane.smith@example.com"),
    new UserInfo("Mike", "Johnson", "mike.johnson@example.com")
};

// Endpoint for user information by email
app.MapGet("/userinfo/{email}", (string email) =>
{
    var user = users.FirstOrDefault(u => u.Email == email);
    if (user == null)
    {
        return Results.NotFound(new { message = "User not found" });
    }
    return Results.Ok(user);
})
.WithName("GetUserInfo")
.WithOpenApi();

// Endpoint to create or update user information
app.MapPost("/userinfo", (UserInfo newUserDTO) =>
{
    // Validate required fields
    if (string.IsNullOrWhiteSpace(newUserDTO.Email))
    {
        return Results.BadRequest(new { message = "Email is required." });
    }
    if (string.IsNullOrWhiteSpace(newUserDTO.firstName) || string.IsNullOrWhiteSpace(newUserDTO.lastName))
    {
        return Results.BadRequest(new { message = "First name and last name are required." });
    }

    // Check if user with the same email already exists
    var existingUser = users.FirstOrDefault(u => u.Email == newUserDTO.Email);
    if (existingUser != null)
    {
        // Update existing user's issue if provided
        if (!string.IsNullOrWhiteSpace(newUserDTO.Issue))
        {
            existingUser.Issue = newUserDTO.Issue;
        }
        return Results.Ok(existingUser);
    }
    else
    {
        // Create a new user if email doesn't exist
        var createdUser = new UserInfo(newUserDTO.firstName, newUserDTO.lastName, newUserDTO.Email, newUserDTO.Issue);
        users.Add(createdUser);
        return Results.Ok(createdUser);
    }
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

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

public class UserInfo
{
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string Email { get; set; }
    public string Issue { get; set; }

    public UserInfo(string firstName, string lastName, string Email, string Issue = "")
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Email = Email;
        this.Issue = Issue;
    }

    public override string ToString()
    {
        return $"UserInfo - Name: {firstName} {lastName}, Email: {Email}, Issue: {Issue}";
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
