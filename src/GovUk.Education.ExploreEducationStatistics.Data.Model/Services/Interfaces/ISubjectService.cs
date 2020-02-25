using System;
using System.Threading.Tasks;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces
{
    public interface ISubjectService : IRepository<Subject, Guid>
    {
        bool IsSubjectForLatestPublishedRelease(Guid subjectId);

        bool Exists(Guid releaseId, string name);

        Task<bool> DeleteAsync(Guid releaseId, string name);

        Task<Subject> GetAsync(Guid releaseId, string name);
    }
}