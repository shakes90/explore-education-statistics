using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Services
{
    public class ObservationService : AbstractRepository<Observation, long>, IObservationService
    {
        public ObservationService(
            ApplicationDbContext context,
            ILogger<ObservationService> logger) : base(context, logger)
        {
        }

        public IEnumerable<Observation> FindObservations(ObservationQueryContext query)
        {
            var yearsRange = TimePeriodUtil.YearsRange(query.Years, query.StartYear, query.EndYear);

            var subjectIdParam = new SqlParameter("subjectId", query.SubjectId);
            var geographicLevelParam = new SqlParameter("geographicLevel", query.GeographicLevel.GetEnumValue());
            var yearsListParam = CreateIdListType("yearList", yearsRange);
            var countriesListParam = CreateIdListType("countriesList", query.Countries);
            var institutionListParam =
                CreateIdListType("institutionList", query.Institutions);
            var localAuthorityListParam = CreateIdListType("localAuthorityList", query.LocalAuthorities);
            var localAuthorityDistrictListParam =
                CreateIdListType("localAuthorityDistrictList", query.LocalAuthorityDistricts);
            var localEnterprisePartnershipListParam =
                CreateIdListType("localEnterprisePartnershipList", query.LocalEnterprisePartnerships);
            var mayoralCombinedAuthorityListParam =
                CreateIdListType("mayoralCombinedAuthorityList", query.MayoralCombinedAuthorities);
            var multiAcademyTrustListParam =
                CreateIdListType("multiAcademyTrustList", query.Mats);
            var opportunityAreaListParam =
                CreateIdListType("opportunityAreaList", query.OpportunityAreas);
            var parliamentaryConstituencyListParam =
                CreateIdListType("parliamentaryConstituencyList", query.ParliamentaryConstituencies);
            var regionsListParam = CreateIdListType("regionsList", query.Regions);
            var rscRegionListParam = CreateIdListType("rscRegionsList", query.RscRegions);
            var sponsorListParam = CreateIdListType("sponsorList", query.Sponsors);
            var wardListParam =
                CreateIdListType("wardList", query.Wards);
            var filtersListParam = CreateIdListType("filtersList", query.Filters);

            var inner = _context.Query<IdWrapper>().AsNoTracking()
                .FromSql("EXEC dbo.FilteredObservations " +
                         "@subjectId," +
                         "@geographicLevel," +
                         "@yearList," +
                         "@countriesList," +
                         "@institutionList," +
                         "@localAuthorityList," +
                         "@localAuthorityDistrictList," +
                         "@localEnterprisePartnershipList," +
                         "@mayoralCombinedAuthorityList," +
                         "@multiAcademyTrustList," +
                         "@opportunityAreaList," +
                         "@parliamentaryConstituencyList," +
                         "@regionsList," +
                         "@rscRegionsList," +
                         "@sponsorList," +
                         "@wardList," +
                         "@filtersList",
                    subjectIdParam,
                    geographicLevelParam,
                    yearsListParam,
                    countriesListParam,
                    institutionListParam,
                    localAuthorityListParam,
                    localAuthorityDistrictListParam,
                    localEnterprisePartnershipListParam,
                    mayoralCombinedAuthorityListParam,
                    multiAcademyTrustListParam,
                    opportunityAreaListParam,
                    parliamentaryConstituencyListParam,
                    regionsListParam,
                    rscRegionListParam,
                    sponsorListParam,
                    wardListParam,
                    filtersListParam);

            var ids = inner.Select(obs => obs.Id).ToList();

            var result = DbSet()
                .AsNoTracking()
                .Where(observation => ids.Contains(observation.Id))
                .Include(observation => observation.Subject)
                .ThenInclude(subject => subject.Release)
                .Include(observation => observation.Location)
                .Include(observation => observation.FilterItems)
                .ThenInclude(item => item.FilterItem.FilterGroup).ToList();

            result.Select(observation => observation.Location)
                .Distinct()
                .ToList()
                .ForEach(location => location.ReplaceEmptyOwnedTypeValuesWithNull());

            return result;
        }

        private static SqlParameter CreateIdListType(string parameterName, IEnumerable<int> idList)
        {
            return CreateListType(parameterName, idList.AsIdListTable(), "dbo.IdListIntegerType");
        }

        private static SqlParameter CreateIdListType(string parameterName, IEnumerable<long> idList)
        {
            return CreateListType(parameterName, idList.AsIdListTable(), "dbo.IdListIntegerType");
        }

        private static SqlParameter CreateIdListType(string parameterName, IEnumerable<string> idList)
        {
            return CreateListType(parameterName, idList.AsIdListTable(), "dbo.IdListVarcharType");
        }

        private static SqlParameter CreateListType(string parameterName, object value, string typeName)
        {
            return new SqlParameter(parameterName, value)
            {
                SqlDbType = SqlDbType.Structured,
                TypeName = typeName
            };
        }

        public IEnumerable<(TimeIdentifier TimeIdentifier, int Year)> GetTimePeriodsMeta(SubjectMetaQueryContext query)
        {
            var timePeriods = DbSet().AsNoTracking().Where(query.ObservationPredicate())
                .Select(o => new {o.TimeIdentifier, o.Year})
                .OrderBy(tuple => tuple.Year)
                .ThenBy(tuple => tuple.TimeIdentifier)
                .Distinct();

            return from timePeriod in timePeriods.AsEnumerable()
                select (timePeriod.TimeIdentifier, timePeriod.Year);
        }
    }
}