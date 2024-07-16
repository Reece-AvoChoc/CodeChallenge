using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
// using Backend.Models.DTO;
using Backend.Models.Domain;

namespace Backend.Controllers
{

    [Route("api/about")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            var about = new About{
                Id = 1,
                Text = @"SPAR International licences independently owned and operated retailers and wholesalers who work together in partnership under the SPAR Brand to provide a high quality, value for money shopping experience for the communities we serve.
SPAR International’s mission is to ensure that the brand SPAR remains the world’s leading voluntary food retail chain and that we continue to grow our brand, our presence and our partners by working together to enhance the competitiveness, productivity and profitability of our retail and wholesale partners worldwide.
The country organisations licensed to operate the SPAR brand form the world’s leading voluntary food retail chain. The business started with one Dutch store in 1932 and now comprises more than 13,900 stores in over 48 countries on four continents. The development of the SPAR brand has been underpinned by a set of values that have guided the organisation since its establishment over 90 years ago. At the heart of these core values is the commitment of licensed SPAR independent entrepreneurs to collaborate in all areas of wholesale and retail to ensure we serve our local communities with passion while being authentic in all we do.",
            };
        
            return await Task.FromResult(Ok(about));
        }
    }

}