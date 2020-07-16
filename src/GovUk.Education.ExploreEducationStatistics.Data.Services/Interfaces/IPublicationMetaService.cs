using System;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels.Meta;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces
{
    public interface IPublicationMetaService
    {
        Task<Either<ActionResult, PublicationSubjectsMetaViewModel>> GetSubjectsForLatestRelease(Guid publicationId);
    }
}