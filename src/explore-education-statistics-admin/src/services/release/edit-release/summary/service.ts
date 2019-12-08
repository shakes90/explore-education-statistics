import { ReleaseSummaryDetails } from '@admin/services/release/types';
import { UpdateReleaseSummaryDetailsRequest } from '@admin/services/release/edit-release/summary/types';
import client from '@admin/services/util/service';

const service = {
  getReleaseSummaryDetails(releaseId: string): Promise<ReleaseSummaryDetails> {
    return client.get<ReleaseSummaryDetails>(`/releases/${releaseId}/summary`);
  },
  updateReleaseSummaryDetails(
    updateRequest: UpdateReleaseSummaryDetailsRequest,
  ): Promise<void> {
    return client.put(
      `/releases/${updateRequest.releaseId}/summary`,
      updateRequest,
    );
  },
};

export default service;
