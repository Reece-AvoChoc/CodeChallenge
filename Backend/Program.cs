using Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();

        builder.WithOrigins("http://localhost:7119")
               .AllowAnyHeader()
               .AllowAnyMethod();      

        builder.WithOrigins("https://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();

        builder.WithOrigins("https://localhost:7119")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var key = Convert.FromBase64String("n45lgAcaDCrS8imzyeK95lulYepYrpAySyoR++kBj0M=");

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Dynamically create the "StrumFusion" database if it does not exist
var connectionStringWithoutDatabase = builder.Configuration.GetConnectionString("DefaultConnection").Replace("Database=StrumFusion;", "Database=;");
var databaseName = "StrumFusion";

try
{
    using (var conn = new NpgsqlConnection(connectionStringWithoutDatabase))
    {
        conn.Open();
        using (var cmd = new NpgsqlCommand($"SELECT 1 FROM pg_database WHERE datname = '{databaseName}'", conn))
        {
            var exists = cmd.ExecuteScalar() != null;
            if (!exists)
            {
                using (var createCmd = new NpgsqlCommand($"CREATE DATABASE \"{databaseName}\"", conn))
                {
                    createCmd.ExecuteNonQuery();
                }
            }
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"An error occurred while creating the database: {ex.Message}");
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    var url = app.Urls.FirstOrDefault() ?? "http://localhost:5198";
    try
    {
        System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
        {
            FileName = url + "/swagger",
            UseShellExecute = true
        });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Could not open the browser: {ex.Message}");
    }
}

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();