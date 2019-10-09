using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Common.Extensions;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta.TableBuilder;

namespace GovUk.Education.ExploreEducationStatistics.Data.Services
{
    public class TableBuilderSubjectMetaService : AbstractTableBuilderSubjectMetaService,
        ITableBuilderSubjectMetaService
    {
        private readonly IFilterService _filterService;
        private readonly IFilterItemService _filterItemService;
        private readonly IIndicatorGroupService _indicatorGroupService;
        private readonly ILocationService _locationService;
        private readonly IMapper _mapper;
        private readonly IObservationService _observationService;
        private readonly ISubjectService _subjectService;
        private readonly ITimePeriodService _timePeriodService;

        public TableBuilderSubjectMetaService(IFilterService filterService,
            IFilterItemService filterItemService,
            IIndicatorGroupService indicatorGroupService,
            ILocationService locationService,
            IMapper mapper,
            IObservationService observationService,
            ISubjectService subjectService,
            ITimePeriodService timePeriodService) : base(filterItemService)
        {
            _filterService = filterService;
            _filterItemService = filterItemService;
            _indicatorGroupService = indicatorGroupService;
            _locationService = locationService;
            _mapper = mapper;
            _observationService = observationService;
            _subjectService = subjectService;
            _timePeriodService = timePeriodService;
        }

        public TableBuilderSubjectMetaViewModel GetSubjectMeta(long subjectId)
        {
            var subject = _subjectService.Find(subjectId);
            if (subject == null)
            {
                throw new ArgumentException("Subject does not exist", nameof(subjectId));
            }

            return new TableBuilderSubjectMetaViewModel
            {
                Filters = GetFilters(subject.Id),
                Indicators = GetIndicators(subject.Id),
                Locations = GetObservationalUnits(subject.Id),
                TimePeriod = GetTimePeriods(subject.Id)
            };
        }

        public TableBuilderSubjectMetaViewModel GetSubjectMeta(SubjectMetaQueryContext query)
        {
            var observations = _observationService.FindObservations(query).AsQueryable();
            var subject = _subjectService.Find(query.SubjectId);
            if (subject == null)
            {
                throw new ArgumentException("Subject does not exist", nameof(query.SubjectId));
            }

            return new TableBuilderSubjectMetaViewModel
            {
                Filters = GetFilters(observations),
                Indicators = GetIndicators(subject.Id),
                Locations = GetObservationalUnits(observations),
                TimePeriod = GetTimePeriods(observations)
            };
        }

        private Dictionary<string, FilterMetaViewModel> GetFilters(long subjectId)
        {
            return _filterService.GetFiltersIncludingItems(subjectId)
                .ToDictionary(
                    filter => filter.Label.PascalCase(),
                    filter => new FilterMetaViewModel
                    {
                        Hint = filter.Hint,
                        Legend = filter.Label,
                        Options = filter.FilterGroups.ToDictionary(
                            filterGroup => filterGroup.Label.PascalCase(),
                            filterGroup => BuildFilterItemsViewModel(filterGroup, filterGroup.FilterItems)),
                        TotalValue = GetTotalValue(filter)
                    });
        }

        private TableBuilderTimePeriodsMetaViewModel GetTimePeriods(long subjectId)
        {
            var timePeriods = _timePeriodService.GetTimePeriods(subjectId);
            return BuildTimePeriodsViewModels(timePeriods);
        }

        private TableBuilderTimePeriodsMetaViewModel GetTimePeriods(IQueryable<Observation> observations)
        {
            var timePeriods = _timePeriodService.GetTimePeriods(observations);
            return BuildTimePeriodsViewModels(timePeriods);
        }

        private Dictionary<string, TableBuilderObservationalUnitsMetaViewModel> GetObservationalUnits(long subjectId)
        {
            var observationalUnits = _locationService.GetObservationalUnits(subjectId);
            return BuildObservationalUnitsViewModels(observationalUnits);
        }

        private Dictionary<string, TableBuilderObservationalUnitsMetaViewModel> GetObservationalUnits(
            IQueryable<Observation> observations)
        {
            var observationalUnits = _locationService.GetObservationalUnits(observations);
            return BuildObservationalUnitsViewModels(observationalUnits);
        }

        private Dictionary<string, TableBuilderIndicatorsMetaViewModel> GetIndicators(long subjectId)
        {
            return _indicatorGroupService.GetIndicatorGroups(subjectId).ToDictionary(
                group => group.Label.PascalCase(),
                group => new TableBuilderIndicatorsMetaViewModel
                {
                    Label = group.Label,
                    Options = _mapper.Map<IEnumerable<IndicatorMetaViewModel>>(group.Indicators)
                }
            );
        }

        private Dictionary<string, TableBuilderObservationalUnitsMetaViewModel> BuildObservationalUnitsViewModels(
            Dictionary<GeographicLevel, IEnumerable<IObservationalUnit>> observationalUnits)
        {
            return observationalUnits.ToDictionary(
                pair => pair.Key.ToString().CamelCase(),
                pair => new TableBuilderObservationalUnitsMetaViewModel
                {
                    Hint = "",
                    Legend = pair.Key.GetEnumLabel(),
                    Options = _mapper.Map<IEnumerable<LabelValue>>(pair.Value)
                });
        }

        private static TableBuilderTimePeriodsMetaViewModel BuildTimePeriodsViewModels(
            IEnumerable<(int Year, TimeIdentifier TimeIdentifier)> timePeriods)
        {
            var options = timePeriods.Select(tuple => new TimePeriodMetaViewModel(tuple.Year, tuple.TimeIdentifier));
            return new TableBuilderTimePeriodsMetaViewModel
            {
                Hint = "Filter statistics by a given start and end date",
                Legend = "",
                Options = options
            };
        }

        private string GetTotalValue(Filter filter)
        {
            return _filterItemService.GetTotal(filter)?.Id.ToString() ?? string.Empty;
        }
    }
}