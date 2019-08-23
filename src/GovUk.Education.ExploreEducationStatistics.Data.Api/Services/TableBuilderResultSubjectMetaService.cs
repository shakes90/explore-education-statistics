using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels.Meta;
using GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels.Meta.TableBuilder;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta;
using Footnote = GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels.Footnote;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Services
{
    public class TableBuilderResultSubjectMetaService : AbstractTableBuilderSubjectMetaService,
        ITableBuilderResultSubjectMetaService
    {
        private readonly IFootnoteService _footnoteService;
        private readonly IIndicatorService _indicatorService;
        private readonly ILocationService _locationService;
        private readonly IMapper _mapper;
        private readonly ISubjectService _subjectService;
        private readonly ITimePeriodService _timePeriodService;

        public TableBuilderResultSubjectMetaService(IFilterItemService filterItemService,
            IFootnoteService footnoteService,
            IIndicatorService indicatorService,
            ILocationService locationService,
            IMapper mapper,
            ISubjectService subjectService,
            ITimePeriodService timePeriodService) : base(filterItemService)
        {
            _footnoteService = footnoteService;
            _indicatorService = indicatorService;
            _locationService = locationService;
            _mapper = mapper;
            _subjectService = subjectService;
            _timePeriodService = timePeriodService;
        }

        public TableBuilderResultSubjectMetaViewModel GetSubjectMeta(SubjectMetaQueryContext query,
            IQueryable<Observation> observations)
        {
            var subject = _subjectService.Find(query.SubjectId,
                new List<Expression<Func<Subject, object>>> {s => s.Release.Publication});
            if (subject == null)
            {
                throw new ArgumentException("Subject does not exist", nameof(query.SubjectId));
            }

            return new TableBuilderResultSubjectMetaViewModel
            {
                Filters = GetFilters(observations),
                Footnotes = GetFootnotes(observations, query),
                Indicators = GetIndicators(query),
                Locations = GetObservationalUnits(observations),
                PublicationName = subject.Release.Publication.Title,
                SubjectName = subject.Name,
                TimePeriodRange = GetTimePeriodRange(observations)
            };
        }

        private IEnumerable<ObservationalUnitMetaViewModel> GetObservationalUnits(IQueryable<Observation> observations)
        {
            var observationalUnits = _locationService.GetObservationalUnits(observations);
            return observationalUnits.SelectMany(pair => pair.Value.Select(observationalUnit =>
                new ObservationalUnitMetaViewModel
                {
                    Label = observationalUnit.Name,
                    Level = pair.Key.ToString().CamelCase(),
                    Value = observationalUnit.Code
                }));
        }

        private IEnumerable<IndicatorMetaViewModel> GetIndicators(SubjectMetaQueryContext query)
        {
            return _mapper.Map<IEnumerable<IndicatorMetaViewModel>>(
                _indicatorService.GetIndicators(query.SubjectId, query.Indicators));
        }

        private IEnumerable<Footnote> GetFootnotes(IQueryable<Observation> observations,
            SubjectMetaQueryContext queryContext)
        {
            return _footnoteService.GetFootnotes(queryContext.SubjectId, observations, queryContext.Indicators)
                .Select(footnote => new Footnote
                {
                    Id = footnote.Id,
                    Label = footnote.Content
                });
        }

        private IEnumerable<TimePeriodMetaViewModel> GetTimePeriodRange(IQueryable<Observation> observations)
        {
            return _timePeriodService.GetTimePeriodRange(observations).Select(tuple =>
                new TimePeriodMetaViewModel(tuple.Year, tuple.TimeIdentifier));
        }
    }
}