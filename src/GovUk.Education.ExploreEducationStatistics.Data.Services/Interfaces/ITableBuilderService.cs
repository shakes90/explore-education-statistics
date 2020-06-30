using System;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Common.Model.Data.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces
{
    public interface ITableBuilderService
    {
        Task<Either<ActionResult, TableBuilderResultViewModel>> Query(ObservationQueryContext queryContext);

        Task<Either<ActionResult, TableBuilderResultViewModel>> Query(Guid releaseId, ObservationQueryContext queryContext);
    }
}