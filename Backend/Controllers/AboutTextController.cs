using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class AboutTextController : ControllerBase
    {
        [HttpGet("GetOverviewHeading")]
        public IActionResult GetOverviewHeading()
        {
            var heading = "Company Overview";
            return Ok(heading);
        }

        [HttpGet("GetOverviewBody")]
        public IActionResult GetOverviewBody()
        {
            var body = "Welcome to Luxe Living Estates, where sophistication meets unparalleled luxury in the realm of high-end apartment living. Nestled in the heart of bustling metropolitan hubs, we specialize in curating exclusive residential experiences that redefine urban living. Our portfolio showcases meticulously designed apartments that harmonize opulence with functionality, catering to the discerning tastes of our esteemed clientele. With a commitment to excellence and a passion for crafting exquisite living spaces, Luxe Living Estates represents the pinnacle of luxury real estate in every aspect.";
            return Ok(body);
        }

        [HttpGet("GetMissionHeading")]
        public IActionResult GetMissionHeading()
        {
            var heading = "Mission and Values";
            return Ok(heading);
        }

        [HttpGet("GetMissionBody")]
        public IActionResult GetMissionBody()
        {
            var body = "At Luxe Living Estates, our mission is to transcend the ordinary and set new standards in luxury living. We are dedicated to creating environments that exude elegance, comfort, and prestige, ensuring our residents experience nothing short of extraordinary. Our core values of integrity, innovation, and impeccable service drive every decision we make, from architectural design to personalized resident services. By prioritizing quality craftsmanship and attention to detail, we aim to exceed expectations and deliver unparalleled living experiences that resonate with our clients' desires for sophistication and exclusivity.";
            return Ok(body);
        }

        [HttpGet("GetTeamHeading")]
        public IActionResult GetTeamHeading()
        {
            var heading = "Our Team";
            return Ok(heading);
        }

        [HttpGet("GetTeamBody")]
        public IActionResult GetTeamBody()
        {
            var body = "Behind Luxe Living Estates stands a team of passionate professionals united by a shared vision of redefining urban living through exceptional real estate. Our team comprises seasoned experts in architecture, interior design, property management, and customer relations, each bringing a wealth of experience and expertise to every project. With a relentless pursuit of excellence and a deep understanding of luxury market trends, our team collaborates seamlessly to ensure every apartment reflects the epitome of refined living. Together, we are dedicated to fostering enduring relationships with our residents and creating communities that embody the essence of modern luxury living.";
            return Ok(body);
        }
    }
}