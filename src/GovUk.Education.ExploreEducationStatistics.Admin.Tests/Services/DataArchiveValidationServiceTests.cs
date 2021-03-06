using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using GovUk.Education.ExploreEducationStatistics.Admin.Services;
using GovUk.Education.ExploreEducationStatistics.Common.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services
{
    public class DataArchiveValidationServiceTests
    {
        [Fact]
        public void UploadedZippedDatafileIsValid()
        {
            var (fileTypeService, blobStorageService) = Mocks();

            var service = new DataArchiveValidationService(blobStorageService.Object, fileTypeService.Object);
            var archive = CreateFormFileFromResource("data-zip-valid.zip");

            fileTypeService
                .Setup(s => s.HasMatchingMimeType(archive, It.IsAny<IEnumerable<Regex>>()))
                .ReturnsAsync(() => true);
            fileTypeService
                .Setup(s => s.HasMatchingEncodingType(archive, It.IsAny<IEnumerable<string>>()))
                .Returns(() => true);

            var result = service.ValidateDataArchiveFile(Guid.NewGuid(), archive).Result;

            Assert.True(result.IsRight);
        }

        [Fact]
        public void UploadedZippedDatafileIsInvalid()
        {
            var (fileTypeService, blobStorageService) = Mocks();

            var service = new DataArchiveValidationService(blobStorageService.Object, fileTypeService.Object);
            var archive = CreateFormFileFromResource("data-zip-invalid.zip");

            fileTypeService
                .Setup(s => s.HasMatchingMimeType(archive, It.IsAny<IEnumerable<Regex>>()))
                .ReturnsAsync(() => true);
            fileTypeService
                .Setup(s => s.HasMatchingEncodingType(archive, It.IsAny<IEnumerable<string>>()))
                .Returns(() => true);

            var result = service.ValidateDataArchiveFile(Guid.NewGuid(), archive).Result;

            Assert.True(result.IsLeft);
            Assert.IsAssignableFrom<BadRequestObjectResult>(result.Left);
            var details = (ValidationProblemDetails) ((BadRequestObjectResult) result.Left).Value;
            Assert.Equal("DATA_ZIP_FILE_DOES_NOT_CONTAIN_CSV_FILES", details.Errors[""].First());
        }

        private (Mock<IFileTypeService>, Mock<IBlobStorageService>) Mocks()
        {
            return (
                new Mock<IFileTypeService>(),
                new Mock<IBlobStorageService>()
            );
        }

        private static IFormFile CreateFormFileFromResource(string fileName)
        {
            var filePath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location),
                "Resources" + Path.DirectorySeparatorChar + fileName);

            var formFile = new Mock<IFormFile>();
            formFile
                .Setup(f => f.OpenReadStream())
                .Returns(() => File.OpenRead(filePath));

            formFile
                .Setup(f => f.FileName)
                .Returns(() => fileName);

            return formFile.Object;
        }
    }
}