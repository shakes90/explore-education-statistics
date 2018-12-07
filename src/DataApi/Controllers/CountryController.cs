using System.Collections.Generic;
using DataApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DataApi.Controllers
{
    [Route("data/{releaseId}/geo-levels/country")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> List(int releaseId,
            [FromQuery(Name = "schoolType")] SchoolType schoolType,
            [FromQuery(Name = "attributes")] List<string> attributes)
        {
            return "value";
        }

        [HttpGet("{countryId}")]
        public ActionResult<string> Get(int releaseId, int countryId,
            [FromQuery(Name = "schoolType")] SchoolType schoolType,
            [FromQuery(Name = "attributes")] List<string> attributes)
        {
            return "value";
        }

        [HttpGet("{countryId}/regions")]
        public ActionResult<string> GetRegions(int releaseId, int countryId,
            [FromQuery(Name = "schoolType")] SchoolType schoolType,
            [FromQuery(Name = "attributes")] List<string> attributes)
        {
            return "value";
        }

        [HttpGet("{countryId}/local-authorities")]
        public ActionResult<string> GetLocalAuthorities(int releaseId, int countryId,
            [FromQuery(Name = "schoolType")] SchoolType schoolType,
            [FromQuery(Name = "attributes")] List<string> attributes)
        {
            return "value";
        }

        [HttpGet("{countryId}/schools")]
        public ActionResult<string> getSchools(int releaseId, int countryId,
            [FromQuery(Name = "schoolType")] SchoolType schoolType,
            [FromQuery(Name = "attributes")] List<string> attributes)
        {
            return "value";
        }
    }
}