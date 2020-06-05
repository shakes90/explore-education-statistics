using System;
using GovUk.Education.ExploreEducationStatistics.Content.Model;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Models.Api
{
    public class CommentViewModel
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public User CreatedBy { get; set; }
        public DateTime? Updated { get; set; }

        [Obsolete("Use CreatedBy.Id instead")]
        public Guid? CreatedById => CreatedBy.Id;

        [Obsolete("Use CreatedBy.FirstName and CreatedBy.LastName instead")]
        public string CreatedByName => $"{CreatedBy.FirstName} {CreatedBy.LastName}";
    }
}