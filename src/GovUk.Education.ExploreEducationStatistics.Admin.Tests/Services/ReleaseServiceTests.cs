using System;
using System.Collections.Generic;
using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Api;
using GovUk.Education.ExploreEducationStatistics.Admin.Models.Api;
using GovUk.Education.ExploreEducationStatistics.Admin.Services;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces.Security;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Common.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Common.Services.Interfaces.Security;
using GovUk.Education.ExploreEducationStatistics.Common.Utils;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.DbUtils;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.MapperUtils;
using IFootnoteService = GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces.IFootnoteService;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services
{
    public class ReleaseServiceTests
    {
        private readonly Guid _userId = Guid.NewGuid();
        
        [Fact]
        public void CreateReleaseNoTemplate()
        {
            var (userService, _, publishingService, repository, subjectService, tableStorageService, fileStorageService, importStatusService, footnoteService) = Mocks();

            var publication = new Publication
            {
                Id = Guid.NewGuid(),
                Title = "Publication"
            };
            
            using (var context = InMemoryApplicationDbContext("CreateReleaseNoTemplate"))
            {
                context.Add(new ReleaseType {Id = new Guid("484e6b5c-4a0f-47fd-914e-ac4dac5bdd1c"), Title = "Ad Hoc",});
                context.Add(publication);
                context.SaveChanges();
            }

            using (var context = InMemoryApplicationDbContext("CreateReleaseNoTemplate"))
            {
                var releaseService = new ReleaseService(context, AdminMapper(), 
                    publishingService.Object, new PersistenceHelper<ContentDbContext>(context), userService.Object, repository.Object,
                    subjectService.Object, tableStorageService.Object, fileStorageService.Object, importStatusService.Object, footnoteService.Object);
                
                var result = releaseService.CreateReleaseAsync(
                    new CreateReleaseViewModel
                    {
                        PublicationId = publication.Id,
                        ReleaseName = "2018",
                        TimePeriodCoverage = TimeIdentifier.AcademicYear,
                        PublishScheduled = DateTime.Parse("2050/01/01"),
                        TypeId = new Guid("02e664f2-a4bc-43ee-8ff0-c87354adae72")
                    });

                Assert.Equal("Academic Year 2018/19", result.Result.Right.Title);
                Assert.Null(result.Result.Right.Published);
                Assert.False(result.Result.Right.LatestRelease); // Most recent - but not published yet.
                Assert.Equal(TimeIdentifier.AcademicYear, result.Result.Right.TimePeriodCoverage);
            }
        }
        
        [Fact]
        public void CreateReleaseWithTemplate()
        {
            var (userService, _, publishingService, repository, subjectService, tableStorageService, fileStorageService, importStatusService, footnoteService) = Mocks();

            using (var context = InMemoryApplicationDbContext("Create"))
            {
                context.Add(new ReleaseType {Id = new Guid("2a0217ca-c514-45da-a8b3-44c68a6737e8"), Title = "Ad Hoc",});
                context.Add(new Publication
                {
                    Id = new Guid("403d3c5d-a8cd-4d54-a029-0c74c86c55b2"),
                    Title = "Publication",
                    Releases = new List<Release>
                    {
                        new Release // Template release
                        {
                            Id = new Guid("26f17bad-fc48-4496-9387-d6e5b2cb0e7f"),
                            ReleaseName = "2018",
                            Content = new List<ReleaseContentSection>
                            {
                                new ReleaseContentSection
                                {
                                    ReleaseId = new Guid("26f17bad-fc48-4496-9387-d6e5b2cb0e7f"),
                                    ContentSection = new ContentSection
                                    {
                                        Id = new Guid("3cb10587-7b05-4c30-9f13-9f2025aca6a0"),
                                        Caption = "Template caption index 0", // Should be copied 
                                        Heading = "Template heading index 0", // Should be copied
                                        Type = ContentSectionType.Generic,
                                        Order = 1,
                                        Content = new List<IContentBlock>
                                        {
                                            // TODO currently is not copied - should it be?
                                            new HtmlBlock
                                            {
                                                Id = new Guid("e2b96bea-fbbb-4089-ad9c-fecba58ee054"),
                                                Body = @"<div></div>"
                                            }
                                        }
                                    }
                                },
                    
                                new ReleaseContentSection
                                {
                                    ReleaseId = new Guid("26f17bad-fc48-4496-9387-d6e5b2cb0e7f"),
                                    ContentSection = new ContentSection
                                    {
                                        Id = new Guid("8e804c94-61b3-4955-9d71-83a56d133a89"),
                                        Caption = "Template caption index 1", // Should be copied 
                                        Heading = "Template heading index 1", // Should be copied
                                        Type = ContentSectionType.Generic,
                                        Order = 2,
                                        Content = new List<IContentBlock>
                                        {
                                            // TODO currently is not copied - should it be?
                                            new InsetTextBlock
                                            {
                                                Id = new Guid("34884271-a30a-4cbd-9c08-e6d11d7f8c8e"),
                                                Body = "Text",
                                                Heading = "Heading"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                context.SaveChanges();
            }

            using (var context = InMemoryApplicationDbContext("Create"))
            {
                var releaseService = new ReleaseService(context, AdminMapper(),
                    publishingService.Object, new PersistenceHelper<ContentDbContext>(context), userService.Object, repository.Object,
                    subjectService.Object, tableStorageService.Object, fileStorageService.Object, importStatusService.Object, footnoteService.Object);
                
                // Service method under test
                var result = releaseService.CreateReleaseAsync(
                    new CreateReleaseViewModel
                    {
                        PublicationId = new Guid("403d3c5d-a8cd-4d54-a029-0c74c86c55b2"),
                        TemplateReleaseId = new Guid("26f17bad-fc48-4496-9387-d6e5b2cb0e7f"),
                        ReleaseName = "2018",
                        TimePeriodCoverage = TimeIdentifier.AcademicYear,
                        PublishScheduled = DateTime.Parse("2050/01/01"),
                        TypeId = new Guid("2a0217ca-c514-45da-a8b3-44c68a6737e8")
                    });

                // Do an in depth check of the saved release
                var release = context.Releases
                    .Include(r => r.Content)
                    .ThenInclude(join => join.ContentSection)
                    .ThenInclude(section => section.Content)
                    .Single(r => r.Id == result.Result.Right.Id);

                var contentSections = release.GenericContent.ToList();
                
                Assert.Equal(2, contentSections.Count);
                Assert.Equal("Template caption index 0", release.Content[0].ContentSection.Caption);
                Assert.Equal("Template heading index 0", release.Content[0].ContentSection.Heading);
                Assert.Equal(1, release.Content[0].ContentSection.Order);
                Assert.Empty(contentSections[0].Content); // TODO currently is not copied - should it be?

                Assert.Equal("Template caption index 1", release.Content[1].ContentSection.Caption);
                Assert.Equal("Template heading index 1", release.Content[1].ContentSection.Heading);
                Assert.Equal(2, release.Content[1].ContentSection.Order);
                Assert.Empty(contentSections[1].Content); // TODO currently is not copied - should it be?
                
                Assert.Equal(ContentSectionType.ReleaseSummary, release.SummarySection.Type);
                Assert.Equal(ContentSectionType.Headlines, release.HeadlinesSection.Type);
                Assert.Equal(ContentSectionType.KeyStatistics, release.KeyStatisticsSection.Type);
                Assert.Equal(ContentSectionType.KeyStatisticsSecondary, release.KeyStatisticsSecondarySection.Type);
            }
        }

        [Fact]
        public async void LatestReleaseCorrectlyReported()
        {
            var (userService, _, publishingService, repository, subjectService, tableStorageService, fileStorageService, importStatusService, footnoteService) = Mocks();

            var publication = new Publication
            {
                Id = Guid.NewGuid()
            };

            var notLatestRelease = new Release
            {
                Id = Guid.NewGuid(),
                ReleaseName = "2019",
                TimePeriodCoverage = TimeIdentifier.December,
                PublicationId = publication.Id,
                Published = DateTime.UtcNow
            };

            var latestRelease = new Release
            {
                Id = Guid.NewGuid(),
                ReleaseName = "2020",
                TimePeriodCoverage = TimeIdentifier.June,
                PublicationId = publication.Id,
                Published = DateTime.UtcNow
            };

            using (var context = InMemoryApplicationDbContext("LatestReleaseCorrectlyReported"))
            {
                context.Add(publication);
                context.AddRange(new List<Release>
                {
                    notLatestRelease, latestRelease
                });
                context.SaveChanges();
            }

            // Note that we use different contexts for each method call - this is to avoid misleadingly optimistic
            // loading of the entity graph as we go.
            using (var context = InMemoryApplicationDbContext("LatestReleaseCorrectlyReported"))
            {
                var releaseService = new ReleaseService(context, AdminMapper(),
                    publishingService.Object, new PersistenceHelper<ContentDbContext>(context), userService.Object, repository.Object,
                    subjectService.Object, tableStorageService.Object, fileStorageService.Object, importStatusService.Object, footnoteService.Object);
                
                // Method under test
                var notLatest = (await releaseService.GetReleaseForIdAsync(notLatestRelease.Id)).Right;
                Assert.Equal(notLatestRelease.Id, notLatest.Id);
                Assert.False(notLatest.LatestRelease);
            }
            
            using (var context = InMemoryApplicationDbContext("LatestReleaseCorrectlyReported"))
            {
                var releaseService = new ReleaseService(context, AdminMapper(),
                    publishingService.Object, new PersistenceHelper<ContentDbContext>(context), userService.Object, repository.Object,
                    subjectService.Object, tableStorageService.Object, fileStorageService.Object, importStatusService.Object, footnoteService.Object);
                
                // Method under test
                var latest = (await releaseService.GetReleaseForIdAsync(latestRelease.Id)).Right;
                Assert.Equal(latestRelease.Id, latest.Id);
                Assert.True(latest.LatestRelease);
            }
        }

        [Fact]
        public async void EditReleaseSummary()
        {
            var (userService, _, publishingService, repository, subjectService, tableStorageService, fileStorageService, importStatusService, footnoteService) = Mocks();

            var releaseId = new Guid("02c73027-3e06-4495-82a4-62b778c005a9");
            var addHocReleaseTypeId = new Guid("f3800c32-1e1c-4d42-8165-d1bcb3c8b47c");
            var officialStatisticsReleaseType = new ReleaseType
            {
                Id = new Guid("fdc4dd4c-85f7-49dd-87a4-e04446bc606f"),
                Title = "Official Statistics"
            };

            using (var context = InMemoryApplicationDbContext("LatestReleaseCorrectlyReported"))
            {
                context.AddRange(new List<ReleaseType>
                {
                    new ReleaseType
                    {
                        Id = addHocReleaseTypeId,
                        Title = "Ad Hoc"
                    },
                    officialStatisticsReleaseType
                });
                context.Add(new Publication
                {
                    Id = new Guid("f7da23e2-304a-4b47-a8f5-dba28a554de9"),
                    Releases = new List<Release>
                    {
                        new Release
                        {
                            Id = releaseId,
                            TypeId = addHocReleaseTypeId,
                            ReleaseSummary = new ReleaseSummary()
                            {
                                Id = new Guid("0071f344-4b99-4010-ab2f-62bf7b0035b0"),
                                Versions = new List<ReleaseSummaryVersion>() {
                                    new ReleaseSummaryVersion()
                                    {    
                                        Id = new Guid("25f43cba-faee-4b0a-a9d4-a3d114a5f6df"),
                                        Created = DateTime.Now,
                                        TypeId = addHocReleaseTypeId,
                                    }
                                }
                            }
                        }
                    }
                });
                context.SaveChanges();
            }
            
            var publishScheduledEdited = DateTime.Now.AddDays(1);
            var nextReleaseDateEdited = new PartialDate {Day = "1", Month = "1", Year = "2040"};
            var typeEdited = officialStatisticsReleaseType;
            const string releaseNameEdited = "2035";
            const TimeIdentifier timePeriodCoverageEdited = TimeIdentifier.March;
            
            using (var context = InMemoryApplicationDbContext("LatestReleaseCorrectlyReported"))
            {
                var releaseService = new ReleaseService(context, AdminMapper(),
                    publishingService.Object, new PersistenceHelper<ContentDbContext>(context), userService.Object, repository.Object,
                    subjectService.Object, tableStorageService.Object, fileStorageService.Object, importStatusService.Object, footnoteService.Object);
                
                // Method under test 
                var edited = await releaseService
                    .EditReleaseSummaryAsync(
                        releaseId,
                        new UpdateReleaseSummaryRequest
                        {
                            PublishScheduled = publishScheduledEdited,
                            NextReleaseDate = nextReleaseDateEdited,
                            TypeId = typeEdited.Id,
                            ReleaseName = releaseNameEdited,
                            TimePeriodCoverage = timePeriodCoverageEdited
                        });

                Assert.Equal(publishScheduledEdited, edited.Right.PublishScheduled);
                Assert.Equal(nextReleaseDateEdited, edited.Right.NextReleaseDate);
                Assert.Equal(typeEdited, edited.Right.Type);
                Assert.Equal(releaseNameEdited, edited.Right.ReleaseName);
                Assert.Equal(timePeriodCoverageEdited, edited.Right.TimePeriodCoverage);
            }
        }
        
        [Fact]
        public async void GetReleaseSummaryAsync()
        {
            var (userService, persistenceHelper, publishingService, repository, subjectService, tableStorageService, fileStorageService, importStatusService, footnoteService) = Mocks();
            
            var releaseId = new Guid("5cf345d4-7f7b-425c-8267-de785cfc040b");
            var adhocReleaseType = new ReleaseType
            {
                Id = new Guid("19b024dc-339c-4e2c-b2ca-b55e5c509ad2"),
                Title = "Ad Hoc"
            };
            var publishScheduled = DateTime.Now.AddDays(1);
            var nextReleaseDate = new PartialDate {Day = "1", Month = "1", Year = "2040"};
            const string releaseName = "2035";
            const TimeIdentifier timePeriodCoverage = TimeIdentifier.January;
            using (var context = InMemoryApplicationDbContext("GetReleaseSummaryAsync"))
            {
                context.AddRange(new List<ReleaseType>
                {
                    adhocReleaseType,
                });

                context.Add(new Publication
                {
                    Id = new Guid("f7da23e2-304a-4b47-a8f5-dba28a554de9"),
                    Releases = new List<Release>
                    {
                        new Release
                        {
                            Id = releaseId,
                            TypeId = adhocReleaseType.Id,
                            Type = adhocReleaseType,
                            TimePeriodCoverage = TimeIdentifier.January,
                            PublishScheduled = publishScheduled,
                            NextReleaseDate = nextReleaseDate,
                            ReleaseName = releaseName,
                            ReleaseSummary = new ReleaseSummary()
                            {
                                Id = new Guid("0071f344-4b99-4010-ab2f-62bf7b0035b0"),
                                Versions = new List<ReleaseSummaryVersion>() {
                                    new ReleaseSummaryVersion()
                                    {    
                                        Id = new Guid("25f43cba-faee-4b0a-a9d4-a3d114a5f6df"),
                                        Created = DateTime.Now,
                                        TypeId = adhocReleaseType.Id,
                                        Type = adhocReleaseType,
                                        PublishScheduled = publishScheduled,
                                        NextReleaseDate = nextReleaseDate,
                                        ReleaseName = releaseName,
                                        TimePeriodCoverage = timePeriodCoverage
                                    }
                                }
                            }
                        }
                    }
                });
                context.SaveChanges();
            }

            using (var context = InMemoryApplicationDbContext("GetReleaseSummaryAsync"))
            {
                var releaseService = new ReleaseService(context, AdminMapper(),
                    publishingService.Object, persistenceHelper.Object, userService.Object, repository.Object,
                    subjectService.Object, tableStorageService.Object, fileStorageService.Object, importStatusService.Object, footnoteService.Object);
                
                // Method under test 
                var summaryResult = await releaseService.GetReleaseSummaryAsync(releaseId);
                var summary = summaryResult.Right;
                
                Assert.Equal(publishScheduled, summary.PublishScheduled);
                Assert.Equal(nextReleaseDate, summary.NextReleaseDate);
                Assert.Equal(adhocReleaseType, summary.Type);
                Assert.Equal(releaseName, summary.ReleaseName);
                Assert.Equal(timePeriodCoverage, summary.TimePeriodCoverage);
            }
        }
        
        [Fact]
        public void GetLatestReleaseAsync()
        {
            var (userService, _, publishingService, repository, subjectService, tableStorageService, fileStorageService, importStatusService, footnoteService) = Mocks();

            var publication = new Publication
            {
                Id = Guid.NewGuid()
            };
            
            var notLatestRelease = new Release
            {
                Id = Guid.NewGuid(),
                Published = DateTime.UtcNow,
                PublicationId = publication.Id,
                ReleaseName = "2035",
                TimePeriodCoverage = TimeIdentifier.December
            };
            
            var latestRelease = new Release
            {
                Id = Guid.NewGuid(),
                Published = DateTime.UtcNow,
                PublicationId = publication.Id,
                ReleaseName = "2036",
                TimePeriodCoverage = TimeIdentifier.June
            };

            using (var context = InMemoryApplicationDbContext("GetReleasesForPublicationAsync"))
            {
                context.Add(new UserReleaseRole
                {
                    UserId = _userId,
                    ReleaseId = notLatestRelease.Id
                });

                context.Add(publication);
                context.AddRange(new List<Release>
                {
                    notLatestRelease, latestRelease
                });
                context.SaveChanges();
            }

            using (var context = InMemoryApplicationDbContext("GetReleasesForPublicationAsync"))
            {
                var releaseService = new ReleaseService(context, AdminMapper(),
                    publishingService.Object, new PersistenceHelper<ContentDbContext>(context), userService.Object, repository.Object,
                    subjectService.Object, tableStorageService.Object, fileStorageService.Object, importStatusService.Object, footnoteService.Object);

                // Method under test 
                var latest = releaseService.GetLatestReleaseAsync(publication.Id).Result.Right;
                Assert.NotNull(latest);
                Assert.Equal(latestRelease.Id, latest.Id);
                Assert.Equal("June 2036", latest.Title);
            }
        }

        private (
            Mock<IUserService>, 
            Mock<IPersistenceHelper<ContentDbContext>>, 
            Mock<IPublishingService>,
            Mock<IReleaseRepository>,
            Mock<ISubjectService>,
            Mock<ITableStorageService>,
            Mock<IFileStorageService>,
            Mock<IImportStatusService>,
            Mock<IFootnoteService>) Mocks()
        {
            var userService = MockUtils.AlwaysTrueUserService();

            userService
                .Setup(s => s.GetUserId())
                .Returns(_userId);

            var persistenceHelper = MockUtils.MockPersistenceHelper<ContentDbContext>();
            MockUtils.SetupCall<ContentDbContext, Release>(persistenceHelper);
            MockUtils.SetupCall<ContentDbContext, Publication>(persistenceHelper);
            
            return (
                userService, 
                persistenceHelper, 
                new Mock<IPublishingService>(), 
                new Mock<IReleaseRepository>(),
                new Mock<ISubjectService>(), 
                new Mock<ITableStorageService>(), 
                new Mock<IFileStorageService>(),
                new Mock<IImportStatusService>(),
                new Mock<IFootnoteService>());
        }
    }
}