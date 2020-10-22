import AccordionSection from '@common/components/AccordionSection';
import Details from '@common/components/Details';
import RelatedInformation from '@common/components/RelatedInformation';
import themeService, { DownloadTheme } from '@common/services/themeService';
import Link from '@frontend/components/Link';
import Page from '@frontend/components/Page';
import PageSearchFormWithAnalytics from '@frontend/components/PageSearchFormWithAnalytics';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Accordion from '@common/components/Accordion';
import { logEvent } from '@frontend/services/googleAnalyticsService';
import PublicationDownloadList from './components/PublicationDownloadList';

interface Props {
  themes: DownloadTheme[];
}

const DownloadIndexPage: NextPage<Props> = ({ themes = [] }) => {
  return (
    <Page title="Download latest data files" breadcrumbLabel="Download">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <p className="govuk-body-l">
            Find the latest data files behind our range of national and regional
            statistics for your own analysis.
          </p>
          <p className="govuk-body">
            Previous release data can be found on their respective release
            pages.
          </p>
          <PageSearchFormWithAnalytics
            inputLabel="Search the latest data files behind our range of national and
              regional statistics for your own analysis."
          />
        </div>
        <div className="govuk-grid-column-one-third">
          <RelatedInformation>
            <ul className="govuk-list">
              <li>
                <Link to="/find-statistics">Find statistics and data</Link>
              </li>
              <li>
                <Link to="/glossary">Education statistics: glossary</Link>
              </li>
              <li>
                <Link to="/methodology">Education statistics: methodology</Link>
              </li>
            </ul>
          </RelatedInformation>
        </div>
      </div>

      {themes.length > 0 ? (
        <Accordion
          id="downloads"
          onSectionOpen={accordionSection => {
            logEvent(
              'Download index page',
              'Accordion opened',
              accordionSection.title,
            );
          }}
        >
          {themes.map(
            ({
              id: themeId,
              title: themeTitle,
              summary: themeSummary,
              topics,
            }) => (
              <AccordionSection
                key={themeId}
                heading={themeTitle}
                caption={themeSummary}
              >
                {topics.map(
                  ({ id: topicId, title: topicTitle, publications }) => (
                    <Details key={topicId} summary={topicTitle}>
                      <PublicationDownloadList publications={publications} />
                    </Details>
                  ),
                )}
              </AccordionSection>
            ),
          )}
        </Accordion>
      ) : (
        <div className="govuk-inset-text">No data currently published.</div>
      )}
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const themes = await themeService.getDownloadThemes();

  return {
    props: {
      themes,
    },
  };
};

export default DownloadIndexPage;
