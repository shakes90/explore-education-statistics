using System;
using System.Collections.Generic;

namespace GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta
{
    public class TopicMetaViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public IEnumerable<PublicationMetaViewModel> Publications { get; set; }
    }
}