using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Data.Importer.Models;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Seed;
using Microsoft.Extensions.Logging;

namespace GovUk.Education.ExploreEducationStatistics.Data.Importer.Services
{
    public class ImporterService : IImporterService
    {
        private readonly ImporterLocationService _importerLocationService;
        private readonly ImporterFilterService _importerFilterService;
        private readonly ImporterMetaService _importerMetaService;
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;

        private static readonly Dictionary<string, TimeIdentifier> _timeIdentifiers =
            new Dictionary<string, TimeIdentifier>
            {
                {"academic year", TimeIdentifier.AY},
                {"academic year q1", TimeIdentifier.AYQ1},
                {"academic year q2", TimeIdentifier.AYQ2},
                {"academic year q3", TimeIdentifier.AYQ3},
                {"academic year q4", TimeIdentifier.AYQ4},
                {"academic year q1-q2", TimeIdentifier.AYQ1Q2},
                {"academic year q1-q3", TimeIdentifier.AYQ1Q3},
                {"academic year q1-q4", TimeIdentifier.AYQ1Q4},
                {"academic year q2-q3", TimeIdentifier.AYQ2Q3},
                {"academic year q2-q4", TimeIdentifier.AYQ2Q4},
                {"academic year q3-q4", TimeIdentifier.AYQ3Q4},
                {"calendar year", TimeIdentifier.CY},
                {"calendar year q1", TimeIdentifier.CYQ1},
                {"calendar year q2", TimeIdentifier.CYQ2},
                {"calendar year q3", TimeIdentifier.CYQ3},
                {"calendar year q4", TimeIdentifier.CYQ4},
                {"calendar year q1-q2", TimeIdentifier.CYQ1Q2},
                {"calendar year q1-q3", TimeIdentifier.CYQ1Q3},
                {"calendar year q1-q4", TimeIdentifier.CYQ1Q4},
                {"calendar year q2-q3", TimeIdentifier.CYQ2Q3},
                {"calendar year q2-q4", TimeIdentifier.CYQ2Q4},
                {"calendar year q3-q4", TimeIdentifier.CYQ3Q4},
                {"financial year", TimeIdentifier.FY},
                {"financial year q1", TimeIdentifier.FYQ1},
                {"financial year q2", TimeIdentifier.FYQ2},
                {"financial year q3", TimeIdentifier.FYQ3},
                {"financial year q4", TimeIdentifier.FYQ4},
                {"financial year q1-q2", TimeIdentifier.FYQ1Q2},
                {"financial year q1-q3", TimeIdentifier.FYQ1Q3},
                {"financial year q1-q4", TimeIdentifier.FYQ1Q4},
                {"financial year q2-q3", TimeIdentifier.FYQ2Q3},
                {"financial year q2-q4", TimeIdentifier.FYQ2Q4},
                {"financial year q3-q4", TimeIdentifier.FYQ3Q4},
                {"tax year", TimeIdentifier.TY},
                {"tax year q1", TimeIdentifier.TYQ1},
                {"tax year q2", TimeIdentifier.TYQ2},
                {"tax year q3", TimeIdentifier.TYQ3},
                {"tax year q4", TimeIdentifier.TYQ4},
                {"tax year q1-q2", TimeIdentifier.TYQ1Q2},
                {"tax year q1-q3", TimeIdentifier.TYQ1Q3},
                {"tax year q1-q4", TimeIdentifier.TYQ1Q4},
                {"tax year q2-q3", TimeIdentifier.TYQ2Q3},
                {"tax year q2-q4", TimeIdentifier.TYQ2Q4},
                {"tax year q3-q4", TimeIdentifier.TYQ3Q4},
                {"five half terms", TimeIdentifier.HT5},
                {"six half terms", TimeIdentifier.HT6},
                {"up until 31st march", TimeIdentifier.EOM},
                {"autumn term", TimeIdentifier.T1},
                {"autumn and spring term", TimeIdentifier.T1T2},
                {"spring term", TimeIdentifier.T2},
                {"summer term", TimeIdentifier.T3},
                {"january", TimeIdentifier.M1},
                {"february", TimeIdentifier.M2},
                {"march", TimeIdentifier.M3},
                {"april", TimeIdentifier.M4},
                {"may", TimeIdentifier.M5},
                {"june", TimeIdentifier.M6},
                {"july", TimeIdentifier.M7},
                {"august", TimeIdentifier.M8},
                {"september", TimeIdentifier.M9},
                {"october", TimeIdentifier.M10},
                {"november", TimeIdentifier.M11},
                {"december", TimeIdentifier.M12}
            };

        public ImporterService(
            ImporterFilterService importerFilterService,
            ImporterLocationService importerLocationService,
            ImporterMetaService importerMetaService,
            ApplicationDbContext context,
            ILogger<ImporterService> logger)
        {
            _importerFilterService = importerFilterService;
            _importerLocationService = importerLocationService;
            _importerMetaService = importerMetaService;
            _context = context;
            _logger = logger;
        }

        public void Import(IEnumerable<string> lines, IEnumerable<string> metaLines, Subject subject)
        {
            _logger.LogInformation("Importing {count} lines", lines.Count());

            var subjectMeta = ImportMeta(metaLines, subject);
            ImportObservations(lines, metaLines, subject, subjectMeta);
        }

        private SubjectMeta ImportMeta(IEnumerable<string> metaLines, Subject subject)
        {
            return _importerMetaService.Import(metaLines, subject);
        }

        private void ImportObservations(IEnumerable<string> lines, IEnumerable<string> metaLines, Subject subject,
            SubjectMeta subjectMeta)
        {
            var index = 1;
            var headers = lines.First().Split(',').ToList();
            var batches = lines.Skip(1).Batch(10000);
            var stopWatch = new Stopwatch();

            stopWatch.Start();
            foreach (var batch in batches)
            {
                _logger.LogInformation(
                    "Importing batch {Index} of {TotalCount} for Publication {Publication}, {Subject}", index,
                    batches.Count(), subject.Release.Publication.Title, subject.Name);

                var observations = GetObservations(batch, headers, subject, subjectMeta);
                _context.Observation.AddRange(observations);
                _context.SaveChanges();
                index++;

                _logger.LogInformation("Imported {Count} records in {Duration}. {TimerPerRecord}ms per record",
                    batch.Count(),
                    stopWatch.Elapsed.ToString(), stopWatch.Elapsed.TotalMilliseconds / batch.Count());
                stopWatch.Restart();
            }

            stopWatch.Stop();
        }

        private IEnumerable<Observation> GetObservations(IEnumerable<string> lines,
            List<string> headers,
            Subject subject,
            SubjectMeta subjectMeta)
        {
            return lines.Select(line => ObservationsFromCsv(line, headers, subject, subjectMeta));
        }

        private Observation ObservationsFromCsv(string raw,
            List<string> headers,
            Subject subject,
            SubjectMeta subjectMeta)
        {
            var line = raw.Split(',');
            var observation = new Observation
            {
                FilterItems = GetFilterItems(line, headers, subjectMeta.Filters),
                GeographicLevel = GetGeographicLevel(line, headers),
                LocationId = GetLocationId(line, headers),
                Measures = GetMeasures(line, headers, subjectMeta.Indicators),
                Provider = GetProvider(line, headers),
                School = GetSchool(line, headers),
                Subject = subject,
                TimeIdentifier = GetTimeIdentifier(line, headers),
                Year = GetYear(line, headers)
            };
            return observation;
        }

        private ICollection<ObservationFilterItem> GetFilterItems(IReadOnlyList<string> line,
            List<string> headers,
            IEnumerable<(Filter Filter, string Column, string FilterGroupingColumn)> filtersMeta)
        {
            return filtersMeta.Select(filterMeta =>
            {
                var filterItemLabel = CsvUtil.Value(line, headers, filterMeta.Column);
                var filterGroupLabel = CsvUtil.Value(line, headers, filterMeta.FilterGroupingColumn);
                var filterItem = _importerFilterService.Find(filterItemLabel, filterGroupLabel, filterMeta.Filter);
                return new ObservationFilterItem
                {
                    FilterItem = filterItem
                };
            }).ToList();
        }

        private static TimeIdentifier GetTimeIdentifier(IReadOnlyList<string> line, List<string> headers)
        {
            var timeIdentifier = CsvUtil.Value(line, headers, "time_identifier").ToLower();
            if (_timeIdentifiers.TryGetValue(timeIdentifier, out var code))
            {
                return code;
            }

            throw new ArgumentException("Unexpected value: " + timeIdentifier);
        }

        private static int GetYear(IReadOnlyList<string> line, List<string> headers)
        {
            return int.Parse(CsvUtil.Value(line, headers, "time_period").Substring(0, 4));
        }

        private static GeographicLevel GetGeographicLevel(IReadOnlyList<string> line, List<string> headers)
        {
            return GeographicLevels.EnumFromStringForImport(CsvUtil.Value(line, headers, "geographic_level"));
        }

        private long GetLocationId(IReadOnlyList<string> line, List<string> headers)
        {
            return _importerLocationService.Find(
                GetCountry(line, headers),
                GetInstitution(line, headers),
                GetLocalAuthority(line, headers),
                GetLocalAuthorityDistrict(line, headers),
                GetLocalEnterprisePartnership(line, headers),
                GetMat(line, headers),
                GetMayoralCombinedAuthority(line, headers),
                GetOpportunityArea(line, headers),
                GetParliamentaryConstituency(line, headers),
                GetRegion(line, headers),
                GetRscRegion(line, headers),
                GetWard(line, headers)
            ).Id;
        }

        private static School GetSchool(IReadOnlyList<string> line, List<string> headers)
        {
            var columns = new[]
                {"academy_open_date", "academy_type", "estab", "laestab", "school_name", "school_postcode", "urn"};
            return CsvUtil.BuildType(line, headers, columns, values => new School
            {
                AcademyOpenDate = values[0],
                AcademyType = values[1],
                Estab = values[2],
                LaEstab = values[3],
                Name = values[4],
                Postcode = values[5],
                Urn = values[6]
            });
        }

        private static Dictionary<long, string> GetMeasures(IReadOnlyList<string> line,
            List<string> headers, IEnumerable<(Indicator Indicator, string Column)> indicators)
        {
            var columns = indicators.Select(tuple => tuple.Column);
            var values = CsvUtil.Values(line, headers, columns);

            return indicators.Zip(values, (tuple, value) => new {tuple, value})
                .ToDictionary(item => item.tuple.Indicator.Id, item => item.value);
        }

        private static Country GetCountry(IReadOnlyList<string> line, List<string> headers)
        {
            var columns = new[] {"country_code", "country_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new Country(values[0], values[1]));
        }

        private static Institution GetInstitution(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"institution_id", "institution_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new Institution(values[0], values[1]));
        }

        private static LocalAuthority GetLocalAuthority(IReadOnlyList<string> line, List<string> headers)
        {
            var columns = new[] {"new_la_code", "old_la_code", "la_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new LocalAuthority(values[0], values[1], values[2]));
        }

        private static LocalAuthorityDistrict GetLocalAuthorityDistrict(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"sch_lad_code", "sch_lad_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new LocalAuthorityDistrict(values[0], values[1]));
        }

        private static LocalEnterprisePartnership GetLocalEnterprisePartnership(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"local_enterprise_partnership_code", "local_enterprise_partnership_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new LocalEnterprisePartnership(values[0], values[1]));
        }

        private static Mat GetMat(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"mat_id", "mat_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new Mat(values[0], values[1]));
        }

        private static MayoralCombinedAuthority GetMayoralCombinedAuthority(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"mayoral_combined_authority_code", "mayoral_combined_authority_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new MayoralCombinedAuthority(values[0], values[1]));
        }

        private static OpportunityArea GetOpportunityArea(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"opportunity_area_code", "opportunity_area_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new OpportunityArea(values[0], values[1]));
        }

        private static ParliamentaryConstituency GetParliamentaryConstituency(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"pcon_code", "pcon_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new ParliamentaryConstituency(values[0], values[1]));
        }

        private static Provider GetProvider(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"provider_urn", "provider_ukprn", "provider_upin", "provider_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new Provider(values[0], values[1], values[2], values[3]));
        }

        private static Region GetRegion(IReadOnlyList<string> line, List<string> headers)
        {
            var columns = new[] {"region_code", "region_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new Region(values[0], values[1]));
        }

        private static RscRegion GetRscRegion(IReadOnlyList<string> line, List<string> headers)
        {
            return CsvUtil.BuildType(line, headers, "rsc_region_lead_name", value => new RscRegion(value));
        }

        private static Ward GetWard(IReadOnlyList<string> line,
            List<string> headers)
        {
            var columns = new[] {"ward_code", "ward_name"};
            return CsvUtil.BuildType(line, headers, columns, values =>
                new Ward(values[0], values[1]));
        }
    }
}