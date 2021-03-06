using System;
using System.Net;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Common.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Controllers;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Models;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Services.Interfaces;
using GovUk.Education.ExploreEducationStatistics.Data.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Storage;
using Newtonsoft.Json;
using static GovUk.Education.ExploreEducationStatistics.Common.BlobContainerNames;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Services
{
    public class PermalinkService : IPermalinkService
    {
        private readonly ITableBuilderService _tableBuilderService;
        private readonly IBlobStorageService _blobStorageService;
        private readonly ISubjectService _subjectService;
        private readonly IReleaseService _releaseService;
        private readonly IMapper _mapper;

        public PermalinkService(ITableBuilderService tableBuilderService,
            IBlobStorageService blobStorageService,
            ISubjectService subjectService,
            IReleaseService releaseService,
            IMapper mapper)
        {
            _tableBuilderService = tableBuilderService;
            _blobStorageService = blobStorageService;
            _subjectService = subjectService;
            _releaseService = releaseService;
            _mapper = mapper;
        }

        public async Task<Either<ActionResult, PermalinkViewModel>> GetAsync(Guid id)
        {
            try
            {
                var text = await _blobStorageService.DownloadBlobText(PublicPermalinkContainerName, id.ToString());
                var permalink = JsonConvert.DeserializeObject<Permalink>(text);
                return await BuildViewModel(permalink);
            }
            catch (StorageException e)
                when ((HttpStatusCode) e.RequestInformation.HttpStatusCode == HttpStatusCode.NotFound)
            {
                return new NotFoundResult();
            }
        }

        public async Task<Either<ActionResult, PermalinkViewModel>> CreateAsync(CreatePermalinkRequest request)
        {
            var publicationId = _subjectService.GetPublicationForSubject(request.Query.SubjectId).Result.Id;
            var release = _releaseService.GetLatestPublishedRelease(publicationId);

            if (release == null)
            {
                return new NotFoundResult();
            }

            return await CreateAsync(release.Id, request);
        }

        public async Task<Either<ActionResult, PermalinkViewModel>> CreateAsync(Guid releaseId,
            CreatePermalinkRequest request)
        {
            return await _tableBuilderService.Query(releaseId, request.Query).OnSuccess(async result =>
            {
                var permalink = new Permalink(request.Configuration, result, request.Query);
                await _blobStorageService.UploadText(containerName: PublicPermalinkContainerName,
                    path: permalink.Id.ToString(),
                    content: JsonConvert.SerializeObject(permalink),
                    contentType: MediaTypeNames.Application.Json);
                return await BuildViewModel(permalink);
            });
        }

        private async Task<PermalinkViewModel> BuildViewModel(Permalink permalink)
        {
            var subject = await _subjectService.Get(permalink.Query.SubjectId);
            var isValid = subject != null && await _subjectService.IsSubjectForLatestPublishedRelease(subject.Id);

            var publication = await _subjectService.FindPublicationForSubject(permalink.Query.SubjectId);

            var viewModel = _mapper.Map<PermalinkViewModel>(permalink);

            viewModel.Query.PublicationId = publication?.Id;
            viewModel.Invalidated = !isValid;

            return viewModel;
        }
    }
}