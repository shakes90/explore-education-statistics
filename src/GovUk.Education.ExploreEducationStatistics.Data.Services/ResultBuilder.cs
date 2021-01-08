using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels;

namespace GovUk.Education.ExploreEducationStatistics.Data.Services
{
    public class ResultBuilder : IResultBuilder<Observation, ObservationViewModel>
    {
        private readonly IMapper _mapper;

        public ResultBuilder(IMapper mapper)
        {
            _mapper = mapper;
        }

        public ObservationViewModel BuildResult(Observation observation, IEnumerable<Guid> indicators)
        {
            return new ObservationViewModel
            {
                Filters = observation.GetFilterItemIdList(),
                GeographicLevel = observation.GeographicLevel,
                Location = _mapper.Map<LocationViewModel>(observation.Location),
                Measures = Measures(observation, indicators),
                TimePeriod = observation.GetTimePeriod()
            };
        }

        private static Dictionary<string, string> Measures(Observation observation, IEnumerable<Guid> indicators)
        {
            var indicatorsList = indicators?.ToList();
            var measures = indicatorsList != null && indicatorsList.Any()
                ? FilterMeasures(observation.Measures, indicatorsList)
                : observation.Measures;
            return measures.Where(pair => pair.Value != null)
                .ToDictionary(pair => pair.Key.ToString(), pair => pair.Value);
        }
        
        private static Dictionary<Guid, string> FilterMeasures(
            Dictionary<Guid, string> measures,
            IEnumerable<Guid> indicators)
        {
            return (
                from kvp in measures
                where indicators.Contains(kvp.Key)
                select kvp
            ).ToDictionary(pair => pair.Key, pair => pair.Value);
        }
    }
}