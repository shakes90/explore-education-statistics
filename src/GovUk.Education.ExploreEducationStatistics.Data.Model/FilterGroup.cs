using System.Collections.Generic;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model
{
    public class FilterGroup
    {
        public long Id { get; set; }
        public string Label { get; set; }
        public Subject Subject { get; set; }
        public long SubjectId { get; set; }
        public IEnumerable<Filter> Filters { get; set; }
    }
}