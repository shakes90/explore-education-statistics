﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.Services;
using GovUk.Education.ExploreEducationStatistics.Admin.ViewModels;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Common.Model.Data;
using GovUk.Education.ExploreEducationStatistics.Common.Services.Interfaces.Security;
using GovUk.Education.ExploreEducationStatistics.Common.Utils;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.DbUtils;
using Release = GovUk.Education.ExploreEducationStatistics.Content.Model.Release;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services
{
    public class MetaGuidanceServiceTests
    {
        [Fact]
        public async Task Get()
        {
            var contentRelease = new Release
            {
                Id = Guid.NewGuid(),
                MetaGuidance = "Release Meta Guidance"
            };

            var statsRelease = new Data.Model.Release
            {
                Id = contentRelease.Id,
            };

            var subject1 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Subject 1"
            };

            var subject2 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Subject 2"
            };

            var subject1Filter = new Filter
            {
                Subject = subject1,
                Name = "subject1_filter",
                Label = "Subject 1 Filter",
                Hint = "Hint"
            };

            var subject2Filter = new Filter
            {
                Subject = subject2,
                Name = "subject2_filter",
                Label = "Subject 2 Filter",
                Hint = null
            };

            var subject1IndicatorGroup = new IndicatorGroup
            {
                Subject = subject1,
                Indicators = new List<Indicator>
                {
                    new Indicator
                    {
                        Name = "subject1_indicator",
                        Label = "Subject 1 Indicator"
                    }
                }
            };

            var subject2IndicatorGroup = new IndicatorGroup
            {
                Subject = subject2,
                Indicators = new List<Indicator>
                {
                    new Indicator
                    {
                        Name = "subject2_indicator",
                        Label = "Subject 2 Indicator"
                    }
                }
            };

            var releaseSubject1 = new ReleaseSubject
            {
                Release = statsRelease,
                Subject = subject1,
                MetaGuidance = "Subject 1 Meta Guidance"
            };

            var releaseSubject2 = new ReleaseSubject
            {
                Release = statsRelease,
                Subject = subject2,
                MetaGuidance = "Subject 2 Meta Guidance"
            };

            var file1 = new ReleaseFileReference
            {
                Filename = "file1.csv",
                Release = contentRelease,
                ReleaseFileType = ReleaseFileTypes.Data,
                SubjectId = subject1.Id
            };

            var file2 = new ReleaseFileReference
            {
                Filename = "file2.csv",
                Release = contentRelease,
                ReleaseFileType = ReleaseFileTypes.Data,
                SubjectId = subject2.Id
            };

            var releaseFile1 = new ReleaseFile
            {
                Release = contentRelease,
                ReleaseFileReference = file1
            };

            var releaseFile2 = new ReleaseFile
            {
                Release = contentRelease,
                ReleaseFileReference = file2
            };

            var subject1Observation1 = new Observation
            {
                GeographicLevel = GeographicLevel.Country,
                Subject = subject1,
                Year = 2020,
                TimeIdentifier = TimeIdentifier.AcademicYearQ3
            };

            var subject1Observation2 = new Observation
            {
                GeographicLevel = GeographicLevel.LocalAuthority,
                Subject = subject1,
                Year = 2020,
                TimeIdentifier = TimeIdentifier.AcademicYearQ4
            };

            var subject1Observation3 = new Observation
            {
                GeographicLevel = GeographicLevel.LocalAuthorityDistrict,
                Subject = subject1,
                Year = 2021,
                TimeIdentifier = TimeIdentifier.AcademicYearQ1
            };

            var subject2Observation1 = new Observation
            {
                GeographicLevel = GeographicLevel.Country,
                Subject = subject2,
                Year = 2020,
                TimeIdentifier = TimeIdentifier.SummerTerm
            };

            var subject2Observation2 = new Observation
            {
                GeographicLevel = GeographicLevel.Region,
                Subject = subject2,
                Year = 2021,
                TimeIdentifier = TimeIdentifier.AutumnTerm
            };

            var subject2Observation3 = new Observation
            {
                GeographicLevel = GeographicLevel.Region,
                Subject = subject2,
                Year = 2021,
                TimeIdentifier = TimeIdentifier.SpringTerm
            };

            var contentDbContextId = Guid.NewGuid().ToString();
            var statisticsDbContextId = Guid.NewGuid().ToString();

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            {
                await contentDbContext.AddAsync(contentRelease);
                await contentDbContext.AddRangeAsync(file1, file2);
                await contentDbContext.AddRangeAsync(releaseFile1, releaseFile2);
                await contentDbContext.SaveChangesAsync();
            }

            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                await statisticsDbContext.AddAsync(statsRelease);
                await statisticsDbContext.AddRangeAsync(subject1, subject2);
                await statisticsDbContext.AddRangeAsync(releaseSubject1, releaseSubject1,
                    releaseSubject2);
                await statisticsDbContext.AddRangeAsync(subject1Filter, subject2Filter);
                await statisticsDbContext.AddRangeAsync(subject1IndicatorGroup, subject2IndicatorGroup);
                await statisticsDbContext.AddRangeAsync(subject1Observation1, subject1Observation2,
                    subject1Observation3, subject2Observation1, subject2Observation2, subject2Observation3);
                await statisticsDbContext.SaveChangesAsync();
            }

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                var service = SetupMetaGuidanceService(contentDbContext: contentDbContext,
                    statisticsDbContext: statisticsDbContext);

                var result = await service.Get(contentRelease.Id);

                // Assert there are two Subjects with the correct content
                Assert.True(result.IsRight);

                Assert.Equal(contentRelease.Id, result.Right.Id);
                Assert.Equal("Release Meta Guidance", result.Right.Content);
                Assert.Equal(2, result.Right.Subjects.Count);

                Assert.Equal(subject1.Id, result.Right.Subjects[0].Id);
                Assert.Equal("Subject 1 Meta Guidance", result.Right.Subjects[0].Content);
                Assert.Equal("file1.csv", result.Right.Subjects[0].Filename);
                Assert.Equal("Subject 1", result.Right.Subjects[0].Name);
                Assert.Equal("2020_AYQ3", result.Right.Subjects[0].TimePeriods.From);
                Assert.Equal("2021_AYQ1", result.Right.Subjects[0].TimePeriods.To);
                Assert.Equal(new List<GeographicLevel>
                {
                    GeographicLevel.Country, GeographicLevel.LocalAuthority, GeographicLevel.LocalAuthorityDistrict
                }, result.Right.Subjects[0].GeographicLevels);
                Assert.Equal(2, result.Right.Subjects[0].Variables.Count);
                Assert.Equal("Subject 1 Filter - Hint", result.Right.Subjects[0].Variables[0].Label);
                Assert.Equal("subject1_filter", result.Right.Subjects[0].Variables[0].Value);
                Assert.Equal("Subject 1 Indicator", result.Right.Subjects[0].Variables[1].Label);
                Assert.Equal("subject1_indicator", result.Right.Subjects[0].Variables[1].Value);

                Assert.Equal(subject2.Id, result.Right.Subjects[1].Id);
                Assert.Equal("Subject 2 Meta Guidance", result.Right.Subjects[1].Content);
                Assert.Equal("file2.csv", result.Right.Subjects[1].Filename);
                Assert.Equal("Subject 2", result.Right.Subjects[1].Name);
                Assert.Equal("2020_T3", result.Right.Subjects[1].TimePeriods.From);
                Assert.Equal("2021_T2", result.Right.Subjects[1].TimePeriods.To);
                Assert.Equal(new List<GeographicLevel>
                {
                    GeographicLevel.Country, GeographicLevel.Region
                }, result.Right.Subjects[1].GeographicLevels);
                Assert.Equal(2, result.Right.Subjects[1].Variables.Count);
                Assert.Equal("Subject 2 Filter", result.Right.Subjects[1].Variables[0].Label);
                Assert.Equal("subject2_filter", result.Right.Subjects[1].Variables[0].Value);
                Assert.Equal("Subject 2 Indicator", result.Right.Subjects[1].Variables[1].Label);
                Assert.Equal("subject2_indicator", result.Right.Subjects[1].Variables[1].Value);
            }
        }

        [Fact]
        public async Task Get_AmendedRelease()
        {
            var contentReleaseVersion1 = new Release
            {
                Id = Guid.NewGuid(),
                PreviousVersionId = null,
                MetaGuidance = "Version 1 Release Meta Guidance"
            };

            var contentReleaseVersion2 = new Release
            {
                Id = Guid.NewGuid(),
                PreviousVersionId = contentReleaseVersion1.Id,
                MetaGuidance = "Version 2 Release Meta Guidance"
            };

            var statsReleaseVersion1 = new Data.Model.Release
            {
                Id = contentReleaseVersion1.Id,
                PreviousVersionId = contentReleaseVersion1.PreviousVersionId
            };

            var statsReleaseVersion2 = new Data.Model.Release
            {
                Id = contentReleaseVersion2.Id,
                PreviousVersionId = contentReleaseVersion2.PreviousVersionId
            };

            var subject1 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Subject 1"
            };

            var subject2 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Subject 2"
            };

            // Version 1 has one Subject, Version 2 adds another Subject

            var releaseVersion1Subject1 = new ReleaseSubject
            {
                Release = statsReleaseVersion1,
                Subject = subject1,
                MetaGuidance = "Version 1 Subject 1 Meta Guidance"
            };

            var releaseVersion2Subject1 = new ReleaseSubject
            {
                Release = statsReleaseVersion2,
                Subject = subject1,
                MetaGuidance = "Version 2 Subject 1 Meta Guidance"
            };

            var releaseVersion2Subject2 = new ReleaseSubject
            {
                Release = statsReleaseVersion2,
                Subject = subject2,
                MetaGuidance = "Version 2 Subject 2 Meta Guidance"
            };

            var file1 = new ReleaseFileReference
            {
                Filename = "file1.csv",
                Release = contentReleaseVersion1,
                ReleaseFileType = ReleaseFileTypes.Data,
                SubjectId = subject1.Id
            };

            var file2 = new ReleaseFileReference
            {
                Filename = "file2.csv",
                Release = contentReleaseVersion1,
                ReleaseFileType = ReleaseFileTypes.Data,
                SubjectId = subject2.Id
            };

            var releaseVersion1File1 = new ReleaseFile
            {
                Release = contentReleaseVersion1,
                ReleaseFileReference = file1
            };

            var releaseVersion2File1 = new ReleaseFile
            {
                Release = contentReleaseVersion2,
                ReleaseFileReference = file1
            };

            var releaseVersion2File2 = new ReleaseFile
            {
                Release = contentReleaseVersion2,
                ReleaseFileReference = file2
            };

            var contentDbContextId = Guid.NewGuid().ToString();
            var statisticsDbContextId = Guid.NewGuid().ToString();

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            {
                await contentDbContext.AddRangeAsync(contentReleaseVersion1, contentReleaseVersion2);
                await contentDbContext.AddRangeAsync(file1, file2);
                await contentDbContext.AddRangeAsync(releaseVersion1File1, releaseVersion2File1, releaseVersion2File2);
                await contentDbContext.SaveChangesAsync();
            }

            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                await statisticsDbContext.AddRangeAsync(statsReleaseVersion1, statsReleaseVersion2);
                await statisticsDbContext.AddRangeAsync(subject1, subject2);
                await statisticsDbContext.AddRangeAsync(releaseVersion1Subject1, releaseVersion2Subject1,
                    releaseVersion2Subject2);
                await statisticsDbContext.SaveChangesAsync();
            }

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                var service = SetupMetaGuidanceService(contentDbContext: contentDbContext,
                    statisticsDbContext: statisticsDbContext);

                var version1Result = await service.Get(contentReleaseVersion1.Id);

                // Assert version 1 has one Subject with the correct content
                Assert.True(version1Result.IsRight);

                Assert.Equal(contentReleaseVersion1.Id, version1Result.Right.Id);
                Assert.Equal("Version 1 Release Meta Guidance", version1Result.Right.Content);
                Assert.Single(version1Result.Right.Subjects);

                Assert.Equal(subject1.Id, version1Result.Right.Subjects[0].Id);
                Assert.Equal("Version 1 Subject 1 Meta Guidance", version1Result.Right.Subjects[0].Content);
                Assert.Equal("file1.csv", version1Result.Right.Subjects[0].Filename);
                Assert.Equal("Subject 1", version1Result.Right.Subjects[0].Name);
                Assert.Null(version1Result.Right.Subjects[0].TimePeriods.From);
                Assert.Null(version1Result.Right.Subjects[0].TimePeriods.To);
                Assert.Empty(version1Result.Right.Subjects[0].GeographicLevels);
                Assert.Empty(version1Result.Right.Subjects[0].Variables);

                var version2Result = await service.Get(contentReleaseVersion2.Id);

                // Assert version 2 has two Subjects with the correct content
                Assert.True(version2Result.IsRight);

                Assert.Equal(contentReleaseVersion2.Id, version2Result.Right.Id);
                Assert.Equal("Version 2 Release Meta Guidance", version2Result.Right.Content);
                Assert.Equal(2, version2Result.Right.Subjects.Count);

                Assert.Equal(subject1.Id, version2Result.Right.Subjects[0].Id);
                Assert.Equal("Version 2 Subject 1 Meta Guidance", version2Result.Right.Subjects[0].Content);
                Assert.Equal("file1.csv", version2Result.Right.Subjects[0].Filename);
                Assert.Equal("Subject 1", version2Result.Right.Subjects[0].Name);
                Assert.Null(version2Result.Right.Subjects[0].TimePeriods.From);
                Assert.Null(version2Result.Right.Subjects[0].TimePeriods.To);
                Assert.Empty(version2Result.Right.Subjects[0].GeographicLevels);

                Assert.Equal(subject2.Id, version2Result.Right.Subjects[1].Id);
                Assert.Equal("Version 2 Subject 2 Meta Guidance", version2Result.Right.Subjects[1].Content);
                Assert.Equal("file2.csv", version2Result.Right.Subjects[1].Filename);
                Assert.Equal("Subject 2", version2Result.Right.Subjects[1].Name);
                Assert.Null(version2Result.Right.Subjects[1].TimePeriods.From);
                Assert.Null(version2Result.Right.Subjects[1].TimePeriods.To);
                Assert.Empty(version2Result.Right.Subjects[1].GeographicLevels);
                Assert.Empty(version2Result.Right.Subjects[1].Variables);
            }
        }

        [Fact]
        public async Task UpdateRelease()
        {
            var release = new Release
            {
                Id = Guid.NewGuid(),
                PreviousVersionId = null,
                MetaGuidance = "Release Meta Guidance"
            };

            var contentDbContextId = Guid.NewGuid().ToString();
            var statisticsDbContextId = Guid.NewGuid().ToString();

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            {
                await contentDbContext.AddAsync(release);
                await contentDbContext.SaveChangesAsync();
            }

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                var service = SetupMetaGuidanceService(contentDbContext: contentDbContext,
                    statisticsDbContext: statisticsDbContext);

                var result = await service.UpdateRelease(release.Id, new MetaGuidanceUpdateReleaseViewModel
                {
                    Content = "Updated Release Meta Guidance"
                });

                Assert.True(result.IsRight);

                Assert.Equal(release.Id, result.Right.Id);
                Assert.Equal("Updated Release Meta Guidance", result.Right.Content);
                Assert.Empty(result.Right.Subjects);
            }

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            {
                Assert.Equal("Updated Release Meta Guidance",
                    (await contentDbContext.Releases.FindAsync(release.Id)).MetaGuidance);
            }
        }

        [Fact]
        public async Task UpdateSubject()
        {
            var contentRelease = new Release
            {
                Id = Guid.NewGuid(),
                MetaGuidance = "Release Meta Guidance"
            };

            var statsRelease = new Data.Model.Release
            {
                Id = contentRelease.Id,
            };

            var subject1 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Subject 1"
            };

            var subject2 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Subject 2"
            };

            var releaseSubject1 = new ReleaseSubject
            {
                Release = statsRelease,
                Subject = subject1,
                MetaGuidance = "Subject 1 Meta Guidance"
            };

            var releaseSubject2 = new ReleaseSubject
            {
                Release = statsRelease,
                Subject = subject2,
                MetaGuidance = "Subject 2 Meta Guidance"
            };

            var file1 = new ReleaseFileReference
            {
                Filename = "file1.csv",
                Release = contentRelease,
                ReleaseFileType = ReleaseFileTypes.Data,
                SubjectId = subject1.Id
            };

            var file2 = new ReleaseFileReference
            {
                Filename = "file2.csv",
                Release = contentRelease,
                ReleaseFileType = ReleaseFileTypes.Data,
                SubjectId = subject2.Id
            };

            var releaseFile1 = new ReleaseFile
            {
                Release = contentRelease,
                ReleaseFileReference = file1
            };

            var releaseFile2 = new ReleaseFile
            {
                Release = contentRelease,
                ReleaseFileReference = file2
            };

            var contentDbContextId = Guid.NewGuid().ToString();
            var statisticsDbContextId = Guid.NewGuid().ToString();

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            {
                await contentDbContext.AddAsync(contentRelease);
                await contentDbContext.AddRangeAsync(file1, file2);
                await contentDbContext.AddRangeAsync(releaseFile1, releaseFile2);
                await contentDbContext.SaveChangesAsync();
            }

            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                await statisticsDbContext.AddRangeAsync(statsRelease);
                await statisticsDbContext.AddRangeAsync(subject1, subject2);
                await statisticsDbContext.AddRangeAsync(releaseSubject1, releaseSubject2);
                await statisticsDbContext.SaveChangesAsync();
            }

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                var service = SetupMetaGuidanceService(contentDbContext: contentDbContext,
                    statisticsDbContext: statisticsDbContext);

                // Update Subject 1
                var result = await service.UpdateSubject(
                    contentRelease.Id, subject1.Id, new MetaGuidanceUpdateSubjectViewModel
                    {
                        Content = "Subject 1 Meta Guidance Updated"
                    });

                // Assert only one Subject has been updated
                Assert.True(result.IsRight);

                Assert.Equal(contentRelease.Id, result.Right.Id);
                Assert.Equal("Release Meta Guidance", result.Right.Content);
                Assert.Equal(2, result.Right.Subjects.Count);

                Assert.Equal(subject1.Id, result.Right.Subjects[0].Id);
                Assert.Equal("Subject 1 Meta Guidance Updated", result.Right.Subjects[0].Content);
                Assert.Equal("file1.csv", result.Right.Subjects[0].Filename);
                Assert.Equal("Subject 1", result.Right.Subjects[0].Name);
                Assert.Null(result.Right.Subjects[0].TimePeriods.From);
                Assert.Null(result.Right.Subjects[0].TimePeriods.To);
                Assert.Empty(result.Right.Subjects[0].GeographicLevels);
                Assert.Empty(result.Right.Subjects[0].Variables);

                Assert.Equal(subject2.Id, result.Right.Subjects[1].Id);
                Assert.Equal("Subject 2 Meta Guidance", result.Right.Subjects[1].Content);
                Assert.Equal("file2.csv", result.Right.Subjects[1].Filename);
                Assert.Equal("Subject 2", result.Right.Subjects[1].Name);
                Assert.Null(result.Right.Subjects[1].TimePeriods.From);
                Assert.Null(result.Right.Subjects[1].TimePeriods.To);
                Assert.Empty(result.Right.Subjects[1].GeographicLevels);
                Assert.Empty(result.Right.Subjects[1].Variables);
            }

            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                Assert.Equal("Subject 1 Meta Guidance Updated",
                    (await statisticsDbContext.ReleaseSubject
                        .Where(rs => rs.ReleaseId == statsRelease.Id && rs.SubjectId == subject1.Id)
                        .FirstAsync()).MetaGuidance);

                Assert.Equal("Subject 2 Meta Guidance",
                    (await statisticsDbContext.ReleaseSubject
                        .Where(rs => rs.ReleaseId == statsRelease.Id && rs.SubjectId == subject2.Id)
                        .FirstAsync()).MetaGuidance);
            }
        }

        [Fact]
        public async Task UpdateSubject_AmendedRelease()
        {
            var contentReleaseVersion1 = new Release
            {
                Id = Guid.NewGuid(),
                PreviousVersionId = null,
                MetaGuidance = "Version 1 Release Meta Guidance"
            };

            var contentReleaseVersion2 = new Release
            {
                Id = Guid.NewGuid(),
                PreviousVersionId = contentReleaseVersion1.Id,
                MetaGuidance = "Version 2 Release Meta Guidance"
            };

            var statsReleaseVersion1 = new Data.Model.Release
            {
                Id = contentReleaseVersion1.Id,
                PreviousVersionId = contentReleaseVersion1.PreviousVersionId
            };

            var statsReleaseVersion2 = new Data.Model.Release
            {
                Id = contentReleaseVersion2.Id,
                PreviousVersionId = contentReleaseVersion2.PreviousVersionId
            };

            var subject1 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Subject 1"
            };

            var subject2 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Subject 2"
            };

            // Version 1 has one Subject, version 2 adds another Subject

            var releaseVersion1Subject1 = new ReleaseSubject
            {
                Release = statsReleaseVersion1,
                Subject = subject1,
                MetaGuidance = "Version 1 Subject 1 Meta Guidance"
            };

            var releaseVersion2Subject1 = new ReleaseSubject
            {
                Release = statsReleaseVersion2,
                Subject = subject1,
                MetaGuidance = "Version 2 Subject 1 Meta Guidance"
            };

            var releaseVersion2Subject2 = new ReleaseSubject
            {
                Release = statsReleaseVersion2,
                Subject = subject2,
                MetaGuidance = "Version 2 Subject 2 Meta Guidance"
            };

            var file1 = new ReleaseFileReference
            {
                Filename = "file1.csv",
                Release = contentReleaseVersion1,
                ReleaseFileType = ReleaseFileTypes.Data,
                SubjectId = subject1.Id
            };

            var file2 = new ReleaseFileReference
            {
                Filename = "file2.csv",
                Release = contentReleaseVersion1,
                ReleaseFileType = ReleaseFileTypes.Data,
                SubjectId = subject2.Id
            };

            var releaseVersion1File1 = new ReleaseFile
            {
                Release = contentReleaseVersion1,
                ReleaseFileReference = file1
            };

            var releaseVersion2File1 = new ReleaseFile
            {
                Release = contentReleaseVersion2,
                ReleaseFileReference = file1
            };

            var releaseVersion2File2 = new ReleaseFile
            {
                Release = contentReleaseVersion2,
                ReleaseFileReference = file2
            };

            var contentDbContextId = Guid.NewGuid().ToString();
            var statisticsDbContextId = Guid.NewGuid().ToString();

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            {
                await contentDbContext.AddRangeAsync(contentReleaseVersion1, contentReleaseVersion2);
                await contentDbContext.AddRangeAsync(file1, file2);
                await contentDbContext.AddRangeAsync(releaseVersion1File1, releaseVersion2File1, releaseVersion2File2);
                await contentDbContext.SaveChangesAsync();
            }

            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                await statisticsDbContext.AddRangeAsync(statsReleaseVersion1, statsReleaseVersion2);
                await statisticsDbContext.AddRangeAsync(subject1, subject2);
                await statisticsDbContext.AddRangeAsync(releaseVersion1Subject1, releaseVersion2Subject1,
                    releaseVersion2Subject2);
                await statisticsDbContext.SaveChangesAsync();
            }

            await using (var contentDbContext = InMemoryApplicationDbContext(contentDbContextId))
            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                var service = SetupMetaGuidanceService(contentDbContext: contentDbContext,
                    statisticsDbContext: statisticsDbContext);

                // Update Subject 1 on version 2
                var updateResult = await service.UpdateSubject(
                    contentReleaseVersion2.Id, subject1.Id, new MetaGuidanceUpdateSubjectViewModel
                    {
                        Content = "Version 2 Subject 1 Meta Guidance Updated"
                    });

                // Assert only one Subject on version 2 has been updated
                Assert.True(updateResult.IsRight);

                Assert.Equal(contentReleaseVersion2.Id, updateResult.Right.Id);
                Assert.Equal("Version 2 Release Meta Guidance", updateResult.Right.Content);
                Assert.Equal(2, updateResult.Right.Subjects.Count);

                Assert.Equal(subject1.Id, updateResult.Right.Subjects[0].Id);
                Assert.Equal("Version 2 Subject 1 Meta Guidance Updated", updateResult.Right.Subjects[0].Content);
                Assert.Equal("file1.csv", updateResult.Right.Subjects[0].Filename);
                Assert.Equal("Subject 1", updateResult.Right.Subjects[0].Name);
                Assert.Null(updateResult.Right.Subjects[0].TimePeriods.From);
                Assert.Null(updateResult.Right.Subjects[0].TimePeriods.To);
                Assert.Empty(updateResult.Right.Subjects[0].GeographicLevels);
                Assert.Empty(updateResult.Right.Subjects[0].Variables);

                Assert.Equal(subject2.Id, updateResult.Right.Subjects[1].Id);
                Assert.Equal("Version 2 Subject 2 Meta Guidance", updateResult.Right.Subjects[1].Content);
                Assert.Equal("file2.csv", updateResult.Right.Subjects[1].Filename);
                Assert.Equal("Subject 2", updateResult.Right.Subjects[1].Name);
                Assert.Null(updateResult.Right.Subjects[1].TimePeriods.From);
                Assert.Null(updateResult.Right.Subjects[1].TimePeriods.To);
                Assert.Empty(updateResult.Right.Subjects[1].GeographicLevels);
                Assert.Empty(updateResult.Right.Subjects[1].Variables);

                var version1Result = await service.Get(contentReleaseVersion1.Id);

                // Assert the same Subject on version 1 hasn't been affected
                Assert.True(version1Result.IsRight);

                Assert.Equal(contentReleaseVersion1.Id, version1Result.Right.Id);
                Assert.Equal("Version 1 Release Meta Guidance", version1Result.Right.Content);
                Assert.Single(version1Result.Right.Subjects);

                Assert.Equal(subject1.Id, version1Result.Right.Subjects[0].Id);
                Assert.Equal("Version 1 Subject 1 Meta Guidance", version1Result.Right.Subjects[0].Content);
                Assert.Equal("file1.csv", version1Result.Right.Subjects[0].Filename);
                Assert.Equal("Subject 1", version1Result.Right.Subjects[0].Name);
                Assert.Null(version1Result.Right.Subjects[0].TimePeriods.From);
                Assert.Null(version1Result.Right.Subjects[0].TimePeriods.To);
                Assert.Empty(version1Result.Right.Subjects[0].GeographicLevels);
                Assert.Empty(version1Result.Right.Subjects[0].Variables);
            }

            await using (var statisticsDbContext = InMemoryStatisticsDbContext(statisticsDbContextId))
            {
                Assert.Equal("Version 1 Subject 1 Meta Guidance",
                    (await statisticsDbContext.ReleaseSubject
                        .Where(rs => rs.ReleaseId == statsReleaseVersion1.Id && rs.SubjectId == subject1.Id)
                        .FirstAsync()).MetaGuidance);

                Assert.Equal("Version 2 Subject 1 Meta Guidance Updated",
                    (await statisticsDbContext.ReleaseSubject
                        .Where(rs => rs.ReleaseId == statsReleaseVersion2.Id && rs.SubjectId == subject1.Id)
                        .FirstAsync()).MetaGuidance);

                Assert.Equal("Version 2 Subject 2 Meta Guidance",
                    (await statisticsDbContext.ReleaseSubject
                        .Where(rs => rs.ReleaseId == statsReleaseVersion2.Id && rs.SubjectId == subject2.Id)
                        .FirstAsync()).MetaGuidance);
            }
        }

        private static MetaGuidanceService SetupMetaGuidanceService(
            ContentDbContext contentDbContext,
            StatisticsDbContext statisticsDbContext,
            IPersistenceHelper<ContentDbContext> contentPersistenceHelper = null,
            IFilterService filterService = null,
            IIndicatorService indicatorService = null,
            IPersistenceHelper<StatisticsDbContext> statisticsPersistenceHelper = null,
            IUserService userService = null)
        {
            return new MetaGuidanceService(
                contentDbContext,
                contentPersistenceHelper ?? new PersistenceHelper<ContentDbContext>(contentDbContext),
                filterService ?? new FilterService(statisticsDbContext, new Mock<ILogger<FilterService>>().Object),
                indicatorService ??
                new IndicatorService(statisticsDbContext, new Mock<ILogger<IndicatorService>>().Object),
                statisticsDbContext,
                statisticsPersistenceHelper ?? new PersistenceHelper<StatisticsDbContext>(statisticsDbContext),
                userService ?? MockUtils.AlwaysTrueUserService().Object
            );
        }
    }
}