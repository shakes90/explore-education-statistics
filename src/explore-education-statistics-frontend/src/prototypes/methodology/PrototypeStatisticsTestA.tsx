import Accordion from '@common/components/Accordion';
import AccordionSection from '@common/components/AccordionSection';
import Link from '@frontend/components/Link';
import PrototypePage from '@frontend/prototypes/components/PrototypePage';
import React from 'react';

const BrowseReleasesPage = () => {
  return (
    <PrototypePage
      breadcrumbs={[
        {
          link: '/prototypes/methodology-home',
          text: 'Methodology',
        },
      ]}
    >
      <h1 className="govuk-heading-xl">Find statistics and download data</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <p className="govuk-body-l">
            Browse to find the statistics and data you’re looking for and open
            the section to get links to:
          </p>
          <ul className="govuk-bulllet-list govuk-!-margin-bottom-9">
            <li>
              up-to-date national statistical headlines, breakdowns and
              explanations
            </li>
            <li>
              charts and tables to help you compare, contrast and view national
              and regional statistical data and trends
            </li>
            <li>
              our table tool to build your own tables online and explore our
              range of national and regional data
            </li>
            <li>
              links to underlying data so you can download files and carry out
              your own statistical analysis
            </li>
          </ul>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside className="app-related-items">
            <h2 className="govuk-heading-m" id="releated-content">
              Related content
            </h2>
            <nav role="navigation" aria-labelledby="subsection-title">
              <ul className="govuk-list">
                <li>
                  <Link to="/prototypes/methodology-home">
                    Education statistics: methodology
                  </Link>
                </li>
                <li>
                  <Link to="https://eesadminprototype.z33.web.core.windows.net/prototypes/documentation/glossary">
                    Education statistics: glossary
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      <Accordion id="early-years">
        <AccordionSection heading="Early years">
          <h3>Attainment and outcomes</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Childcare and early years</strong> - These statistics are
              not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Early years foundation stage profile</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Parental responsibility measures</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Special educational needs (SEN)</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <h3>Finance</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <h3>Institutions</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Childcare and early years</strong> - These statistics are
              not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <h3>Participants and characteristics</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Childcare and early years</strong> - These statistics are
              not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Parental responsibility measures</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Pupil projections</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Special educational needs (SEN)</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
        </AccordionSection>
        <AccordionSection heading="Further education">
          <h3>Attainment and outcomes</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>16 to 19 attainment</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Further education and skills</strong> - These statistics
              are not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Further education for benefits claimants</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>National achievement rates tables</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Outcome based success measures</strong> - These statistics
              are not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Performance tables</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Finance</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Advance learner loans</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Further education and skills</strong> - These statistics
              are not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Institutions</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Participation and characteristics</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>FE Choices</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Further education and skills</strong> - These statistics
              are not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Further education for benefits claimants</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Not in education, employment or training (NEET) and
                participation
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
        </AccordionSection>
        <AccordionSection heading="Higher education">
          <h3>Attainment and outcomes</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Not in education, employment or training (NEET) and
                participation
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Attainment and outcomes</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Graduate labour market</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Higher education graduate employment and earnings</strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Higher education statistics</strong> - These statistics
              are not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Initial teacher training (ITT)</strong> - These statistics
              are not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Performance tables</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Widening participation in higher education</strong> -
              These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Finance</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Higher education graduate employment and earnings</strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Student loan forecasts</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Institutions</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Higher education statistics</strong> - These statistics
              are not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Participation and characteristics</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Higher education graduate employment and earnings</strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Higher education</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Initial teacher training (ITT)</strong> - These statistics
              are not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Not in education, employment or training (NEET) and
                participation
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Participation rates in higher education</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Widening participation in higher education</strong> -
              These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Workforce</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Higher education</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
        </AccordionSection>

        <AccordionSection heading="Schools">
          <h3>Attainment and outcomes</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Not in education, employment or training (NEET) and
                participation
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Not in education, employment or training (NEET) and
                participation
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>16 to 19 attainment</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Destinations of key stage 4 and key stage 5 pupils
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>GCSEs (key stage 4) and equivalent results</strong> -
              These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <div className="govuk-!-margin-top-0 govuk-!-padding-top-0">
            <div className="govuk-inset-text">
              <p>
                View statistics, create charts and tables and download data
                files for GCSE and equivalent results in England
              </p>
            </div>
            <div className="govuk-!-margin-top-0" />
            <p>
              <strong>NEED TO GET DROPDOWN INSERED IN HERE</strong>
            </p>
          </div>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Key stage 1</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Key stage 2</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Parental responsibility measures</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Performance tables</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Special educational needs (SEN)</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Finance</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Local authority and school finance</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Institutions</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Admission appeals</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>GCSEs (key stage 4) and equivalent results</strong> -
              These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <div className="govuk-!-margin-top-0 govuk-!-padding-top-0">
            <div className="govuk-inset-text">
              <p>
                View statistics, create charts and tables and download data
                files for GCSE and equivalent results in England
              </p>
            </div>
            <div className="govuk-!-margin-top-0" />
            <p>
              <strong>NEED TO GET DROPDOWN INSERED IN HERE</strong>
            </p>
          </div>
          <ul className="govuk-list-bullet">
            <li>
              <strong>School applications</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>School capacity</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>School and pupil numbers</strong> - These statistics are
              not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Workforce statistics and analysis</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Participation and characteristics</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>16 to 19 attainment</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Admission appeals</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Destinations of key stage 4 and key stage 5 pupils
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Exclusions</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <div className="govuk-!-margin-top-0 govuk-!-padding-top-0">
            <div className="govuk-inset-text">
              <p>
                View statistics, create charts and tables and download data
                files for GCSE and equivalent results in England
              </p>
            </div>
            <div className="govuk-!-margin-top-0" />
            <p>
              <strong>NEED TO GET DROPDOWN INSERED IN HERE</strong>
            </p>
          </div>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Education and training</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Not in education, employment or training (NEET) and
                participation
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Parental responsibility measures</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Pupil absence</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <div className="govuk-!-margin-top-0 govuk-!-padding-top-0">
            <div className="govuk-inset-text">
              <p>
                View statistics, create charts and tables and download data
                files for GCSE and equivalent results in England
              </p>
            </div>
            <div className="govuk-!-margin-top-0" />
            <p>
              <strong>NEED TO GET DROPDOWN INSERED IN HERE</strong>
            </p>
          </div>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Pupil projections</strong> - These statistics are not yet
              available on the explore education statistics service. Find them
              on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>School and pupil numbers</strong> - These statistics are
              not yet available on the explore education statistics service.
              Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>School applications</strong> - These statistics are not
              yet available on the explore education statistics service. Find
              them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
          <ul className="govuk-list-bullet">
            <li>
              <strong>Special educational needs (SEN)</strong> - These
              statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>

          <h3>Workforce</h3>
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Not in education, employment or training (NEET) and
                participation
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
        </AccordionSection>

        <AccordionSection heading="Social care">
          <ul className="govuk-list-bullet">
            <li>
              <strong>
                Not in education, employment or training (NEET) and
                participation
              </strong>{' '}
              - These statistics are not yet available on the explore education
              statistics service. Find them on GOV.UK under{' '}
              <a href="https://www.gov.uk/government/organisations/department-for-education/about/statistics#statistical-collections">
                Statistics DfE
              </a>
            </li>
          </ul>
        </AccordionSection>
      </Accordion>
    </PrototypePage>
  );
};

export default BrowseReleasesPage;
