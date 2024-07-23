using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.Domain;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Backend.Data;

namespace Backend.Controllers
{
    
    [ApiController]
    [Route("api/home")]
    public class HomeController : ControllerBase
    {

        private readonly ApplicationDbContext dbContext;

        public HomeController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetHome()
        {
            return await Task.FromResult(Ok("You found the home page... YIPEEEEE!!!"));
        }

        [HttpGet]
        [Authorize]
        [Route("user-info")]
        public async Task<IActionResult> GetUserInfo([FromQuery] string email)
        {
            Console.WriteLine();
            Console.WriteLine("Getting User Info based on email:");
            Console.WriteLine(email);
            Console.WriteLine();

            var usr = dbContext.Users.FirstOrDefault(u => u.Email == email);

            if(usr == null)
            {
                return NotFound($"User with email '{email}' not found.");
            }

            return await Task.FromResult(Ok(usr));
        }

        [HttpPost]
        [Authorize]
        [Route("get-in-touch")]
        public async Task<IActionResult> GetInTouch([FromBody] GetInTouch getInTouch)
        {
            Console.WriteLine();
            Console.WriteLine("Getting In Touch:");
            Console.WriteLine(getInTouch.Name);
            Console.WriteLine(getInTouch.Surname);
            Console.WriteLine(getInTouch.Email);
            Console.WriteLine(getInTouch.Request);
            Console.WriteLine();

            return await Task.FromResult(Ok("Thank you for getting in touch!"));
        }

        [HttpGet]
        [Authorize]
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
