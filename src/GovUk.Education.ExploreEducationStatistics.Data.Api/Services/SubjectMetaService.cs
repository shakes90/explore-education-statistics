using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels.Meta;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Newtonsoft.Json;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Services
{
    public class SubjectMetaService : ISubjectMetaService
    {
        private readonly IBoundaryLevelService _boundaryLevelService;
        private readonly IFilterItemService _filterItemService;
        private readonly IGeoJsonService _geoJsonService;
        private readonly IIndicatorService _indicatorService;
        private readonly ILocationService _locationService;
        private readonly ITimePeriodService _timePeriodService;
        private readonly IMapper _mapper;

        public SubjectMetaService(IBoundaryLevelService boundaryLevelService,
            IFilterItemService filterItemService,
            IGeoJsonService geoJsonService,
            IIndicatorService indicatorService,
            ILocationService locationService,
            IMapper mapper,
            ITimePeriodService timePeriodService)
        {
            _boundaryLevelService = boundaryLevelService;
            _filterItemService = filterItemService;
            _geoJsonService = geoJsonService;
            _indicatorService = indicatorService;
            _locationService = locationService;
            _mapper = mapper;
            _timePeriodService = timePeriodService;
        }

        public SubjectMetaViewModel GetSubjectMeta(
            SubjectMetaQueryContext query,
            IQueryable<Observation> observations)
        {
            return new SubjectMetaViewModel
            {
                Filters = GetFilters(observations),
                Indicators = GetIndicators(query),
                Locations = GetObservationalUnits(observations, query.BoundaryLevel),
                TimePeriods = GetTimePeriods(observations)
            };
        }

        private Dictionary<string, LabelValueViewModel> GetFilters(IQueryable<Observation> observations)
        {
            return _filterItemService.GetFilterItems(observations).ToDictionary(
                item => item.Id.ToString(),
                item => new LabelValueViewModel
                {
                    Label = item.Label,
                    Value = item.Id.ToString()
                });
        }

        private Dictionary<string, IndicatorMetaViewModel> GetIndicators(SubjectMetaQueryContext query)
        {
            var indicatorList = _indicatorService.GetIndicators(query.SubjectId, query.Indicators);
            return indicatorList.ToDictionary(
                indicator => indicator.Id.ToString(),
                indicator => _mapper.Map<IndicatorMetaViewModel>(indicator));
        }

        private Dictionary<string, ObservationalUnitGeoJsonMetaViewModel> GetObservationalUnits(
            IQueryable<Observation> observations, long? boundaryLevelId = null)
        {
            var observationalUnits = _locationService.GetObservationalUnits(observations);

            var observationalUnitMetaViewModels = observationalUnits.SelectMany(pair =>
                pair.Value.Select(observationalUnit => new ObservationalUnitGeoJsonMetaViewModel
                {
                    GeoJson = GetGeoJsonForObservationalUnit(boundaryLevelId ??
                                                             GetBoundaryLevel(pair.Key).Id, observationalUnit),
                    Label = observationalUnit.Name,
                    Value = observationalUnit.Code
                }));

            return observationalUnitMetaViewModels.ToDictionary(
                model => model.Value,
                model => model);
        }

        private BoundaryLevel GetBoundaryLevel(GeographicLevel geographicLevel)
        {
            return _boundaryLevelService.FindLatestByGeographicLevel(geographicLevel);
        }

        private Dictionary<string, TimePeriodMetaViewModel> GetTimePeriods(IQueryable<Observation> observations)
        {
            return _timePeriodService.GetTimePeriods(observations).ToDictionary(
                tuple => tuple.GetTimePeriod(),
                tuple => new TimePeriodMetaViewModel(tuple.Year, tuple.TimeIdentifier));
        }

        private dynamic GetGeoJsonForObservationalUnit(long boundaryLevelId, IObservationalUnit observationalUnit)
        {
            var geoJson = _geoJsonService.Find(boundaryLevelId, observationalUnit.Code);
            return geoJson != null ? JsonConvert.DeserializeObject(geoJson.Value) : null;
        }
    }
}