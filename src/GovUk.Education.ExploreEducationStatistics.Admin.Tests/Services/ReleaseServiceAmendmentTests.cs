using System;
using System.Collections.Generic;
using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Admin.Services;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Common.Services;
using GovUk.Education.ExploreEducationStatistics.Common.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Common.Services.Interfaces.Security;
using GovUk.Education.ExploreEducationStatistics.Common.Tests.Utils;
using GovUk.Education.ExploreEducationStatistics.Common.Utils;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.DbUtils;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.MapperUtils;
using static GovUk.Education.ExploreEducationStatistics.Data.Model.Database.StatisticsDbUtils;
using Publication = GovUk.Education.ExploreEducationStatistics.Content.Model.Publication;
using Release = GovUk.Education.ExploreEducationStatistics.Content.Model.Release;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services
{
    public class ReleaseServiceAmendmentTests
    {
        private readonly Guid _userId = Guid.NewGuid();

        [Fact]
        public void CreateReleaseAmendmentAsync()
        {
            var releaseId = Guid.NewGuid();
            var releaseType = new ReleaseType
            {
                Id = Guid.NewGuid(),
                Title = "Official Statistics"
            };
            var publicationId = Guid.NewGuid();
            var publishedDate = DateTime.UtcNow.Subtract(TimeSpan.FromDays(1));
            var createdDate = DateTime.UtcNow.Subtract(TimeSpan.FromDays(2));
            var previousVersionReleaseId = Guid.NewGuid();
            var version = 2;
            var createdById = Guid.NewGuid();
            var createdBy = new User
            {
                Id = createdById
            };
            var internalReleaseNote = "Release note";
            var releaseStatus = ReleaseStatus.Approved;
            var publishScheduled = DateTime.Now.AddDays(1);
            var nextReleaseDate = new PartialDate {Day = "1", Month = "1", Year = "2040"};
            var releaseName = "2035";
            var timePeriodCoverage = TimeIdentifier.March;

            var dataBlock1 = new DataBlock
            {
                Id = Guid.NewGuid(),
                Name = "Data Block 1",
                Order = 2,
                Comments = new List<Comment>
                {
                    new Comment
                    {
                        Id = Guid.NewGuid(),
                        Content = "Comment 1 Text"
                    },
                    new Comment
                    {
                        Id = Guid.NewGuid(),
                        Content = "Comment 2 Text"
                    }
                }
            };

            var dataBlock2 = new DataBlock
            {
                Id = Guid.NewGuid(),
                Name = "Data Block 2"
            };

            var release = new Release
            {
                Id = releaseId,
                Type = releaseType,
                TypeId = releaseType.Id,
                PublishScheduled = publishScheduled,
                NextReleaseDate = nextReleaseDate,
                ReleaseName = releaseName,
                TimePeriodCoverage = timePeriodCoverage,
                PublicationId = publicationId,
                Published = publishedDate,
                Status = releaseStatus,
                Version = version,
                PreviousVersionId = previousVersionReleaseId,
                Created = createdDate,
                CreatedBy = createdBy,
                CreatedById = createdById,
                InternalReleaseNote = internalReleaseNote,
                RelatedInformation = new List<Link>
                {
                    new Link
                    {
                        Id = Guid.NewGuid(),
                        Description = "Link 1",
                        Url = "URL 1"
                    },
                    new Link
                    {
                        Id = Guid.NewGuid(),
                        Description = "Link 2",
                        Url = "URL 2"
                    }
                },
                Updates = new List<Update>
                {
                    new Update
                    {
                        Id = Guid.NewGuid(),
                        On = DateTime.UtcNow.Subtract(TimeSpan.FromDays(4)),
                        Reason = "Reason 1",
                        ReleaseId = releaseId
                    },
                    new Update
                    {
                        Id = Guid.NewGuid(),
                        On = DateTime.UtcNow.Subtract(TimeSpan.FromDays(5)),
                        Reason = "Reason 2",
                        ReleaseId = releaseId
                    }
                },
                Content = new List<ReleaseContentSection>
                {
                    new ReleaseContentSection
                    {
                        ReleaseId = Guid.NewGuid(),
                        ContentSection = new ContentSection
                        {
                            Id = Guid.NewGuid(),
                            Caption = "Template caption index 0",
                            Heading = "Template heading index 0",
                            Type = ContentSectionType.Generic,
                            Order = 1,
                            Content = new List<ContentBlock>
                            {
                                new HtmlBlock
                                {
                                    Id = Guid.NewGuid(),
                                    Body = @"<div></div>",
                                    Order = 1,
                                    Comments = new List<Comment>
                                    {
                                        new Comment
                                        {
                                            Id = Guid.NewGuid(),
                                            Content = "Comment 1 Text"
                                        },
                                        new Comment
                                        {
                                            Id = Guid.NewGuid(),
                                            Content = "Comment 2 Text"
                                        }
                                    }
                                },
                                dataBlock1
                            }
                        }
                    },

                    new ReleaseContentSection
                    {
                        ReleaseId = Guid.NewGuid(),
                        ContentSection = new ContentSection
                        {
                            Id = Guid.NewGuid(),
                            Caption = "Template caption index 1",
                            Heading = "Template heading index 1",
                            Type = ContentSectionType.Generic,
                            Order = 2,
                            Content = new List<ContentBlock>
                            {
                                new MarkDownBlock
                                {
                                    Id = Guid.NewGuid(),
                                    Body = "Text",
                                    Comments = new List<Comment>
                                    {
                                        new Comment
                                        {
                                            Id = Guid.NewGuid(),
                                            Content = "Inset Comment 1 Text"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    new ReleaseContentSection
                    {
                        ReleaseId = Guid.NewGuid(),
                        ContentSection = new ContentSection
                        {
                            Id = Guid.NewGuid(),
                            Caption = "Template caption index 2",
                            Heading = "Template heading index 2",
                            Type = ContentSectionType.Headlines,
                            Order = 1,
                            Content = new List<ContentBlock>
                            {
                                new MarkDownBlock
                                {
                                    Id = Guid.NewGuid(),
                                    Body = "Text",
                                    Comments = new List<Comment>
                                    {
                                        new Comment
                                        {
                                            Id = Guid.NewGuid(),
                                            Content = "Inset Comment 1 Text"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

                ContentBlocks = new List<ReleaseContentBlock>
                {
                    new ReleaseContentBlock
                    {
                        ReleaseId = releaseId,
                        ContentBlock = dataBlock1,
                        ContentBlockId = dataBlock1.Id,
                    },
                    new ReleaseContentBlock
                    {
                        ReleaseId = releaseId,
                        ContentBlock = dataBlock2,
                        ContentBlockId = dataBlock2.Id,
                    }
                }
            };

            var approverReleaseRole = new UserReleaseRole
            {
                Id = Guid.NewGuid(),
                UserId = Guid.NewGuid(),
                Role = ReleaseRole.Approver,
                Release = release,
                ReleaseId = releaseId
            };

            var contributorReleaseRole = new UserReleaseRole
            {
                Id = Guid.NewGuid(),
                UserId = Guid.NewGuid(),
                Role = ReleaseRole.Contributor,
                Release = release,
                ReleaseId = releaseId
            };

            var userReleaseRoles = new List<UserReleaseRole>
            {
                approverReleaseRole,
                contributorReleaseRole
            };

            var dataFile1 = new File
            {
                Id = Guid.NewGuid(),
                Filename = "Filename 1",
                Release = release,
                ReleaseId = releaseId,
                SubjectId = Guid.NewGuid()
            };

            var dataFile2 = new File
            {
                Id = Guid.NewGuid(),
                Filename = "Filename 2",
                Release = release,
                ReleaseId = releaseId,
                SubjectId = Guid.NewGuid()
            };

            var releaseFiles = new List<ReleaseFile>
            {
                new ReleaseFile
                {
                    Id = Guid.NewGuid(),
                    Release = release,
                    ReleaseId = releaseId,
                    File = dataFile1,
                    FileId = dataFile1.Id
                },
                new ReleaseFile
                {
                    Id = Guid.NewGuid(),
                    Release = release,
                    ReleaseId = releaseId,
                    File = dataFile2,
                    FileId = dataFile2.Id
                }
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

            using (var contentDbContext = InMemoryApplicationDbContext("CreateReleaseAmendment"))
            {
                contentDbContext.AddRange(new List<ReleaseType>
                {
                    releaseType
                });

                contentDbContext.Add(new Publication
                {
                    Id = publicationId,
                    Releases = new List<Release>
                    {
                        release
                    }
                });

                contentDbContext.Add(createdBy);
                contentDbContext.Add(new User
                {
                    Id = _userId
                });
                contentDbContext.AddRange(userReleaseRoles);
                contentDbContext.AddRange(releaseFiles);

                contentDbContext.SaveChanges();
            }

            using (var statisticsDbContext = InMemoryStatisticsDbContext("CreateReleaseAmendment"))
            {
                statisticsDbContext.Release.Add(new Data.Model.Release
                {
                    Id = release.Id,
                    PublicationId = release.PublicationId,
                    Published = release.Published,
                    Slug = release.Slug,
                    Year = release.Year,
                    TimeIdentifier = release.TimePeriodCoverage
                });

                statisticsDbContext.Subject.AddRange(subject1, subject2);

                statisticsDbContext.ReleaseSubject.AddRange(
                    new ReleaseSubject
                    {
                        ReleaseId = releaseId,
                        SubjectId = subject1.Id
                    },
                    new ReleaseSubject
                    {
                        ReleaseId = releaseId,
                        SubjectId = subject2.Id
                    }
                );

                statisticsDbContext.SaveChanges();
            }

            var newReleaseId = Guid.Empty;

            var footnoteService = new Mock<IFootnoteService>();

            footnoteService
                .Setup(service => service.CopyFootnotes(releaseId, It.IsAny<Guid>()))
                .ReturnsAsync(new Either<ActionResult, List<Footnote>>(new List<Footnote>()));

            using (var contentDbContext = InMemoryApplicationDbContext("CreateReleaseAmendment"))
            using (var statisticsDbContext = InMemoryStatisticsDbContext("CreateReleaseAmendment"))
            {
                var releaseService = BuildReleaseService(
                    contentDbContext,
                    statisticsDbContext,
                    footnoteService: footnoteService.Object
                );

                // Method under test
                var amendmentViewModel = releaseService.CreateReleaseAmendmentAsync(releaseId).Result.Right;

                footnoteService.Verify(
                    mock => mock.CopyFootnotes(releaseId, amendmentViewModel.Id), Times.Once);

                footnoteService.VerifyNoOtherCalls();

                Assert.NotEqual(release.Id, amendmentViewModel.Id);
                Assert.NotEqual(Guid.Empty, amendmentViewModel.Id);
                newReleaseId = amendmentViewModel.Id;
            }

            using (var contentDbContext = InMemoryApplicationDbContext("CreateReleaseAmendment"))
            {
                var amendment = contentDbContext
                    .Releases
                    .Include(r => r.PreviousVersion)
                    .Include(r => r.Type)
                    .Include(r => r.CreatedBy)
                    .Include(r => r.Publication)
                    .Include(r => r.Content)
                    .ThenInclude(c => c.ContentSection)
                    .ThenInclude(c => c.Content)
                    .ThenInclude(c => c.Comments)
                    .Include(r => r.Updates)
                    .Include(r => r.ContentBlocks)
                    .ThenInclude(r => r.ContentBlock)
                    .First(r => r.Id == newReleaseId);

                // check fields that should be set to new values for an amendment, rather than copied from its original
                // Release
                Assert.Equal(newReleaseId, amendment.Id);
                Assert.Null(amendment.PublishScheduled);
                Assert.Null(amendment.Published);
                Assert.Equal(release.Version + 1, amendment.Version);
                Assert.Equal(ReleaseStatus.Draft, amendment.Status);
                Assert.Equal(release.Id, amendment.PreviousVersion?.Id);
                Assert.Equal(release.Id, amendment.PreviousVersionId);
                Assert.Equal(_userId, amendment.CreatedBy.Id);
                Assert.Equal(_userId, amendment.CreatedById);
                Assert.InRange(DateTime.UtcNow.Subtract(amendment.Created).Milliseconds, 0, 1500);
                Assert.Null(amendment.InternalReleaseNote);

                Assert.Equal(releaseType, amendment.Type);
                Assert.Equal(releaseType.Id, amendment.TypeId);
                Assert.Equal(nextReleaseDate, amendment.NextReleaseDate);
                Assert.Equal(releaseName, amendment.ReleaseName);
                Assert.Equal(timePeriodCoverage, amendment.TimePeriodCoverage);
                Assert.Equal(publicationId, amendment.PublicationId);

                Assert.Equal(release.RelatedInformation.Count, amendment.RelatedInformation.Count);
                amendment.RelatedInformation.ForEach(amended =>
                {
                    var index = amendment.RelatedInformation.IndexOf(amended);
                    var previous = release.RelatedInformation[index];
                    AssertAmendedLinkCorrect(amended, previous);
                });

                Assert.Equal(release.Updates.Count, amendment.Updates.Count);
                amendment.Updates.ForEach(amended =>
                {
                    var index = amendment.Updates.IndexOf(amended);
                    var previous = release.Updates[index];
                    AssertAmendedUpdateCorrect(amended, previous, amendment);
                });

                Assert.Equal(release.Content.Count, amendment.Content.Count);
                amendment.Content.ForEach(amended =>
                {
                    var index = amendment.Content.IndexOf(amended);
                    var previous = release.Content[index];
                    AssertAmendedContentSectionCorrect(amendment, amended, previous);
                });

                Assert.Equal(release.ContentBlocks.Count, amendment.ContentBlocks.Count);
                var amendmentContentBlock1 = amendment.ContentBlocks[0].ContentBlock;
                var amendmentContentBlock2 = amendment.ContentBlocks[1].ContentBlock;
                var amendmentContentBlock1InContent = amendment.Content[0].ContentSection.Content[0];

                // Check that the DataBlock that is included in this Release amendment's Content is successfully
                // identified as the exact same DataBlock that is attached to the Release amendment through the
                // additional "Release.ContentBlocks" relationship (which is used to determine which Data Blocks
                // belong to which Release when a Data Block has not yet been - or is removed from - the Release's
                // Content
                Assert.NotEqual(dataBlock1.Id, amendmentContentBlock1.Id);
                Assert.Equal(amendmentContentBlock1, amendmentContentBlock1InContent);

                // and check that the Data Block that is not yet included in any content is copied across OK still
                Assert.NotEqual(dataBlock2.Id, amendmentContentBlock2.Id);
                Assert.Equal((amendmentContentBlock2 as DataBlock).Name, dataBlock2.Name);

                var amendmentReleaseRoles = contentDbContext
                    .UserReleaseRoles
                    .Where(r => r.ReleaseId == amendment.Id)
                    .ToList();

                Assert.Equal(userReleaseRoles.Count, amendmentReleaseRoles.Count);
                var approverAmendmentRole = amendmentReleaseRoles.First(r => r.Role == ReleaseRole.Approver);
                AssertAmendedReleaseRoleCorrect(approverReleaseRole, approverAmendmentRole, amendment);

                var contributorAmendmentRole = amendmentReleaseRoles.First(r => r.Role == ReleaseRole.Contributor);
                Assert.NotEqual(contributorReleaseRole.Id, contributorAmendmentRole.Id);
                AssertAmendedReleaseRoleCorrect(contributorReleaseRole, contributorAmendmentRole, amendment);

                var amendmentDataFiles = contentDbContext
                    .ReleaseFiles
                    .Include(f => f.File)
                    .Where(f => f.ReleaseId == amendment.Id)
                    .ToList();

                Assert.Equal(releaseFiles.Count, amendmentDataFiles.Count);

                var amendmentDataFile = amendmentDataFiles[0];
                var originalFile = releaseFiles.First(f =>
                    f.File.Filename == amendmentDataFile.File.Filename);
                AssertAmendedReleaseFileCorrect(originalFile, amendmentDataFile, amendment);

                var amendmentDataFile2 = amendmentDataFiles[1];
                var originalFile2 = releaseFiles.First(f =>
                    f.File.Filename == amendmentDataFile2.File.Filename);
                AssertAmendedReleaseFileCorrect(originalFile2, amendmentDataFile2, amendment);

                Assert.True(amendment.Amendment);
            }

            using (var statisticsDbContext = InMemoryStatisticsDbContext("CreateReleaseAmendment"))
            {
                var releaseSubjectLinks = statisticsDbContext
                    .ReleaseSubject
                    .Where(r => r.ReleaseId == newReleaseId)
                    .ToList();

                Assert.Equal(2, releaseSubjectLinks.Count);
                Assert.Contains(subject1.Id, releaseSubjectLinks.Select(r => r.SubjectId));
                Assert.Contains(subject2.Id, releaseSubjectLinks.Select(r => r.SubjectId));
            }
        }

        private static void AssertAmendedLinkCorrect(Link amended, Link previous)
        {
            Assert.True(amended.Id != Guid.Empty);
            Assert.NotEqual(previous.Id, amended.Id);
            Assert.Equal(previous.Description, amended.Description);
            Assert.Equal(previous.Url, amended.Url);
        }

        private static void AssertAmendedUpdateCorrect(Update amended, Update previous, Release amendment)
        {
            Assert.True(amended.Id != Guid.Empty);
            Assert.NotEqual(previous.Id, amended.Id);
            Assert.Equal(previous.On, amended.On);
            Assert.Equal(previous.Reason, amended.Reason);
            Assert.Equal(amendment, amended.Release);
            Assert.Equal(amendment.Id, amended.ReleaseId);
        }

        private static void AssertAmendedContentSectionCorrect(Release amendment, ReleaseContentSection amended,
            ReleaseContentSection previous)
        {
            Assert.Equal(amendment, amended.Release);
            Assert.Equal(amendment.Id, amended.ReleaseId);
            Assert.True(amended.ContentSectionId != Guid.Empty);
            Assert.NotEqual(previous.ContentSectionId, amended.ContentSectionId);

            var previousSection = previous.ContentSection;
            var amendedSection = amended.ContentSection;

            Assert.NotEqual(previousSection.Id, amendedSection.Id);
            Assert.Equal(previousSection.Caption, amendedSection.Caption);
            Assert.Equal(previousSection.Heading, amendedSection.Heading);
            Assert.Equal(previousSection.Order, amendedSection.Order);
            Assert.Equal(previousSection.Type, amendedSection.Type);
            Assert.Equal(previousSection.Content.Count, amendedSection.Content.Count);

            amendedSection.Content.ForEach(amendedBlock =>
            {
                var previousBlock = previousSection.Content.Find(b => b.Order == amendedBlock.Order);
                AssertAmendedContentBlockCorrect(previousBlock, amendedBlock, amendedSection);
            });
        }

        private static void AssertAmendedContentBlockCorrect(ContentBlock previousBlock, ContentBlock amendedBlock,
            ContentSection amendedSection)
        {
            Assert.NotEqual(previousBlock.Id, amendedBlock.Id);
            Assert.Equal(previousBlock.Order, amendedBlock.Order);
            Assert.Equal(amendedSection, amendedBlock.ContentSection);
            Assert.Equal(amendedSection.Id, amendedBlock.ContentSectionId);
            Assert.NotEmpty(previousBlock.Comments);
            Assert.Empty(amendedBlock.Comments);
        }

        private static void AssertAmendedReleaseRoleCorrect(UserReleaseRole previous, UserReleaseRole amended,
            Release amendment)
        {
            Assert.NotEqual(previous.Id, amended.Id);
            Assert.Equal(amendment, amended.Release);
            Assert.Equal(amendment.Id, amended.ReleaseId);
            Assert.Equal(previous.UserId, amended.UserId);
            Assert.Equal(previous.Role, amended.Role);
        }

        private static void AssertAmendedReleaseFileCorrect(ReleaseFile originalFile, ReleaseFile amendmentDataFile,
            Release amendment)
        {
            // assert it's a new link table entry between the Release amendment and the data file reference
            Assert.NotEqual(originalFile.Id, amendmentDataFile.Id);
            Assert.Equal(amendment, amendmentDataFile.Release);
            Assert.Equal(amendment.Id, amendmentDataFile.ReleaseId);

            // and assert that the file referenced is the SAME file reference as linked from the original Release's
            // link table entry
            Assert.Equal(originalFile.File.Id, amendmentDataFile.File.Id);
        }

        private Mock<IUserService> UserServiceMock()
        {
            var userService = MockUtils.AlwaysTrueUserService();

            userService
                .Setup(s => s.GetUserId())
                .Returns(_userId);

            return userService;
        }

        private ReleaseService BuildReleaseService(
            ContentDbContext contentDbContext,
            StatisticsDbContext statisticsDbContext,
            IPublishingService publishingService = null,
            IPersistenceHelper<ContentDbContext> persistenceHelper = null,
            IUserService userService = null,
            IReleaseRepository repository = null,
            ISubjectService subjectService = null,
            ITableStorageService coreTableStorageService = null,
            IReleaseDataFileService releaseDataFileService = null,
            IReleaseFileService releaseFileService = null,
            IImportStatusService importStatusService = null,
            IFootnoteService footnoteService = null,
            IDataBlockService dataBlockService = null,
            IReleaseSubjectService releaseSubjectService = null,
            IReleaseChecklistService releaseChecklistService = null,
            IGuidGenerator guidGenerator = null)
        {
            return new ReleaseService(
                contentDbContext,
                AdminMapper(),
                publishingService ?? new Mock<IPublishingService>().Object,
                persistenceHelper ?? new PersistenceHelper<ContentDbContext>(contentDbContext),
                userService ?? UserServiceMock().Object,
                repository ?? new Mock<IReleaseRepository>().Object,
                subjectService ?? new Mock<ISubjectService>().Object,
                coreTableStorageService ?? new Mock<ITableStorageService>().Object,
                releaseDataFileService ?? new Mock<IReleaseDataFileService>().Object,
                releaseFileService ?? new Mock<IReleaseFileService>().Object,
                importStatusService ?? new Mock<IImportStatusService>().Object,
                footnoteService ?? new Mock<IFootnoteService>().Object,
                statisticsDbContext ?? statisticsDbContext,
                dataBlockService ?? new Mock<IDataBlockService>().Object,
                releaseChecklistService ?? new Mock<IReleaseChecklistService>().Object,
                releaseSubjectService ?? new Mock<IReleaseSubjectService>().Object,
                guidGenerator ?? new SequentialGuidGenerator()
            );
        }
    }
}