using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Debug;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DebugController : ControllerBase
    {
        private readonly IFilterService _filterService;
        private readonly IIndicatorService _indicatorService;
        private readonly ILocationService _locationService;
        private readonly IMeasureService _measureService;
        private readonly IObservationService _observationService;
        private readonly IReleaseService _releaseService;
        private readonly ISchoolService _schoolService;
        private readonly ISubjectService _subjectService;

        public DebugController(IFilterService filterService,
            IIndicatorService indicatorService,
            ILocationService locationService,
            IMeasureService measureService,
            IObservationService observationService,
            IReleaseService releaseService,
            ISchoolService schoolService,
            ISubjectService subjectService)
        {
            _filterService = filterService;
            _indicatorService = indicatorService;
            _locationService = locationService;
            _measureService = measureService;
            _observationService = observationService;
            _releaseService = releaseService;
            _schoolService = schoolService;
            _subjectService = subjectService;
        }

        [HttpGet("report")]
        public async Task<ActionResult<DebugReport>> GetReport()
        {
            var filterCount = _filterService.Count();
            var indicatorCount = _indicatorService.Count();
            var locationCount = _locationService.Count();
            var measureCount = _measureService.Count();
            var observationCount = _observationService.Count();
            var releaseCount = _releaseService.Count();
            var schoolCount = _schoolService.Count();
            var subjectCount = _subjectService.Count();

            var counts = await Task.WhenAll(
                filterCount,
                indicatorCount,
                locationCount,
                measureCount,
                observationCount,
                releaseCount,
                schoolCount,
                subjectCount);

            return new DebugReport
            {
                FilterCount = counts[0],
                IndicatorCount = counts[1],
                LocationCount = counts[2],
                MeasureCount = counts[3],
                ObservationCount = counts[4],
                ReleaseCount = counts[5],
                SchoolCount = counts[6],
                SubjectCount = counts[7]
            };
        }
    }
}