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

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

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
    new UserInfo(1, "John Doe", "john.doe@example.com", "Developer"),
    new UserInfo(2, "Jane Smith", "jane.smith@example.com", "Designer"),
    new UserInfo(3, "Mike Johnson", "mike.johnson@example.com", "Manager")
};

app.MapGet("/userinfo/{id:int}", (int id) =>
{
    var user = users.FirstOrDefault(u => u.Id == id);
    if (user == null)
    {
        return Results.NotFound(new { message = "User not found" });
    }
    return Results.Ok(user);
})
.WithName("GetUserInfo")
.WithOpenApi();

// New endpoint for site images
app.MapGet("/siteimages/{img}", (string img) =>
{
    var filePath = Path.Combine(app.Environment.WebRootPath, "images", $"{img}.jpg");
    
    if (!System.IO.File.Exists(filePath))
    {
        return Results.NotFound(new { message = "Image not found" });
    }

    var fileBytes = System.IO.File.ReadAllBytes(filePath);
    return Results.File(fileBytes, "image/jpeg");
})
.WithName("GetSiteImages")
.WithOpenApi();

// New endpoint for About Us page text
app.MapGet("/aboutus", () =>
{
    var aboutUsText = "This is the About Us page. We are a company dedicated to providing the best services.";
    return aboutUsText;
})
.WithName("GetAboutUs")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

record UserInfo(int Id, string Name, string Email, string Role);
