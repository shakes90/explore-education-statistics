﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Api;
using GovUk.Education.ExploreEducationStatistics.Admin.Models.Api;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces
{
    public interface IReleaseService
    {
        Task<Either<ActionResult, Release>> GetAsync(Guid id);

        Task<Either<ActionResult, ReleaseViewModel>> CreateReleaseAsync(CreateReleaseViewModel release);

        Task<ReleaseViewModel> GetReleaseForIdAsync(Guid id);
        
        Task<Either<ActionResult, ReleaseSummaryViewModel>> GetReleaseSummaryAsync(Guid releaseId);
        
        Task<Either<ActionResult, ReleaseViewModel>> EditReleaseSummaryAsync(Guid releaseId, UpdateReleaseSummaryRequest request);

        Task<List<ReleaseViewModel>> GetReleasesForPublicationAsync(Guid publicationId);

        Task<List<ReleaseViewModel>> GetMyReleasesForReleaseStatusesAsync(params ReleaseStatus[] releaseStatuses);

        Task<Either<ActionResult, ReleaseSummaryViewModel>> UpdateReleaseStatusAsync(Guid releaseId, ReleaseStatus status, string internalReleaseNote);
    }
}
