using System;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Common.Services;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Publisher.Model;
using Microsoft.Azure.Storage.Queue;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using static GovUk.Education.ExploreEducationStatistics.Publisher.Model.PublisherQueues;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Services
{
    public class PublishingService : IPublishingService
    {
        private readonly ContentDbContext _context;
        private readonly string _storageConnectionString;

        private readonly ILogger _logger;

        public PublishingService(ContentDbContext contentDbContext,
            IConfiguration config,
            ILogger<PublishingService> logger
        )
        {
            _context = contentDbContext;
            _storageConnectionString = config.GetValue<string>("PublisherStorage");
            _logger = logger;
        }

        public async Task QueueValidateReleaseAsync(Guid releaseId)
        {
            var release = await GetRelease(releaseId);
            var queue = await QueueUtils.GetQueueReferenceAsync(_storageConnectionString, ValidateReleaseQueue);
            var message = BuildValidateReleaseMessage(release);
            await queue.AddMessageAsync(ToCloudQueueMessage(message));

            _logger.LogTrace($"Sent release status message for release: {releaseId}");
        }

        private Task<Release> GetRelease(Guid releaseId)
        {
            return _context.Releases
                .AsNoTracking()
                .SingleAsync(release => release.Id == releaseId);
        }

        private static ValidateReleaseMessage BuildValidateReleaseMessage(Release release)
        {
            return new ValidateReleaseMessage
            {
                Immediate = false,
                ReleaseId = release.Id
            };
        }

        private static CloudQueueMessage ToCloudQueueMessage(object value)
        {
            return new CloudQueueMessage(JsonConvert.SerializeObject(value));
        }
    }
}