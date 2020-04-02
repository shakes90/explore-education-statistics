using System;
using GovUk.Education.ExploreEducationStatistics.Common.Model;

namespace GovUk.Education.ExploreEducationStatistics.Content.Model
{
    public class ReleaseFile
    {
        public Guid Id { get; set; }

        public Release Release { get; set; }
        
        public Guid ReleaseId { get; set; }
        
        public ReleaseFileReference ReleaseFileReference { get; set; }

        public Guid ReleaseFileReferenceId { get; set; }

        public ReleaseFile CreateReleaseAmendment(Release amendment)
        {
            var copy = MemberwiseClone() as ReleaseFile;

            copy.Id = Guid.NewGuid();
            copy.Release = amendment;
            copy.ReleaseId = amendment.Id;

            return copy;
        }
    }
}