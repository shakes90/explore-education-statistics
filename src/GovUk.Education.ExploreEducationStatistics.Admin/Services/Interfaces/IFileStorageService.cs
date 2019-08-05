﻿using System.Collections.Generic;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.Models;
using Microsoft.AspNetCore.Http;
using ReleaseId = System.Guid;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces
{
    public interface IFileStorageService
    {
        Task<IEnumerable<FileInfo>> UploadDataFilesAsync(ReleaseId releaseId, IFormFile dataFile, IFormFile metaFile, string name);
        Task<IEnumerable<FileInfo>> ListFilesAsync(ReleaseId releaseId, ReleaseFileTypes type);
        Task<IEnumerable<FileInfo>> ListFilesAsync(string releaseId, ReleaseFileTypes type);

        Task<IEnumerable<FileInfo>> UploadFilesAsync(ReleaseId releaseId, IFormFile dataFile, string name, ReleaseFileTypes type);
    }
}