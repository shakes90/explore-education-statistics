using System.Collections.Generic;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model
{
    public class Indicator
    {
        public long Id { get; set; }
        public string Label { get; set; }
        public string Name { get; set; }
        public Unit Unit { get; set; }
        public IndicatorGroup IndicatorGroup { get; set; }
        public long IndicatorGroupId { get; set; }
        public ICollection<IndicatorFootnote> Footnotes { get; set; }
    }
}