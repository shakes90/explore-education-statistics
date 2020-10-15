﻿using System;
using System.Collections.Generic;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels;

namespace GovUk.Education.ExploreEducationStatistics.Admin.ViewModels
{
    public class MetaGuidanceViewModel
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public List<MetaGuidanceSubjectViewModel> Subjects { get; set; }
    }

    public class MetaGuidanceUpdateReleaseViewModel
    {
        public string Content { get; set; }
    }

    public class MetaGuidanceUpdateSubjectViewModel
    {
        public string Content { get; set; }
    }
}