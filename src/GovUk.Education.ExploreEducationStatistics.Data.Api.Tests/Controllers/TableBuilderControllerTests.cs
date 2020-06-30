using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Common.Model.Data.Query;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Controllers;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.ViewModels;
using Moq;
using Xunit;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Tests.Controllers
{
    public class TableBuilderControllerTests
    {
        private readonly TableBuilderController _controller;
        private readonly ObservationQueryContext _query = new ObservationQueryContext();
        private readonly Guid _releaseId = new Guid("03730cff-22d5-446c-8971-68921e933b50");

        public TableBuilderControllerTests()
        {
            var tableBuilderService = new Mock<ITableBuilderService>();

            tableBuilderService.Setup(s => s.Query(_releaseId, _query)).ReturnsAsync(new TableBuilderResultViewModel
            {
                Results = new List<ObservationViewModel>
                {
                    new ObservationViewModel()
                }
            });

            _controller = new TableBuilderController(tableBuilderService.Object);
        }

        [Fact]
        public async Task Query_Post()
        {
            var result = await _controller.Query(_releaseId, _query);
            Assert.IsType<TableBuilderResultViewModel>(result.Value);
        }
    }
}