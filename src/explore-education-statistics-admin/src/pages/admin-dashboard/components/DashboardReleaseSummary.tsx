import ButtonLink from '@admin/components/ButtonLink';
import {
  dayMonthYearIsComplete,
  dayMonthYearToDate,
} from '@admin/services/common/types/types';
import {
  AdminDashboardRelease,
  ReleaseApprovalStatus,
} from '@admin/services/dashboard/types';
import FormattedDate from '@common/components/FormattedDate';
import SummaryList from '@common/components/SummaryList';
import SummaryListItem from '@common/components/SummaryListItem';
import React, { useContext } from 'react';
import { format } from 'date-fns';
import Details from '@common/components/Details';
import { LoginContext } from '@admin/components/Login';
import { setupRoute } from '../../../routes/releaseRoutes';

const getLiveLatestLabel = (isLive: boolean, isLatest: boolean) => {
  if (isLive && isLatest) {
    return '(Live - Latest release)';
  }
  if (isLive) {
    return '(Live)';
  }
  return undefined;
};

const getTag = (approvalStatus: ReleaseApprovalStatus) => {
  if (ReleaseApprovalStatus.ReadyToReview === approvalStatus) {
    return 'Ready to review';
  }
  return undefined;
};

interface Props {
  release: AdminDashboardRelease;
}

const DashboardReleaseSummary = ({ release }: Props) => {
  const authentication = useContext(LoginContext);

  const editorName =
    authentication.user && authentication.user.id === release.lastEditedUser.id
      ? 'me'
      : release.lastEditedUser.name;

  const releaseSummaryLabel = `${release.timePeriodCoverage.label}, ${
    release.dateRangeLabel
  } 
     ${getLiveLatestLabel(release.live, release.latestRelease)}`;

  return (
    <Details
      className="govuk-!-margin-bottom-0"
      summary={releaseSummaryLabel}
      tag={getTag(release.status)}
    >
      <ButtonLink to={setupRoute.generateLink(release.id)}>
        Edit this release
      </ButtonLink>

      <SummaryList additionalClassName="govuk-!-margin-bottom-3">
        <SummaryListItem term="Publish date">
          {dayMonthYearIsComplete(release.scheduledPublishDate) && (
            <FormattedDate>
              {dayMonthYearToDate(release.scheduledPublishDate)}
            </FormattedDate>
          )}
        </SummaryListItem>
        <SummaryListItem term="Next release date">
          {dayMonthYearIsComplete(release.nextReleaseExpectedDate) && (
            <FormattedDate>
              {dayMonthYearToDate(release.nextReleaseExpectedDate)}
            </FormattedDate>
          )}
        </SummaryListItem>
        <SummaryListItem term="Lead statistician">
          {release.leadStatistician && (
            <span>
              {release.leadStatistician.name}
              <br />
              <a href="mailto:{lead.teamEmail}">
                {release.leadStatistician.email}
              </a>
              <br />
              {release.leadStatistician.telNo}
            </span>
          )}
        </SummaryListItem>
        <SummaryListItem term="Last edited" detailsNoMargin>
          <FormattedDate>{release.lastEditedDateTime}</FormattedDate>
          {' at '}
          {format(new Date(release.lastEditedDateTime), 'HH:mm')} by{' '}
          <a href="#">{editorName}</a>
        </SummaryListItem>
      </SummaryList>
    </Details>
  );
};

export default DashboardReleaseSummary;
