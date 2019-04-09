import { NextContext } from 'next';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Accordion from 'src/components/Accordion';
import AccordionSection from 'src/components/AccordionSection';
import Details from 'src/components/Details';
import FormattedDate from 'src/components/FormattedDate';
import GoToTopLink from 'src/components/GoToTopLink';
import Link from 'src/components/Link';
import Page from 'src/components/Page';
import PageTitle from 'src/components/PageTitle';
import { baseUrl } from 'src/services/api';
import publicationService, { Release } from 'src/services/publicationService';
import ContentBlock from './components/ContentBlock';
import { DataBlock } from './components/DataBlock';

interface Props {
  publication: string;
  release: string;
  data: Release;
}

class PublicationReleasePage extends Component<Props> {
  public static async getInitialProps({
    query,
  }: NextContext<{
    publication: string;
    release: string;
  }>) {
    const { publication, release } = query;

    const request = release
      ? publicationService.getPublicationRelease(release)
      : publicationService.getLatestPublicationRelease(publication);

    const data = await request;

    return {
      data,
      publication,
      release,
    };
  }

  public render() {
    const { data, release } = this.props;

    const releaseCount =
      data.publication.releases.slice(1).length +
      data.publication.legacyReleases.length;

    return (
      <Page
        breadcrumbs={[
          { name: 'Find statistics and data', link: '/statistics' },
          { name: data.title },
        ]}
      >
        {!release && (
          <strong className="govuk-tag govuk-!-margin-bottom-2">
            {' '}
            This is the latest data{' '}
          </strong>
        )}

        <PageTitle title={data.title} />

        <dl className="dfe-meta-content">
          <dt className="govuk-caption-m">Published: </dt>
          <dd>
            <strong>
              <FormattedDate>{data.published}</FormattedDate>
            </strong>
          </dd>
        </dl>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <ReactMarkdown className="govuk-body" source={data.summary} />

            <Details summary="Download underlying data files">
              <ul className="govuk-list">
                <li>
                  <a
                    href={`${baseUrl.data}/downloads/${
                      data.publication.slug
                    }/csv/`}
                    className="govuk-link"
                  >
                    Download .csv files
                  </a>
                </li>
                <li>
                  <a href={baseUrl.data} className="govuk-link">
                    Access API
                  </a>
                </li>
              </ul>
            </Details>
          </div>

          <div className="govuk-grid-column-one-third">
            <aside className="app-related-items">
              <h3 id="subsection-title">About these statistics</h3>

              <h4 data-testid="release-period">
                <span className="govuk-caption-m">For school year: </span>
                {data.releaseName} {!release && <span>(latest data)</span>}
                <Details summary={`See previous ${releaseCount} releases`}>
                  <ul
                    className="govuk-list"
                    data-testid="previous-releases-list"
                  >
                    {data.publication.releases
                      .slice(1)
                      .map(({ id, slug, releaseName }) => (
                        <li key={id} data-testid="item-internal">
                          <Link
                            to={`/statistics/${data.publication.slug}/${slug}`}
                          >
                            {releaseName}
                          </Link>
                        </li>
                      ))}
                    {data.publication.legacyReleases.map(
                      ({ id, description, url }) => (
                        <li key={id} data-testid="item-external">
                          <a href={url}>{description}</a>
                        </li>
                      ),
                    )}
                  </ul>
                </Details>
              </h4>

              <h4 data-testid="last-updated">
                <span className="govuk-caption-m">Last updated: </span>
                <FormattedDate>{data.updates[0].on}</FormattedDate>

                <Details summary={`See all ${data.updates.length} updates`}>
                  {data.updates.map(elem => (
                    <div data-testid="last-updated-element" key={elem.on}>
                      <FormattedDate className="govuk-body govuk-!-font-weight-bold">
                        {elem.on}
                      </FormattedDate>
                      <p>{elem.reason}</p>
                    </div>
                  ))}
                </Details>
              </h4>

              <h4 data-testid="next-update">
                <span className="govuk-caption-m">Next update:</span>
                <FormattedDate>{data.publication.nextUpdate}</FormattedDate>

                <span className="govuk-caption-m">
                  <Link
                    unvisited
                    to={`/subscriptions?publication=${data.publication.slug}`}
                    as={`/subscriptions/${data.publication.slug}`}
                    data-testid={`subsciptions-${data.publication.slug}`}
                  >
                    Notify me
                  </Link>
                </span>
              </h4>
            </aside>
          </div>
        </div>

        <hr />

        <h2>Latest headline facts and figures - {data.releaseName}</h2>

        {data.keyStatistics && <DataBlock {...data.keyStatistics} />}

        {data.content.length > 0 && (
          <>
            <h2 className="govuk-heading-l" data-testid="contents">
              Contents
            </h2>

            <Accordion id="contents-sections">
              {data.content.map(({ heading, caption, order, content }) => (
                <AccordionSection
                  heading={heading}
                  caption={caption}
                  key={order}
                >
                  <ContentBlock content={content} />
                </AccordionSection>
              ))}
            </Accordion>
          </>
        )}

        <h2
          className="govuk-heading-m govuk-!-margin-top-9"
          data-testid="extra-information"
        >
          Extra information
        </h2>

        <Accordion id="extra-information-sections">
          <AccordionSection
            heading="Where does this data come from"
            caption="How we collect and process the data"
            headingTag="h3"
          >
            <ul className="govuk-list">
              <li>
                <a href="#">How do we collect it?</a>
              </li>
              <li>
                <a href="#">What do we do with it?</a>
              </li>
              <li>
                <a href="#">Related policies</a>
              </li>
            </ul>
          </AccordionSection>
          <AccordionSection heading="Feedback and questions" headingTag="h3">
            <ul className="govuk-list">
              <li>
                <a href="#">Feedback on this page</a>
              </li>
              <li>
                <a href="#">Make a suggestion</a>
              </li>
              <li>
                <a href="#">Ask a question</a>
              </li>
            </ul>
          </AccordionSection>
          <AccordionSection heading="Contact us" headingTag="h3">
            <h4>Media enquiries</h4>
            <address className="govuk-body dfe-font-style-normal">
              Press Office News Desk
              <br />
              Department for Education <br />
              Sanctuary Buildings <br />
              Great Smith Street <br />
              London
              <br />
              SW1P 3BT <br />
              Telephone: 020 7783 8300
            </address>

            <h4>Other enquiries</h4>
            <address className="govuk-body dfe-font-style-normal">
              Data Insight and Statistics Division
              <br />
              Level 1<br />
              Department for Education
              <br />
              Sanctuary Buildings <br />
              Great Smith Street
              <br />
              London
              <br />
              SW1P 3BT <br />
              Telephone: 020 7783 8300
              <br />
              Email:{' '}
              <a href="mailto:Schools.statistics@education.co.uk">
                Schools.statistics@education.gov.uk
              </a>
            </address>
          </AccordionSection>
        </Accordion>

        <h2 className="govuk-heading-m govuk-!-margin-top-9">
          Exploring the data
        </h2>

        <p>
          The statistics can be viewed as reports, or you can customise and
          download as excel or .csv files . The data can also be accessed via an
          API. <a href="#">What is an API?</a>
        </p>

        <Link
          to={`/table-tool/${data.publication.slug}`}
          className="govuk-button"
        >
          Create charts and tables
        </Link>

        <GoToTopLink />
      </Page>
    );
  }
}

export default PublicationReleasePage;
