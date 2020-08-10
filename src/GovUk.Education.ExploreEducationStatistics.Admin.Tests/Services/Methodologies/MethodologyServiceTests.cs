using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Api.Methodologies;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Methodologies;
using GovUk.Education.ExploreEducationStatistics.Common.Utils;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using Xunit;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.MapperUtils;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.ValidationTestUtil;
using static GovUk.Education.ExploreEducationStatistics.Admin.Validators.ValidationErrorMessages;
using static GovUk.Education.ExploreEducationStatistics.Content.Model.MethodologyStatus;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.Methodologies
{
    public class MethodologyServiceTests
    {
        [Fact]
        public async Task CreateAsync()
        {
            var request = new CreateMethodologyRequest
            {
                Title = "Pupil absence statistics: methodology"
            };

            await using (var context = DbUtils.InMemoryApplicationDbContext())
            {
                var viewModel = (await new MethodologyService(
                        context,
                        AdminMapper(),
                        MockUtils.AlwaysTrueUserService().Object,
                        new PersistenceHelper<ContentDbContext>(context))
                    .CreateMethodologyAsync(request)).Right;

                Assert.Null(viewModel.InternalReleaseNote);
                Assert.Null(viewModel.Published);
                Assert.Equal(Draft, viewModel.Status);
                Assert.Equal(request.Title, viewModel.Title);
            }
        }

        [Fact]
        public async Task CreateAsync_SlugNotUnique()
        {
            var request = new CreateMethodologyRequest
            {
                Title = "Pupil absence statistics: methodology"
            };

            await using (var context = DbUtils.InMemoryApplicationDbContext("CreateSlugNotUnique"))
            {
                var createResult = await new MethodologyService(
                        context,
                        AdminMapper(),
                        MockUtils.AlwaysTrueUserService().Object,
                        new PersistenceHelper<ContentDbContext>(context))
                    .CreateMethodologyAsync(request);

                Assert.True(createResult.IsRight);

                var repeatedCreateResult = await new MethodologyService(
                        context,
                        AdminMapper(),
                        MockUtils.AlwaysTrueUserService().Object,
                        new PersistenceHelper<ContentDbContext>(context))
                    .CreateMethodologyAsync(request);

                Assert.True(repeatedCreateResult.IsLeft);
                AssertValidationProblem(repeatedCreateResult.Left, SlugNotUnique);
            }
        }

        [Fact]
        public void ListAsync()
        {
            var methodology1 = new Methodology
            {
                Id = Guid.NewGuid(),
                Title = "Methodology 1",
                Status = Approved
            };

            var methodology2 = new Methodology
            {
                Id = Guid.NewGuid(),
                Title = "Methodology 2",
                Status = Draft
            };

            using (var context = DbUtils.InMemoryApplicationDbContext("List"))
            {
                context.AddRange(new List<Methodology>
                {
                    methodology1, methodology2
                });
                context.SaveChanges();
            }

            using (var context = DbUtils.InMemoryApplicationDbContext("List"))
            {
                // Method under test
                var methodologies = new MethodologyService(
                        context,
                        AdminMapper(),
                        MockUtils.AlwaysTrueUserService().Object,
                        new PersistenceHelper<ContentDbContext>(context))
                    .ListAsync().Result.Right;

                Assert.Contains(methodologies,
                    m => m.Id == methodology1.Id
                         && m.Title == methodology1.Title
                         && m.Status == methodology1.Status);

                Assert.Contains(methodologies,
                    m => m.Id == methodology2.Id
                         && m.Title == methodology2.Title
                         && m.Status == methodology2.Status);
            }
        }

        [Fact]
        public async Task GetSummaryAsync()
        {
            var methodology = new Methodology
            {
                Id = Guid.NewGuid(),
                InternalReleaseNote = "Test approval",
                Published = new DateTime(2020, 5, 25),
                Slug = "pupil-absence-statistics-methodology",
                Status = Approved,
                Title = "Pupil absence statistics: methodology"
            };

            await using (var context = DbUtils.InMemoryApplicationDbContext("GetSummary"))
            {
                context.Add(methodology);
                await context.SaveChangesAsync();
            }

            await using (var context = DbUtils.InMemoryApplicationDbContext("GetSummary"))
            {
                var viewModel = (await new MethodologyService(
                        context,
                        AdminMapper(),
                        MockUtils.AlwaysTrueUserService().Object,
                        new PersistenceHelper<ContentDbContext>(context))
                    .GetSummaryAsync(methodology.Id)).Right;

                Assert.Equal(methodology.Id, viewModel.Id);
                Assert.Equal(methodology.InternalReleaseNote, viewModel.InternalReleaseNote);
                Assert.Equal(methodology.Published, viewModel.Published);
                Assert.Equal(methodology.Status, viewModel.Status);
                Assert.Equal(methodology.Title, viewModel.Title);
            }
        }

        [Fact]
        public async Task UpdateAsync()
        {
            var methodology = new Methodology
            {
                Id = Guid.NewGuid(),
                InternalReleaseNote = "Test approval",
                Published = new DateTime(2020, 5, 25),
                Slug = "pupil-absence-statistics-methodology",
                Status = Draft,
                Title = "Pupil absence statistics: methodology"
            };

            var request = new UpdateMethodologyRequest
            {
                InternalReleaseNote = null,
                Status = Draft,
                Title = "Pupil absence statistics (updated): methodology"
            };

            await using (var context = DbUtils.InMemoryApplicationDbContext("Update"))
            {
                context.Add(methodology);
                await context.SaveChangesAsync();
            }

            await using (var context = DbUtils.InMemoryApplicationDbContext("Update"))
            {
                var viewModel = (await new MethodologyService(
                        context,
                        AdminMapper(),
                        MockUtils.AlwaysTrueUserService().Object,
                        new PersistenceHelper<ContentDbContext>(context))
                    .UpdateMethodologyAsync(methodology.Id, request)).Right;

                Assert.Equal(methodology.Id, viewModel.Id);
                // TODO EES-331 is this correct?
                // Original release note is not cleared if the update is not altering it
                Assert.Equal(methodology.InternalReleaseNote, viewModel.InternalReleaseNote);
                Assert.Equal(methodology.Published, viewModel.Published);
                Assert.Equal(request.Status, viewModel.Status);
                Assert.Equal(request.Title, viewModel.Title);
            }
        }

        [Fact]
        public async Task UpdateAsync_SlugNotUnique()
        {
            var methodology1 = new Methodology
            {
                Id = Guid.NewGuid(),
                InternalReleaseNote = "Test approval",
                Published = new DateTime(2020, 5, 25),
                Slug = "pupil-absence-statistics-methodology",
                Status = Draft,
                Title = "Pupil absence statistics: methodology"
            };

            var methodology2 = new Methodology
            {
                Id = Guid.NewGuid(),
                InternalReleaseNote = "Test approval",
                Published = new DateTime(2020, 5, 25),
                Slug = "pupil-exclusion-statistics-methodology",
                Status = Draft,
                Title = "Pupil exclusion statistics: methodology"
            };

            var request = new UpdateMethodologyRequest
            {
                InternalReleaseNote = null,
                Status = Draft,
                Title = "Pupil exclusion statistics: methodology"
            };

            await using (var context = DbUtils.InMemoryApplicationDbContext("UpdateSlugNotUnique"))
            {
                await context.AddRangeAsync(new List<Methodology>
                {
                    methodology1, methodology2
                });
                await context.SaveChangesAsync();
            }

            await using (var context = DbUtils.InMemoryApplicationDbContext("UpdateSlugNotUnique"))
            {
                var result = await new MethodologyService(
                        context,
                        AdminMapper(),
                        MockUtils.AlwaysTrueUserService().Object,
                        new PersistenceHelper<ContentDbContext>(context))
                    .UpdateMethodologyAsync(methodology1.Id, request);

                Assert.True(result.IsLeft);
                AssertValidationProblem(result.Left, SlugNotUnique);
            }
        }
    }
}