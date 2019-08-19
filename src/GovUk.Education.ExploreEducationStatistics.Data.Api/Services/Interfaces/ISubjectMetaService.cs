using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels.Meta;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Query;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Services.Interfaces
{
    public interface ISubjectMetaService
    {
        SubjectMetaViewModel GetSubjectMeta(SubjectMetaQueryContext query, IQueryable<Observation> observations);
    }
}