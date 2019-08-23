using System.Collections.Generic;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta.TableBuilder;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels.Meta.TableBuilder
{
    public class TableBuilderResultSubjectMetaViewModel
    {
        public Dictionary<string, TableBuilderFilterMetaViewModel> Filters { get; set; }

        public IEnumerable<Footnote> Footnotes { get; set; }

        public IEnumerable<IndicatorMetaViewModel> Indicators { get; set; }

        public IEnumerable<ObservationalUnitMetaViewModel> Locations { get; set; }

        public string PublicationName { get; set; }

        public string SubjectName { get; set; }

        public IEnumerable<TimePeriodMetaViewModel> TimePeriodRange { get; set; }
    }
}