import ReleaseServiceStatus from '@admin/components/ReleaseServiceStatus';
import StatusBlock from '@admin/components/StatusBlock';
import { useConfig } from '@admin/contexts/ConfigContext';
import { useManageReleaseContext } from '@admin/pages/release/contexts/ManageReleaseContext';
import ReleaseStatusEditPage from '@admin/pages/release/ReleaseStatusEditPage';
import permissionService, {
  ReleaseStatusPermissions,
} from '@admin/services/permissionService';
import releaseService from '@admin/services/releaseService';
import Button from '@common/components/Button';
import FormattedDate from '@common/components/FormattedDate';
import LoadingSpinner from '@common/components/LoadingSpinner';
import SummaryList from '@common/components/SummaryList';
import SummaryListItem from '@common/components/SummaryListItem';
import UrlContainer from '@common/components/UrlContainer';
import useAsyncHandledRetry from '@common/hooks/useAsyncHandledRetry';
import useAsyncRetry from '@common/hooks/useAsyncRetry';
import useToggle from '@common/hooks/useToggle';
import {
  formatPartialDate,
  isValidPartialDate,
} from '@common/utils/date/partialDate';
import { parseISO } from 'date-fns';
import React from 'react';

const statusMap: {
  [keyof: string]: string;
} = {
  Draft: 'In Draft',
  HigherLevelReview: 'Awaiting higher review',
  Approved: 'Approved',
};

const ReleaseStatusPage = () => {
  const [isEditing, toggleEditing] = useToggle(false);

  const { releaseId, onChangeReleaseStatus } = useManageReleaseContext();

  const { value: release, setState: setRelease } = useAsyncHandledRetry(
    () => releaseService.getRelease(releaseId),
    [isEditing],
  );

  const { value: statusPermissions } = useAsyncRetry<ReleaseStatusPermissions>(
    () => permissionService.getReleaseStatusPermissions(releaseId),
  );

  const { PublicAppUrl } = useConfig();

  if (!release) {
    return <LoadingSpinner />;
  }

  const isEditable =
    !!statusPermissions &&
    Object.values(statusPermissions).some(permission => permission);

  if (isEditing && statusPermissions) {
    return (
      <ReleaseStatusEditPage
        release={release}
        statusPermissions={statusPermissions}
        onCancel={toggleEditing.off}
        onUpdate={nextRelease => {
          setRelease({ value: nextRelease });

          toggleEditing.off();
          onChangeReleaseStatus();
        }}
      />
    );
  }

  return (
    <>
      <h2>Sign off</h2>
      <p>
        The <strong>public release</strong> will be accessible at:
      </p>

      <p>
        <UrlContainer
          data-testid="public-release-url"
          url={`${PublicAppUrl}/find-statistics/${release.publicationSlug}/${release.slug}`}
        />
      </p>

      <SummaryList>
        <SummaryListItem term="Current status">
          <StatusBlock
            text={statusMap[release.status]}
            id={`CurrentReleaseStatus-${statusMap[release.status]}`}
          />
        </SummaryListItem>
        {release.status === 'Approved' && (
          <SummaryListItem term="Release process status">
            <ReleaseServiceStatus releaseId={releaseId} />
          </SummaryListItem>
        )}
        <SummaryListItem term="Scheduled release">
          {release.publishScheduled ? (
            <FormattedDate>{parseISO(release.publishScheduled)}</FormattedDate>
          ) : (
            'Not scheduled'
          )}
        </SummaryListItem>
        <SummaryListItem term="Next release expected">
          {isValidPartialDate(release.nextReleaseDate) ? (
            <time>{formatPartialDate(release.nextReleaseDate)}</time>
          ) : (
            'Not set'
          )}
        </SummaryListItem>
      </SummaryList>

      {isEditable && (
        <Button className="govuk-!-margin-top-2" onClick={toggleEditing.on}>
          Edit release status
        </Button>
      )}
    </>
  );
};

export default ReleaseStatusPage;
