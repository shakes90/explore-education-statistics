using System;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Common.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Api.Statistics
{
    [Route("api/data/meta")]
    [ApiController]
    [Authorize]
    public class TableBuilderMetaController : ControllerBase
    {
        private readonly IReleaseMetaService _releaseMetaService;
        private readonly ISubjectMetaService _subjectMetaService;

        public TableBuilderMetaController(IReleaseMetaService releaseMetaService,
            ISubjectMetaService subjectMetaService)
        {
            _releaseMetaService = releaseMetaService;
            _subjectMetaService = subjectMetaService;
        }

        [HttpGet("subject/{subjectId}")]
        public Task<ActionResult<SubjectMetaViewModel>> GetSubjectMetaAsync(Guid subjectId)
        {
            return _subjectMetaService.GetSubjectMetaRestricted(subjectId)
                .HandleFailuresOrOk();
        }

        [HttpPost("subject")]
        public Task<ActionResult<SubjectMetaViewModel>> GetSubjectMetaAsync(
            [FromBody] SubjectMetaQueryContext query)
        {
            return _subjectMetaService.GetSubjectMetaRestricted(query)
                .HandleFailuresOrOk();
        }

        [HttpGet("release/{releaseId}")]
        public async Task<ActionResult<SubjectsMetaViewModel>> GetSubjectsForRelease(Guid releaseId)
        {
            return await _releaseMetaService.GetSubjects(releaseId)
                .HandleFailuresOrOk();
        }
    }
}