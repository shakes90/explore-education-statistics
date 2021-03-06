﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Publisher.Model;
using GovUk.Education.ExploreEducationStatistics.Publisher.Services.Interfaces;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using static GovUk.Education.ExploreEducationStatistics.Publisher.Model.PublisherQueues;
using static GovUk.Education.ExploreEducationStatistics.Publisher.Model.ReleaseStatusFilesStage;

namespace GovUk.Education.ExploreEducationStatistics.Publisher.Functions
{
    // ReSharper disable once UnusedType.Global
    public class PublishReleaseFilesFunction
    {
        private readonly IPublishingService _publishingService;
        private readonly IQueueService _queueService;
        private readonly IReleaseStatusService _releaseStatusService;

        public PublishReleaseFilesFunction(IPublishingService publishingService,
            IQueueService queueService,
            IReleaseStatusService releaseStatusService)
        {
            _publishingService = publishingService;
            _queueService = queueService;
            _releaseStatusService = releaseStatusService;
        }

        /// <summary>
        /// Azure function which publishes the files for a Release by copying them between storage accounts.
        /// </summary>
        /// <remarks>
        /// Triggers publishing statistics data for the Release if publishing is immediate.
        /// Triggers generating staged content for the Release if publishing is not immediate.
        /// </remarks>
        /// <param name="message"></param>
        /// <param name="executionContext"></param>
        /// <param name="logger"></param>
        /// <returns></returns>
        [FunctionName("PublishReleaseFiles")]
        // ReSharper disable once UnusedMember.Global
        public async Task PublishReleaseFiles(
            [QueueTrigger(PublishReleaseFilesQueue)]
            PublishReleaseFilesMessage message,
            ExecutionContext executionContext,
            ILogger logger)
        {
            logger.LogInformation($"{executionContext.FunctionName} triggered: {message}");

            var immediate = await IsImmediate(message);
            var published = new List<(Guid ReleaseId, Guid ReleaseStatusId)>();
            foreach (var (releaseId, releaseStatusId) in message.Releases)
            {
                await UpdateStage(releaseId, releaseStatusId, Started);
                try
                {
                    _publishingService.PublishReleaseFilesAsync(releaseId).Wait();
                    published.Add((releaseId, releaseStatusId));
                }
                catch (Exception e)
                {
                    logger.LogError(e, $"Exception occured while executing {executionContext.FunctionName}");
                    logger.LogError(e.StackTrace);

                    await UpdateStage(releaseId, releaseStatusId, Failed,
                        new ReleaseStatusLogMessage($"Exception in files stage: {e.Message}"));
                }
            }

            try
            {
                if (immediate)
                {
                    await _queueService.QueuePublishReleaseDataMessagesAsync(published);
                }
                else
                {
                    await _queueService.QueueGenerateReleaseContentMessageAsync(published);
                }

                foreach (var (releaseId, releaseStatusId) in published)
                {
                    await UpdateStage(releaseId, releaseStatusId, Complete);
                }
            }
            catch (Exception e)
            {
                logger.LogError(e, $"Exception occured while executing {executionContext.FunctionName}");
                logger.LogError(e.StackTrace);
            }

            logger.LogInformation($"{executionContext.FunctionName} completed");
        }

        private async Task<bool> IsImmediate(PublishReleaseFilesMessage message)
        {
            if (message.Releases.Count() > 1)
            {
                // If there's more than one Release this invocation couldn't have been triggered for immediate publishing
                return false;
            }

            var (releaseId, releaseStatusId) = message.Releases.Single();
            return await _releaseStatusService.IsImmediate(releaseId, releaseStatusId);
        }

        private async Task UpdateStage(Guid releaseId, Guid releaseStatusId, ReleaseStatusFilesStage stage,
            ReleaseStatusLogMessage logMessage = null)
        {
            await _releaseStatusService.UpdateFilesStageAsync(releaseId, releaseStatusId, stage, logMessage);
        }
    }
}