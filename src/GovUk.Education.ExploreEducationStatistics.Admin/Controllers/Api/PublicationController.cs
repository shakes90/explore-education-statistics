using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Admin.Models.Api;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Api
{
    // TODO rename to Publications once the current Crud publication controller is removed
    [ApiController]
    [Authorize]
    public class PublicationController : ControllerBase
    {
        private readonly IPublicationService _publicationService;

        public PublicationController(IPublicationService publicationService)
        {
            _publicationService = publicationService;
        }

        // GET api/me/publications?topicId={guid}
        [HttpGet("/me/publications")]
        [AllowAnonymous] // TODO We will need to do Authorisation checks when we know what the permissions model is.
        public ActionResult<List<PublicationViewModel>> GetPublications(
            [Required] [FromQuery(Name = "topicId")]
            Guid topicId)
        {
            var userId = new Guid(); // TODO get the Guid from AD
            var result = _publicationService.GetByTopicAndUser(topicId, userId);

            if (result.Any())
            {
                return result;
            }

            return NoContent();
        }


        // POST api/publications
        [HttpPost("/topic/{topicId}/publications")]
        [AllowAnonymous] // TODO We will need to do Authorisation checks when we know what the permissions model is.
        public ActionResult<PublicationViewModel> CreatePublication(CreatePublicationViewModel publication, Guid topicId)
        {
            publication.TopicId = topicId;
            return _publicationService.CreatePublication(publication);
        }
    }
}