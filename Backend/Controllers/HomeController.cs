using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/home")]


    public class HomeController : ControllerBase
    {
        [HttpGet("backgroundImage")]
        public IActionResult GetImage()
        {
            var imagePath = "Assets/Images/main_background.jpg";
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg");
        }
    }
}