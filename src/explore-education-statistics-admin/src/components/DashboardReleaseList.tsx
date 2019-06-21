import DashboardRelease from '@admin/components/DashboardRelease';
import Link from '@admin/components/Link';
import React from 'react';
import { Release } from '@admin/services/publicationService';

export interface DashboardReleaseListProps {
  releases: Release[];
}

const DashboardReleaseList = ({ releases }: DashboardReleaseListProps) => (
  <>
    <dl className="govuk-summary-list">
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key dfe-summary-list__key--small">
          Releases
        </dt>
        <dd className="govuk-summary-list__value">
          <ul className="govuk-list dfe-admin">
            {releases.map(release => {
              return (
                <>
                  <li>
                    <DashboardRelease
                      releaseName={release.releaseName}
                      timePeriodCoverage={release.timePeriodCoverage.label}
                      approvalStatus={release.status.approvalStatus}
                      review={release.meta.review}
                      lastEdited={release.status.lastEdited}
                      lastEditor={release.status.lastEditor}
                      published={release.status.published}
                      nextRelease={release.status.nextRelease}
                      dataType={release.meta.dataType.title}
                      showComments={release.meta.showComments}
                      editing={release.meta.editing}
                      isLatest={release.status.isLatest}
                      isLive={release.status.isLive}
                      isNew={release.status.isNew}
                      lead={release.meta.lead}
                    />
                  </li>
                </>
              );
            })}
          </ul>
        </dd>
      </div>
    </dl>
    <Link to="/prototypes/release-create-new" className="govuk-button">
      Create a new release
    </Link>
  </>
);

export default DashboardReleaseList;
