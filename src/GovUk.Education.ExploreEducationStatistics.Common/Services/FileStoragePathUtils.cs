using System;
using System.Text.RegularExpressions;
using GovUk.Education.ExploreEducationStatistics.Common.Extensions;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using static GovUk.Education.ExploreEducationStatistics.Common.Model.FileType;

namespace GovUk.Education.ExploreEducationStatistics.Common.Services
{
    public static class FileStoragePathUtils
    {
        public const string BatchesDir = "batches";

        public static string PublicContentStagingPath()
        {
            return "staging";
        }

        private static string PublicContentDownloadPath(string prefix = null)
        {
            return $"{AppendPathSeparator(prefix)}download";
        }

        private static string PublicContentFastTrackPath(string prefix = null)
        {
            return $"{AppendPathSeparator(prefix)}fast-track";
        }

        private static string PublicContentMethodologiesPath(string prefix = null)
        {
            return $"{AppendPathSeparator(prefix)}methodology";
        }

        private static string PublicContentPublicationsPath(string prefix = null)
        {
            return $"{AppendPathSeparator(prefix)}publications";
        }

        public static string PublicContentDownloadTreePath(string prefix = null)
        {
            return $"{PublicContentDownloadPath(prefix)}/tree.json";
        }

        public static string PublicContentReleaseFastTrackPath(string releaseId, string prefix = null)
        {
            return $"{PublicContentFastTrackPath(prefix)}/{releaseId}";
        }

        public static string PublicContentFastTrackPath(string releaseId, string id, string prefix = null)
        {
            return $"{PublicContentReleaseFastTrackPath(releaseId, prefix)}/{id}.json";
        }

        public static string PublicContentMethodologyTreePath(string prefix = null)
        {
            return $"{PublicContentMethodologiesPath(prefix)}/tree.json";
        }

        public static string PublicContentPublicationsTreePath(string prefix = null)
        {
            return $"{PublicContentPublicationsPath(prefix)}/tree.json";
        }

        public static string PublicContentMethodologyPath(string slug, string prefix = null)
        {
            return $"{PublicContentMethodologiesPath(prefix)}/methodologies/{slug}.json";
        }

        public static string PublicContentPublicationParentPath(string slug, string prefix = null)
        {
            return $"{PublicContentPublicationsPath(prefix)}/{slug}";
        }

        public static string PublicContentReleaseParentPath(string publicationSlug, string releaseSlug, string prefix = null)
        {
            return $"{PublicContentPublicationParentPath(publicationSlug, prefix)}/releases/{releaseSlug}";
        }

        public static string PublicContentPublicationPath(string slug, string prefix = null)
        {
            return $"{PublicContentPublicationParentPath(slug, prefix)}/publication.json";
        }

        public static string PublicContentLatestReleasePath(string slug, string prefix = null)
        {
            return $"{PublicContentPublicationParentPath(slug, prefix)}/latest-release.json";
        }

        public static string PublicContentReleasePath(string publicationSlug, string releaseSlug, string prefix = null)
        {
            return $"{PublicContentPublicationParentPath(publicationSlug, prefix)}/releases/{releaseSlug}.json";
        }

        public static string PublicContentDataBlockPath(
            string publicationSlug,
            string releaseSlug,
            Guid dataBlockId,
            string prefix = null)
        {
            return $"{PublicContentReleaseParentPath(publicationSlug, releaseSlug, prefix)}/data-blocks/{dataBlockId}.json";
        }

        /**
         * The top level admin directory path where files on a release are stored.
         */
        private static string AdminReleaseDirectoryPath(string releaseId)
        {
            return $"{releaseId}/";
        }

        /**
         * The admin directory path where files, of a particular type, on a release are stored.
         */
        public static string AdminReleaseDirectoryPath(string releaseId, FileType type)
        {
            return $"{AdminReleaseDirectoryPath(releaseId)}{GetUploadFolderForType(type).GetEnumLabel()}/";
        }

        private static FileType GetUploadFolderForType(FileType type)
        {
            return type == Metadata ? Data : type;
        }

        /**
         * The admin directory path where data files are batched for importing
         */
        public static string AdminReleaseBatchesDirectoryPath(Guid releaseId)
        {
            return AdminReleaseBatchesDirectoryPath(releaseId.ToString());
        }

        /**
         * The admin directory path where data files are batched for importing
         */
        public static string AdminReleaseBatchesDirectoryPath(string releaseId)
        {
            return $"{AdminReleaseDirectoryPath(releaseId)}{Data.GetEnumLabel()}/{BatchesDir}/";
        }

        /**
         * The admin file path, for a file of a particular type and name, on a release.
         */
        public static string AdminReleasePath(string releaseId, FileType type, string fileName)
        {
            return $"{AdminReleaseDirectoryPath(releaseId, type)}{fileName}";
        }

        /**
         * The top level admin directory path where files on a release are stored.
         */
        public static string AdminReleaseDirectoryPath(Guid releaseId) =>
            AdminReleaseDirectoryPath(releaseId.ToString());

        /**
         * The admin file path, for a file of a particular type and id, on a release.
         */
        public static string AdminReleasePath(Guid releaseId, FileType type, Guid fileId)
            => AdminReleasePath(releaseId.ToString(), type, fileId.ToString());

        /**
         * The admin file path, for a file of a particular type and name, on a release.
         */
        public static string AdminReleasePath(Guid releaseId, FileType type, string fileName)
            => AdminReleasePath(releaseId.ToString(), type, fileName);

        /**
         * The admin directory path where files, of a particular type, on a release are stored.
         */
        public static string AdminReleaseDirectoryPath(Guid releaseId, FileType type) =>
            AdminReleaseDirectoryPath(releaseId.ToString(), type);

        /**
         * The public file path, for a file of a particular type and id, on a release.
         */
        public static string PublicReleasePath(string publicationSlug, string releaseSlug, FileType type,
            Guid fileId)
        {
            return $"{PublicReleaseDirectoryPath(publicationSlug, releaseSlug, type)}{fileId}";
        }

        /**
         * The public file path, for a file of a particular type and name, on a release.
         */
        public static string PublicReleasePath(string publicationSlug, string releaseSlug, FileType type,
            string fileName)
        {
            return $"{PublicReleaseDirectoryPath(publicationSlug, releaseSlug, type)}{fileName}";
        }

        /**
         * The public directory path where files, of a particular type, on a release are stored.
         */
        public static string PublicReleaseDirectoryPath(string publicationSlug, string releaseSlug,
            FileType type)
        {
            return $"{PublicReleaseDirectoryPath(publicationSlug, releaseSlug)}{type.GetEnumLabel()}/";
        }

        /**
         * The top level public directory path where files on a release are stored.
         */
        public static string PublicReleaseDirectoryPath(string publicationSlug, string releaseSlug)
        {
            return $"{publicationSlug}/{releaseSlug}/";
        }

        /**
         * The public file path of the "All files" zip file on a release.
         */
        public static string PublicReleaseAllFilesZipPath(string publicationSlug, string releaseSlug)
        {
            return
                $"{PublicReleaseDirectoryPath(publicationSlug, releaseSlug, Ancillary)}{publicationSlug}_{releaseSlug}.zip";
        }

        /**
         * Given a Release ID and a data file's original filename, this method will check to see if the fullFilePath
         * given represents a batch file for that data file.
         */
        public static bool IsBatchFileForDataFile(Guid releaseId, string originalDataFileName, string fullFilePath)
        {
            var folderPath = Regex.Escape(AdminReleaseBatchesDirectoryPath(releaseId));
            var dataFileName = Regex.Escape(originalDataFileName);
            var batchFileRegex = new Regex(@$"^{folderPath}{dataFileName}_\d{{6}}$");

            return batchFileRegex.IsMatch(fullFilePath);
        }

        private static string AppendPathSeparator(string segment = null)
        {
            return segment == null ? "" : segment + "/";
        }
    }
}