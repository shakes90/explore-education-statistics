using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Extensions;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Services
{
    public class LocationService : AbstractRepository<Location, long>, ILocationService
    {
        public LocationService(ApplicationDbContext context, ILogger<LocationService> logger) : base(context, logger)
        {
        }

        public Dictionary<GeographicLevel, IEnumerable<IObservationalUnit>> GetObservationalUnits(
            Expression<Func<Observation, bool>> observationPredicate)
        {
            var locations = GetLocations(observationPredicate);
            return GetObservationalUnits(locations);
        }

        public Dictionary<GeographicLevel, IEnumerable<IObservationalUnit>> GetObservationalUnits(
            IEnumerable<Observation> observations)
        {
            var locations = GetLocations(observations.AsQueryable());
            return GetObservationalUnits(locations);
        }

        private Dictionary<GeographicLevel, IEnumerable<IObservationalUnit>> GetObservationalUnits(
            Dictionary<GeographicLevel, IEnumerable<Location>> locations)
        {
            return locations.ToDictionary(
                pair => pair.Key,
                pair => pair.Value.Select(location => GetObservationalUnit(pair.Key, location))
                    // TODO DFE-679 Filter null values caused by blank local authorities
                    .Where(unit => unit != null)
            );
        }

        private static IObservationalUnit GetObservationalUnit(GeographicLevel geographicLevel, Location location)
        {
            switch (geographicLevel)
            {
                case GeographicLevel.Local_Authority:
                    return location.LocalAuthority;
                case GeographicLevel.Local_Authority_District:
                    return location.LocalAuthorityDistrict;
                case GeographicLevel.Local_Enterprise_Partnership:
                    return location.LocalEnterprisePartnership;
                case GeographicLevel.Institution:
                    return location.Institution;
                case GeographicLevel.Mayoral_Combined_Authority:
                    return location.MayoralCombinedAuthority;
                case GeographicLevel.Multi_Academy_Trust:
                    return location.MultiAcademyTrust;
                case GeographicLevel.Country:
                    return location.Country;
                case GeographicLevel.Opportunity_Area:
                    return location.OpportunityArea;
                case GeographicLevel.Parliamentary_Constituency:
                    return location.ParliamentaryConstituency;
                case GeographicLevel.Region:
                    return location.Region;
                case GeographicLevel.RSC_Region:
                    return location.RscRegion;
                case GeographicLevel.Sponsor:
                    return location.Sponsor;
                case GeographicLevel.Ward:
                    return location.Ward;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private Dictionary<GeographicLevel, IEnumerable<Location>> GetLocations(
            Expression<Func<Observation, bool>> observationPredicate)
        {
            var queryable = _context.Observation
                .AsNoTracking()
                .Where(observationPredicate);
            return GetLocations(queryable);
        }

        private Dictionary<GeographicLevel, IEnumerable<Location>> GetLocations(IQueryable<Observation> observations)
        {
            var ignored = new List<GeographicLevel>
            {
                GeographicLevel.School,
                GeographicLevel.Provider
            };

            var locationIdsWithGeographicLevel = observations
                .Where(observation => !ignored.Contains(observation.GeographicLevel))
                .Select(observation => new {observation.GeographicLevel, observation.LocationId})
                .Distinct()
                .ToList();

            var locationIdsGroupedByGeographicLevel = locationIdsWithGeographicLevel.GroupBy(
                tuple => tuple.GeographicLevel,
                tuple => tuple.LocationId);

            var locations = GetLocations(locationIdsWithGeographicLevel.Select(arg => arg.LocationId).ToArray());

            return locationIdsGroupedByGeographicLevel
                .ToDictionary(
                    grouping => grouping.Key,
                    grouping => grouping.ToList().Select(id => locations[id]));
        }

        private Dictionary<long, Location> GetLocations(long[] locationIds)
        {
            var locations = Find(locationIds).ToList();
            // Nullify all of the Observational Unit fields which are empty (might not be needed)
            locations.ForEach(location => location.ReplaceEmptyOwnedTypeValuesWithNull());
            return locations.ToDictionary(location => location.Id);
        }
    }
}