using System;
using GovUk.Education.ExploreEducationStatistics.Common.Converters;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Models.Api
{
    public class MyReleaseViewModel
    {
        public Guid Id { get; set; }
        
        [JsonConverter(typeof(StringEnumConverter))]
        public ReleaseStatus Status { get; set; }

        public bool LatestRelease { get; set; }
        
        public string ReleaseName { get; set; }

        public Guid PublicationId { get; set; }

        public string PublicationTitle { get; set; }

        [JsonConverter(typeof(TimeIdentifierJsonConverter))]
        public TimeIdentifier? TimePeriodCoverage { get; set; }
        
        public string Title { get; set; }
        
        public Contact Contact { get; set; }

        [JsonConverter(typeof(DateTimeToDateJsonConverter))]
        public DateTime? PublishScheduled { get; set; }

        public DateTime? Published { get; set; }

        public bool Live { get; set; }
        
        public bool Amendment { get; set; }
        
        public Guid PreviousVersionId { get; set; }

        public PartialDate NextReleaseDate { get; set; }

        public string InternalReleaseNote { get; set; }

        public PermissionsSet Permissions { get; set; }
        
        public class PermissionsSet
        {
            public bool CanUpdateRelease { get; set; }
            
            public bool CanDeleteRelease { get; set; }
            
            public bool CanMakeAmendmentOfRelease { get; set; }
        }
    }
}
