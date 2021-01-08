using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Common.Extensions;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Common.Model.Data.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GovUk.Education.ExploreEducationStatistics.Data.Services
{
    public class ObservationService : AbstractRepository<Observation, long>, IObservationService
    {
        public ObservationService(
            StatisticsDbContext context,
            ILogger<ObservationService> logger) : base(context, logger)
        {
        }

        public IEnumerable<Observation> FindObservations(ObservationQueryContext query)
        {
            var stopwatch = Stopwatch.StartNew();
            stopwatch.Start();

            var locationsQuery = query.Locations;
            
            var localAuthorityOldCodes = locationsQuery?.LocalAuthority?.Where(s => s.Length == 3).ToList();
            var localAuthorityCodes = locationsQuery?.LocalAuthority?.Except(localAuthorityOldCodes).ToList();

            var subjectIdParam = new SqlParameter("subjectId", query.SubjectId);
            var geographicLevelParam = new SqlParameter("geographicLevel",
                locationsQuery?.GeographicLevel?.GetEnumValue() ?? (object) DBNull.Value);
            var timePeriodListParam = CreateTimePeriodListType("timePeriodList", GetTimePeriodRange(query));
            var countriesListParam = CreateIdListType("countriesList", locationsQuery?.Country);
            var institutionListParam =
                CreateIdListType("institutionList", locationsQuery?.Institution);
            var localAuthorityListParam = CreateIdListType("localAuthorityList", localAuthorityCodes);
            var localAuthorityOldCodeListParam = CreateIdListType("localAuthorityOldCodeList", localAuthorityOldCodes);
            var localAuthorityDistrictListParam =
                CreateIdListType("localAuthorityDistrictList", locationsQuery?.LocalAuthorityDistrict);
            var localEnterprisePartnershipListParam =
                CreateIdListType("localEnterprisePartnershipList", locationsQuery?.LocalEnterprisePartnership);
            var mayoralCombinedAuthorityListParam =
                CreateIdListType("mayoralCombinedAuthorityList", locationsQuery?.MayoralCombinedAuthority);
            var multiAcademyTrustListParam =
                CreateIdListType("multiAcademyTrustList", locationsQuery?.MultiAcademyTrust);
            var opportunityAreaListParam =
                CreateIdListType("opportunityAreaList", locationsQuery?.OpportunityArea);
            var parliamentaryConstituencyListParam =
                CreateIdListType("parliamentaryConstituencyList", locationsQuery?.ParliamentaryConstituency);
            var planningAreaListParam =
                CreateIdListType("planningAreaList", locationsQuery?.PlanningArea);
            var regionsListParam = CreateIdListType("regionsList", locationsQuery?.Region);
            var rscRegionListParam = CreateIdListType("rscRegionsList", locationsQuery?.RscRegion);
            var sponsorListParam = CreateIdListType("sponsorList", locationsQuery?.Sponsor);
            var wardListParam =
                CreateIdListType("wardList", locationsQuery?.Ward);
            var filterItemListParam = CreateIdListType("filterItemList", query.Filters);

            var filterItemsByFilters = _context
                .FilterItem
                .Include(f => f.FilterGroup)
                .ThenInclude(f => f.Filter)
                .Where(f => query.Filters.Contains(f.Id))
                .ToLookup(f => f.FilterGroup.Filter)
                .ToList();
            
            var filterItemSearchTermsQuery = filterItemsByFilters
                .Select(filterAndItems =>
                {
                    var filterItems = filterAndItems.AsQueryable();
                    var filterItemsClause = filterItems
                        .Select(fi => fi.Id)
                        .Aggregate("", (current, next) => current + (current.Length > 0 ? " OR " : "") + next);
                    return $"Contains(FilterItemIds, '{filterItemsClause}')";
                })
                .Aggregate("", (current, next) => current + (current.Length > 0 ? " AND " : "") + next);

            var filterItemSearchTermsParam = new SqlParameter("filterItemSearchTerms", filterItemSearchTermsQuery);
            
            // EES-745 It's ok to use Observation as the return type here, as long as only the Id field is selected

            var inner = _context
                .Set<Observation>()
                .FromSqlRaw("EXEC dbo.FilteredObservations2 " +
                            "@subjectId," +
                            "@geographicLevel," +
                            "@timePeriodList," +
                            "@countriesList," +
                            "@institutionList," +
                            "@localAuthorityList," +
                            "@localAuthorityOldCodeList," +
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
                            "@planningAreaList," +
                            "@filterItemList," +
                            "@filterItemSearchTerms",
                    subjectIdParam,
                    geographicLevelParam,
                    timePeriodListParam,
                    countriesListParam,
                    institutionListParam,
                    localAuthorityListParam,
                    localAuthorityOldCodeListParam,
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
                    planningAreaListParam,
                    filterItemListParam,
                    filterItemSearchTermsParam);

            _logger.LogTrace("Executed inner stored procedure in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            var ids = inner.Select(obs => obs.Id).ToArray();

            _logger.LogTrace("Fetched Observation id's from inner result in {Time} ms", stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Restart();

            var batches = ids.Batch(10000);

            var result = new List<Observation>();

            foreach (var batch in batches)
            {
                result.AddRange(DbSet()
                    .AsNoTracking()
                    .Where(observation => batch.Contains(observation.Id)));

                // load of the Location owned entities is removed from the query above as it was generating
                // very inefficient sql.
                var locationIds = result.Select(o => o.LocationId);
                var locations = _context.Location.AsNoTracking().Where(l => locationIds.Contains(l.Id));
                result.ForEach(observation =>
                    {
                        observation.Location = locations.SingleOrDefault(l => l.Id == observation.LocationId);
                    });
            }

            _logger.LogTrace("Fetched Observations by id from {Count} batches in {Time} ms", batches.Count(),
                stopwatch.Elapsed.TotalMilliseconds);
            stopwatch.Stop();

            return result;
        }

        public IEnumerable<Observation> FindObservations(SubjectMetaQueryContext query)
        {
            return DbSet()
                .AsNoTracking()
                .Where(ObservationPredicateBuilder.Build(query));
        }

        private static SqlParameter CreateTimePeriodListType(string parameterName,
            IEnumerable<(int Year, TimeIdentifier TimeIdentifier)> values)
        {
            return CreateListType(parameterName, values.AsTimePeriodListTable(), "dbo.TimePeriodListType");
        }

        private static IEnumerable<(int Year, TimeIdentifier TimeIdentifier)> GetTimePeriodRange(ObservationQueryContext query)
        {
            return TimePeriodUtil.Range(query.TimePeriod);
        }
    }
}