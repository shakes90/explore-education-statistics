using System.Collections.Generic;
using GovUk.Education.ExploreEducationStatistics.Data.Model;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels.Meta.TableBuilder
{
    public class TableBuilderResultSubjectMetaViewModel
    {
        public Dictionary<string, TableBuilderFilterMetaViewModel> Filters { get; set; }

        public IEnumerable<FootnoteViewModel> Footnotes { get; set; }

        public IEnumerable<IndicatorMetaViewModel> Indicators { get; set; }

        public IEnumerable<LabelValue> Locations { get; set; }

        public string PublicationName { get; set; }

        public string SubjectName { get; set; }

        public IEnumerable<TimePeriodMetaViewModel> TimePeriodRange { get; set; }
    }
}