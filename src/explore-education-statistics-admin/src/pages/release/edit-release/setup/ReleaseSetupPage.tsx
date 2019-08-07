import Link from '@admin/components/Link';
import DummyReferenceData from '@admin/pages/DummyReferenceData';
import { setupEditRoute } from '@admin/routes/edit-release/routes';
import {
  dayMonthYearIsComplete,
  dayMonthYearToDate,
} from '@admin/services/common/types';
import service from '@admin/services/release/edit-release/setup/service';
import { ReleaseSetupDetails } from '@admin/services/release/types';
import FormattedDate from '@common/components/FormattedDate';
import SummaryList from '@common/components/SummaryList';
import SummaryListItem from '@common/components/SummaryListItem';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import ReleasePageTemplate from '../components/ReleasePageTemplate';

interface MatchProps {
  releaseId: string;
}

const ReleaseSetupPage = ({ match }: RouteComponentProps<MatchProps>) => {
  const { releaseId } = match.params;

  const [releaseSetupDetails, setReleaseSetupDetails] = useState<
    ReleaseSetupDetails
  >();

  useEffect(() => {
    service.getReleaseSetupDetails(releaseId).then(setReleaseSetupDetails);
  }, [releaseId]);

  const getSelectedTimePeriodCoverageLabel = (timePeriodCoverageCode: string) =>
    DummyReferenceData.findTimePeriodCoverageOption(timePeriodCoverageCode)
      .label;

  return (
    <>
      {releaseSetupDetails && (
        <ReleasePageTemplate
          releaseId={releaseId}
          publicationTitle={releaseSetupDetails.publicationTitle}
        >
          <SummaryList>
            <SummaryListItem term="Publication title">
              {releaseSetupDetails.publicationTitle}
            </SummaryListItem>
            <SummaryListItem term="Time period">
              {getSelectedTimePeriodCoverageLabel(
                releaseSetupDetails.timePeriodCoverageCode,
              )}
            </SummaryListItem>
            <SummaryListItem term="Release period">
              <time>{releaseSetupDetails.timePeriodCoverageStartYear}</time> to{' '}
              <time>{releaseSetupDetails.timePeriodCoverageStartYear + 1}</time>
            </SummaryListItem>
            <SummaryListItem term="Lead statistician">
              {releaseSetupDetails.leadStatisticianName}
            </SummaryListItem>
            <SummaryListItem term="Scheduled release">
              {dayMonthYearIsComplete(
                releaseSetupDetails.scheduledPublishDate,
              ) && (
                <FormattedDate>
                  {dayMonthYearToDate(releaseSetupDetails.scheduledPublishDate)}
                </FormattedDate>
              )}
            </SummaryListItem>
            <SummaryListItem term="Next release expected">
              {dayMonthYearIsComplete(
                releaseSetupDetails.nextReleaseExpectedDate,
              ) && (
                <FormattedDate>
                  {dayMonthYearToDate(
                    releaseSetupDetails.nextReleaseExpectedDate,
                  )}
                </FormattedDate>
              )}
            </SummaryListItem>
            <SummaryListItem term="Release type">
              {releaseSetupDetails.releaseType.title}
            </SummaryListItem>
            <SummaryListItem
              term=""
              actions={
                <Link to={setupEditRoute.generateLink(releaseId)}>
                  Edit release setup details
                </Link>
              }
            />
          </SummaryList>
        </ReleasePageTemplate>
      )}
    </>
  );
};

export default ReleaseSetupPage;