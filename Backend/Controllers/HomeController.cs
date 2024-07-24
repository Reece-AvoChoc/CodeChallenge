using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/home")]


    public class HomeController : ControllerBase
    {
        [HttpGet("backgroundImage")]
        public IActionResult GetBackgroundImage()
        {
            var imagePath = "Assets/Images/main_background_2.jpg";
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg");
        }

        [HttpGet("windowsimage")]
        public IActionResult GetWindowsImage()
        {
            var imagePath = "Assets/Images/windows_card.png";
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg");
        }

        [HttpGet("appleimage")]
        public IActionResult GetAppleImage()
        {
            var imagePath = "Assets/Images/apple_card.png";
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg");
        }

        [HttpGet("macbook")]
        public IActionResult GetMac()
        {
            var imagePath = "Assets/Images/macbook.png";
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg");
        }

        [HttpGet("laptop")]
        public IActionResult GetLaptop()
        {
            var imagePath = "Assets/Images/windows_laptop.png";
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg");
        }
    }
}