using System;
using System.Collections.Generic;
using GovUk.Education.ExploreEducationStatistics.Common.Model;

namespace GovUk.Education.ExploreEducationStatistics.Publisher.Model.ViewModels
{
    public class ReleaseViewModel
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string YearTitle { get; set; }

        public string CoverageTitle { get; set; }

        public string ReleaseName { get; set; }

        public DateTime? Published { get; set; }

        public string Slug { get; set; }

        public Guid PublicationId { get; set; }

        public PublicationViewModel Publication { get; set; }

        public bool LatestRelease { get; set; }

        public ReleaseTypeViewModel Type { get; set; }

        public List<ReleaseNoteViewModel> Updates { get; set; }

        public List<ContentSectionViewModel> Content { get; set; }

        public ContentSectionViewModel SummarySection { get; set; }

        public ContentSectionViewModel HeadlinesSection { get; set; }

        public ContentSectionViewModel KeyStatisticsSection { get; set; }

        public ContentSectionViewModel KeyStatisticsSecondarySection { get; set; }

        public List<FileInfo> DownloadFiles { get; set; }

        public List<LinkViewModel> RelatedInformation { get; set; }
    }
}