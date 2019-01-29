using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly SeedService _seedService;

        public SeedController(SeedService seedService)
        {
            _seedService = seedService;
        }

        [HttpGet]
        public async Task<string> Seed()
        {
            return "Inserted " + await _seedService.Seed() + " rows";
        }

        [HttpDelete("DropAllCollections")]
        public void DropAllCollections()
        {
            _seedService.DropAllCollections();
        }
    }
}