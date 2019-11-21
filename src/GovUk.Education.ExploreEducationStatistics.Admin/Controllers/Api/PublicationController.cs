using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.Models.Api;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Admin.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Api
{
    // TODO rename to Publications once the current Crud publication controller is removed
    [Authorize]
    [ApiController]
    public class PublicationController : ControllerBase
    {
        private readonly IPublicationService _publicationService;

        public PublicationController(IPublicationService publicationService)
        {
            _publicationService = publicationService;
        }

        // GET api/me/publications?topicId={guid}
        [HttpGet("api/me/publications")]
        public async Task<ActionResult<List<PublicationViewModel>>> GetPublicationsAsync(
            [Required] [FromQuery(Name = "topicId")]
            Guid topicId)
        {
            var userId = Guid.NewGuid(); // TODO get the Guid from AD
            var result = await _publicationService.GetByTopicAndUserAsync(topicId, userId);

            if (result.Any())
            {
                return result;
            }

            return NoContent();
        }

        // GET api/publications/{publicationId}
        [HttpGet("api/publications/{publicationId}")]
        public async Task<ActionResult<PublicationViewModel>> GetPublicationByIdAsync(
            [Required] Guid publicationId)
        {
            // var userId = new Guid(); // TODO get the Guid from AD
            var result = await _publicationService.GetViewModelAsync(publicationId);

            if (result != null)
            {
                return result;
            }

            return NoContent();
        }

        // POST api/topic/{topicId}/publications
        [HttpPost("api/topic/{topicId}/publications")]
        public async Task<ActionResult<PublicationViewModel>> CreatePublicationAsync(
            CreatePublicationViewModel publication, Guid topicId)
        {
            publication.TopicId = topicId;
            var result = await _publicationService.CreatePublicationAsync(publication);
            if (result.IsLeft)
            {
                ValidationUtils.AddErrors(ModelState, result.Left);
                return ValidationProblem(new ValidationProblemDetails(ModelState));
            }

            return result.Right;
        }
    }
}