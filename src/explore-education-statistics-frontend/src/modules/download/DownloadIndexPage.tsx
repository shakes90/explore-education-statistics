import { contentApi } from '@common/services/api';
import Link from '@frontend/components/Link';
import Page from '@frontend/components/Page';
import PageTitle from '@frontend/components/PageTitle';
import React, { Component } from 'react';
import Accordion from '@common/components/Accordion';
import AccordionSection from '@common/components/AccordionSection';
import Details from '@common/components/Details';
import SearchForm from '@common/components/SearchForm';
import PublicationDownloadList from './components/PublicationDownloadList';
import { Topic } from './components/TopicList';

interface Props {
  themes: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    topics: Topic[];
  }[];
}

class DownloadIndexPage extends Component<Props> {
  public static defaultProps = {
    themes: [],
  };

  public static async getInitialProps() {
    const themes = await contentApi.get('/Content/tree');
    return { themes };
  }

  public render() {
    const { themes } = this.props;
    return (
      <Page
        breadcrumbs={[
          {
            link: '/download',
            name: 'Download',
          },
        ]}
      >
        <PageTitle title="Download data files" />
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-body-l">
              Find the data files behind our range of national and regional
              statistics for your own analysis.
            </p>
            <SearchForm />
          </div>
          <div className="govuk-grid-column-one-third">
            <aside className="app-related-items">
              <h2 className="govuk-heading-m" id="releated-content">
                Related content
              </h2>
              <nav role="navigation" aria-labelledby="subsection-title">
                <ul className="govuk-list">
                  <li>
                    <Link to="/statistics">Find statistics and data</Link>
                  </li>
                  <li>
                    <Link to="/glossary">Education statistics: glossary</Link>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>

        {themes.length > 0 ? (
          <Accordion id="themesDownloads">
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
                        <div className="govuk-!-margin-top-0 govuk-!-padding-top-0">
                          <ul className="govuk-bulllet-list govuk-!-margin-bottom-9">
                            <PublicationDownloadList
                              publications={publications}
                            />
                          </ul>
                        </div>
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
  }
}

export default DownloadIndexPage;
