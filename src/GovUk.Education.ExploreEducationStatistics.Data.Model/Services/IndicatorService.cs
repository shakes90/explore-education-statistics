using System.Collections.Generic;
using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Services
{
    public class IndicatorService : AbstractRepository<Indicator, long>, IIndicatorService
    {
        public IndicatorService(ApplicationDbContext context, ILogger<IndicatorService> logger)
            : base(context, logger)
        {
        }

        public IEnumerable<Indicator> GetIndicators(long subjectId)
        {
            return DbSet()
                .AsNoTracking()
                .Join(_context.IndicatorGroup, indicator => indicator.IndicatorGroupId,
                    indicatorGroup => indicatorGroup.Id,
                    (indicator, indicatorGroup) => new {indicator, indicatorGroup})
                .Where(t => t.indicatorGroup.SubjectId == subjectId)
                .Select(t => t.indicator);
        }

        public IEnumerable<Indicator> GetIndicators(long subjectId, IEnumerable<string> indicatorNames)
        {
            if (indicatorNames == null)
            {
                return new List<Indicator>();
            }

            return DbSet()
                .AsNoTracking()
                .Join(_context.IndicatorGroup, indicator => indicator.IndicatorGroupId,
                    indicatorGroup => indicatorGroup.Id,
                    (indicator, indicatorGroup) => new {indicator, indicatorGroup})
                .Where(t => indicatorNames.Contains(t.indicator.Name))
                .Where(t => t.indicatorGroup.SubjectId == subjectId)
                .Select(t => t.indicator);
        }
    }
}