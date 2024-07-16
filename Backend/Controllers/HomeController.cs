using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
// using Backend.Models.DTO;
using Backend.Models.Domain;

namespace Backend.Controllers
{
    [Route("api/home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetHome()
        {
            return await Task.FromResult(Ok("You found the home page... YIPEEEEE!!!"));
        }

        [HttpGet]
        [Route("user-info")]
        public async Task<IActionResult> GetUserInfo([FromQuery] int id)
        {
            Console.WriteLine();
            Console.WriteLine("Getting User Info based on id:");
            Console.WriteLine(id);
            Console.WriteLine();

            var usr = new User
            {
                Id = id,
                FirstName = "John",
                LastName = "Doe",
                Email = "johndoe@gmail.com",
                Password = "password",
            };

            return await Task.FromResult(Ok(usr));
        }

        [HttpGet]
        [Route("image")]
        public IActionResult GetImage([FromQuery] string name)
        {
            Console.WriteLine();
            Console.WriteLine("Getting Image based on name:");
            Console.WriteLine(name);
            Console.WriteLine();

            // Construct the file path
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Assets", "Images", $"{name}.png");

            // Check if the file exists
            if (System.IO.File.Exists(filePath))
            {
                var img = new Image
                {
                    Id = 1,
                    FileName = name,
                    FileExtension = ".png",
                    Title = $"{name} Image",
                    URL = filePath,
                };

                return Ok(img);
            }
            else
            {
                return NotFound($"Image with name '{name}' not found.");
            }
            
        }

    }
}