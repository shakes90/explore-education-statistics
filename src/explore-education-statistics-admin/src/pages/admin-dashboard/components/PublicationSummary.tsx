import ButtonLink from '@admin/components/ButtonLink';
import Link from '@admin/components/Link';
import ThemeAndTopicContext from '@admin/components/ThemeAndTopicContext';
import ReleaseSummary from '@admin/pages/admin-dashboard/components/ReleaseSummary';
import { getReleaseSummaryLabel } from '@admin/pages/release/util/releaseSummaryUtil';
import releaseRoutes, { summaryRoute } from '@admin/routes/edit-release/routes';
import { AdminDashboardPublication } from '@admin/services/dashboard/types';
import service from '@admin/services/release/create-release/service';
import withErrorControl, {
  ErrorControlProps,
} from '@admin/validation/withErrorControl';
import Button from '@common/components/Button';
import SummaryList from '@common/components/SummaryList';
import SummaryListItem from '@common/components/SummaryListItem';
import { formatTestId } from '@common/util/test-utils';
import React, { useContext } from 'react';
import LazyLoad from 'react-lazyload';
import LoadingSpinner from '@common/components/LoadingSpinner';
import { RouteComponentProps, withRouter } from 'react-router';

export interface Props {
  publication: AdminDashboardPublication;
}

const PublicationSummary = ({
  publication,
  history,
  handleApiErrors,
}: Props & RouteComponentProps & ErrorControlProps) => {
  const { selectedThemeAndTopic } = useContext(ThemeAndTopicContext);
  return (
    <>
      <SummaryList>
        <SummaryListItem term="Methodology" smallKey>
          {publication.methodology && (
            <Link to={`/methodologies/${publication.methodology.id}`}>
              {publication.methodology.title}
            </Link>
          )}
          {publication.externalMethodology &&
            publication.externalMethodology.url && (
              <>
                {publication.externalMethodology.title} (
                <a
                  href={publication.externalMethodology.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publication.externalMethodology.url}
                </a>
                )
              </>
            )}
          {!publication.methodology &&
            (!publication.externalMethodology ||
              !publication.externalMethodology.url) && (
              <>No methodology assigned</>
            )}
        </SummaryListItem>
        <SummaryListItem term="Releases" smallKey>
          <LazyLoad placeholder={<LoadingSpinner />} once>
            <ul className="govuk-list dfe-admin">
              {publication.releases.map(release => (
                <li key={release.id}>
                  <ReleaseSummary
                    release={release}
                    actions={
                      <>
                        <ButtonLink
                          to={summaryRoute.generateLink(
                            publication.id,
                            release.id,
                          )}
                          testId={formatTestId(
                            `Edit release link for ${
                              publication.title
                            }, ${getReleaseSummaryLabel(release)}`,
                          )}
                        >
                          {release.permissions.canUpdateRelease
                            ? 'Edit this release'
                            : 'View this release'}
                        </ButtonLink>

                        {release.permissions.canUpdateRelease && (
                          <Button
                            onClick={() =>
                              service
                                .createReleaseAmendment(release.id)
                                .then(amendment =>
                                  history.push(
                                    summaryRoute.generateLink(
                                      publication.id,
                                      amendment.id,
                                    ),
                                  ),
                                )
                                .catch(handleApiErrors)
                            }
                          >
                            Amend this release
                          </Button>
                        )}
                      </>
                    }
                  />
                </li>
              ))}
              {publication.releases.length < 1 && <>No releases created</>}
            </ul>
          </LazyLoad>
        </SummaryListItem>
      </SummaryList>
      <SummaryList>
        <SummaryListItem term="" smallKey>
          {publication.permissions.canCreateReleases && (
            <ButtonLink
              to={releaseRoutes.createReleaseRoute.generateLink(publication.id)}
              className="govuk-!-margin-right-6"
              testId={`Create new release link for ${publication.title}`}
            >
              Create new release
            </ButtonLink>
          )}
          <ButtonLink
            to={`/theme/${selectedThemeAndTopic.theme.id}/topic/${selectedThemeAndTopic.topic.id}/publication/${publication.id}/assign-methodology`}
            className="govuk-button--secondary"
          >
            {!publication.methodology &&
            (!publication.externalMethodology ||
              !publication.externalMethodology.url)
              ? 'Add'
              : 'Edit'}{' '}
            methodology
          </ButtonLink>
        </SummaryListItem>
      </SummaryList>
    </>
  );
};

export default withErrorControl(withRouter(PublicationSummary));
