using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Services
{
    public class SubjectService : AbstractDataService<Subject, long>, ISubjectService
    {
        public SubjectService(ApplicationDbContext context,
            ILogger<SubjectService> logger) : base(context, logger)
        {
        }
    }
}