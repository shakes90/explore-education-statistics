using System;

namespace GovUk.Education.ExploreEducationStatistics.Data.Processor.Model
{
    public class Topic
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public Theme Theme { get; set; }

        public override string ToString()
        {
            return $"{nameof(Id)}: {Id}, {nameof(Title)}: {Title}, {nameof(Slug)}: {Slug}, {nameof(Theme)}: {Theme}";
        }
    }
}