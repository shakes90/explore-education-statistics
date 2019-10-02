using System.Collections.Generic;
using GovUk.Education.ExploreEducationStatistics.Content.Api.Controllers;
using GovUk.Education.ExploreEducationStatistics.Content.Api.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Content.Model.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using Xunit;

namespace GovUk.Education.ExploreEducationStatistics.Content.Api.Tests.Controllers
{
    public class DownloadControllerTests
    {
        [Fact]
        public void Get_DownloadTree_Returns_Ok()
        {
            var cache = new Mock<IContentCacheService>();

            cache.Setup(s => s.GetDownloadTreeAsync()).ReturnsAsync(
                JsonConvert.SerializeObject(new List<ThemeTree>
                {
                    new ThemeTree
                    {
                        Title = "Theme A"
                    }, 
                    new ThemeTree {
                        Title = "Theme B"
                    }, 
                }
            ));

            var controller = new DownloadController(cache.Object);

            var result = controller.GetDownloadTree();

            var content = result.Result.Result as ContentResult;

            Assert.IsAssignableFrom<List<ThemeTree>>(JsonConvert.DeserializeObject<List<ThemeTree>>(content.Content));
            Assert.Contains("Theme A", content.Content);
            Assert.Contains("Theme B", content.Content);

        }

        [Fact]
        public void Get_DownloadTree_Returns_NoContent()
        {
            var cache = new Mock<IContentCacheService>();

            cache.Setup(s => s.GetDownloadTreeAsync()).ReturnsAsync(
                (string) null
            );

            var controller = new DownloadController(cache.Object);

            var result = controller.GetDownloadTree();

            Assert.IsAssignableFrom<NoContentResult>(result.Result.Result);
        }
    }
}