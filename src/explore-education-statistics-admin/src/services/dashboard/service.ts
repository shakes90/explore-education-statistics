import { UserDetails } from '@admin/services/common/types';
import {
  publicationPolyfilla,
  releasePolyfilla,
} from '@admin/services/dashboard/polyfillas';
import client from '@admin/services/util/service';

import {
  AdminDashboardPublication,
  AdminDashboardRelease,
  ThemeAndTopics,
} from './types';

const service = {
  getMyThemesAndTopics(): Promise<ThemeAndTopics[]> {
    return client.get<ThemeAndTopics[]>('/me/themes');
  },
  getMyPublicationsByTopic(
    topicId: string,
  ): Promise<AdminDashboardPublication[]> {
    return client
      .get<AdminDashboardPublication[]>('/me/publications', {
        params: { topicId },
      })
      .then(publications => publications || [])
      .then(publications => publications.map(publicationPolyfilla));
  },
  getDraftReleases(): Promise<AdminDashboardRelease[]> {
    return client
      .get<AdminDashboardRelease[]>('/releases/draft')
      .then(releases => releases.map(releasePolyfilla));
  },
  getScheduledReleases(): Promise<AdminDashboardRelease[]> {
    return client
      .get<AdminDashboardRelease[]>('/releases/scheduled')
      .then(releases => releases.map(releasePolyfilla));
  },
  getAvailablePreReleaseContacts(): Promise<UserDetails[]> {
    return client.get<UserDetails[]>('/prerelease/contacts');
  },
  getPreReleaseContactsForRelease(releaseId: string): Promise<UserDetails[]> {
    return client.get<UserDetails[]>(
      `/release/${releaseId}/prerelease-contacts`,
    );
  },
  addPreReleaseContactToRelease(
    releaseId: string,
    preReleaseContactId: string,
  ): Promise<UserDetails[]> {
    return client.post<UserDetails[]>(
      `/release/${releaseId}/prerelease-contact/${preReleaseContactId}`,
    );
  },
  removePreReleaseContactFromRelease(
    releaseId: string,
    preReleaseContactId: string,
  ): Promise<UserDetails[]> {
    return client.delete<UserDetails[]>(
      `/release/${releaseId}/prerelease-contact/${preReleaseContactId}`,
    );
  },
};

export default service;
