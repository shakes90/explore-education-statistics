﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Publisher.Model;

namespace GovUk.Education.ExploreEducationStatistics.Publisher.Services.Interfaces
{
    public interface IValidationService
    {
        Task<(bool Valid, IEnumerable<ReleaseStatusLogMessage> LogMessages)> ValidatePublishingState(Guid releaseId);
        Task<(bool Valid, IEnumerable<ReleaseStatusLogMessage> LogMessages)> ValidateRelease(Guid releaseId);
    }
}