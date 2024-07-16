using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class HomeTextController : ControllerBase
    {
        [HttpGet("GetHeading")]
        public IActionResult GetHeading()
        {
            var heading = "WE DESIGN YOUR SPACE";
            return Ok(heading);
        }

        [HttpGet("GetSubHeading")]
        public IActionResult GetSubHeading()
        {
            var subHeading = "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor";
            return Ok(subHeading);
        }

        [HttpGet("GetBackgroundImage")]
        public IActionResult GetImage()
        {
            var imagePath = "assets/archi.jpg";
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg");
        }

    }
}