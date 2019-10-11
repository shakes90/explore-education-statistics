using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace GovUk.Education.ExploreEducationStatistics.Data.Services
{
    public class SubjectMetaService : AbstractTableBuilderSubjectMetaService, ISubjectMetaService
    {
        private readonly IBoundaryLevelService _boundaryLevelService;

        private readonly IGeoJsonService _geoJsonService;
        private readonly IIndicatorService _indicatorService;
        private readonly ILocationService _locationService;
        private readonly ITimePeriodService _timePeriodService;
        private readonly ISubjectService _subjectService;
        private readonly IFootnoteService _footnoteService;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public SubjectMetaService(IBoundaryLevelService boundaryLevelService,
            IFilterItemService filterItemService,
            IGeoJsonService geoJsonService,
            IIndicatorService indicatorService,
            ILocationService locationService,
            IMapper mapper,
            ITimePeriodService timePeriodService,
            ISubjectService subjectService,
            IFootnoteService footnoteService,
            ILogger<SubjectMetaService> logger
        ) : base(filterItemService)
        {
            _boundaryLevelService = boundaryLevelService;
            _geoJsonService = geoJsonService;
            _indicatorService = indicatorService;
            _locationService = locationService;
            _mapper = mapper;
            _timePeriodService = timePeriodService;
            _subjectService = subjectService;
            _footnoteService = footnoteService;
            _logger = logger;
        }

        public SubjectMetaViewModel GetSubjectMeta(
            SubjectMetaQueryContext query,
            IQueryable<Observation> observations)
        {
            var subject = _subjectService.Find(query.SubjectId,
                new List<Expression<Func<Subject, object>>> {s => s.Release.Publication});
            if (subject == null)
            {
                throw new ArgumentException("Subject does not exist", nameof(query.SubjectId));
            }

            var stopwatch = Stopwatch.StartNew();
            stopwatch.Start();

            var observationalUnits = GetObservationalUnits(observations);

            _logger.LogTrace("Got Observational Units in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            var filters = GetFilters(observations);

            _logger.LogTrace("Got Filters in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            var indicators = GetIndicators(query);

            _logger.LogTrace("Got Indicators in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            var locations = GetGeoJsonObservationalUnits(observationalUnits, query.BoundaryLevel);

            _logger.LogTrace("Got GeoJson in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            var boundaryLevels = GetBoundaryLevelOptions(query.BoundaryLevel, observationalUnits.Keys);

            _logger.LogTrace("Got Boundary Level Options in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            var timePeriods = GetTimePeriods(observations);

            _logger.LogTrace("Got Time Periods in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            var footnotes = GetFootnotes(observations, query);

            _logger.LogTrace("Got Footnotes in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            return new SubjectMetaViewModel
            {
                Filters = filters,
                Indicators = indicators,
                Locations = locations,
                BoundaryLevels = boundaryLevels,
                PublicationName = subject.Release.Publication.Title,
                SubjectName = subject.Name,
                TimePeriods = timePeriods,
                Footnotes = footnotes
            };
        }

        private Dictionary<string, IndicatorMetaViewModel> GetIndicators(SubjectMetaQueryContext query)
        {
            var indicatorList = _indicatorService.GetIndicators(query.SubjectId, query.Indicators);
            return indicatorList.ToDictionary(
                indicator => indicator.Id.ToString(),
                indicator => _mapper.Map<IndicatorMetaViewModel>(indicator));
        }

        private Dictionary<GeographicLevel, IEnumerable<IObservationalUnit>> GetObservationalUnits(
            IQueryable<Observation> observations)
        {
            return _locationService.GetObservationalUnits(observations);
        }

        private Dictionary<string, ObservationalUnitGeoJsonMeta> GetGeoJsonObservationalUnits(
            Dictionary<GeographicLevel, IEnumerable<IObservationalUnit>> observationalUnits,
            long? boundaryLevelId = null)
        {
            var observationalUnitMetaViewModels = observationalUnits.SelectMany(pair =>
                GetGeoJsonForObservationalUnits(boundaryLevelId ?? GetBoundaryLevel(pair.Key).Id,
                    pair.Key,
                    pair.Value.ToList()));

            return observationalUnitMetaViewModels.ToDictionary(
                model => model.Value,
                model => model);
        }

        private BoundaryLevel GetBoundaryLevel(GeographicLevel geographicLevel)
        {
            return _boundaryLevelService.FindLatestByGeographicLevel(geographicLevel);
        }

        private IEnumerable<IdLabel> GetBoundaryLevelOptions(long? boundaryLevelId,
            IEnumerable<GeographicLevel> geographicLevels)
        {
            var boundaryLevels = boundaryLevelId.HasValue
                ? _boundaryLevelService.FindRelatedByBoundaryLevel(boundaryLevelId.Value)
                : _boundaryLevelService.FindByGeographicLevels(geographicLevels);
            return boundaryLevels.Select(level => _mapper.Map<IdLabel>(level));
        }

        private Dictionary<string, TimePeriodMetaViewModel> GetTimePeriods(IQueryable<Observation> observations)
        {
            return _timePeriodService.GetTimePeriods(observations).ToDictionary(
                tuple => tuple.GetTimePeriod(),
                tuple => new TimePeriodMetaViewModel(tuple.Year, tuple.TimeIdentifier));
        }

        private IEnumerable<ObservationalUnitGeoJsonMeta> GetGeoJsonForObservationalUnits(long boundaryLevelId,
            GeographicLevel geographicLevel,
            ICollection<IObservationalUnit> observationalUnits)
        {
            var codes = observationalUnits.Select(unit => unit.Code);
            var geoJsonByCode = _geoJsonService.Find(boundaryLevelId, codes).ToDictionary(g => g.Code);
            return observationalUnits.Select(observationalUnit =>
            {
                var geoJson = DeserializeGeoJson(geoJsonByCode.GetValueOrDefault(observationalUnit.Code));
                return new ObservationalUnitGeoJsonMeta
                {
                    GeoJson = geoJson,
                    Label = observationalUnit.Name,
                    Level = geographicLevel,
                    Value = observationalUnit.Code
                };
            });
        }

        private IEnumerable<FootnoteViewModel> GetFootnotes(IQueryable<Observation> observations,
            SubjectMetaQueryContext queryContext)
        {
            return _footnoteService.GetFootnotes(queryContext.SubjectId, observations, queryContext.Indicators)
                .Select(footnote => new FootnoteViewModel
                {
                    Id = footnote.Id,
                    Label = footnote.Content
                });
        }

        private static dynamic DeserializeGeoJson(GeoJson geoJson)
        {
            return geoJson == null ? null : JsonConvert.DeserializeObject(geoJson.Value);
        }
    }
}