import permissionService from '@admin/services/permissionService';
import releaseDataFileService from '@admin/services/releaseDataFileService';
import LoadingSpinner from '@common/components/LoadingSpinner';
import useAsyncRetry from '@common/hooks/useAsyncRetry';
import React from 'react';
import DataFileUploadForm from './data-uploads/DataFileUploadForm';
import DataFileUploadsList from './data-uploads/DataFileUploadsList';

interface Props {
  releaseId: string;
}

const ReleaseDataUploadsSection = ({ releaseId }: Props) => {
  const {
    value: state,
    isLoading,
    retry: reloadFiles,
  } = useAsyncRetry(async () => {
    const [dataFiles, canUpdateRelease] = await Promise.all([
      releaseDataFileService.getReleaseDataFiles(releaseId),
      permissionService.canUpdateRelease(releaseId),
    ]);
    return { releaseId, dataFiles, canUpdateRelease };
  }, [releaseId]);

  return (
    <LoadingSpinner loading={isLoading}>
      {state && (
        <>
          <DataFileUploadForm {...state} reloadFiles={reloadFiles} />
          <DataFileUploadsList {...state} reloadFiles={reloadFiles} />
        </>
      )}
    </LoadingSpinner>
  );
};

export default ReleaseDataUploadsSection;
