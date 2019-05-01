import Link from '@frontend/components/Link';
import PrototypePage from '@frontend/prototypes/components/PrototypePage';
import React from 'react';

const HomePage = () => {
  return (
    <PrototypePage>
      <h1 className="govuk-heading-xl">
        Education statistics: methodology and glossary
      </h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <p className="govuk-body-l">
            Select an option to find the methodology for specific statistics and
            data or our glossary for a list of statistical terms and
            definitions.
          </p>
          <h2 className="govuk-heading-m govuk-!-margin-bottom-1">
            <Link to="/prototypes/methodology-specific">Methodology</Link>
          </h2>
          <p className="govuk-body">
            Browse education statistics and data to find out more about them and
            how and why they're collected and published.
          </p>

          <h2 className="govuk-heading-m govuk-!-margin-bottom-1">
            <Link to="#">Glossary</Link>
          </h2>
          <p className="govuk-body">
            Browse our A to Z list of definitions for terms used across
            education statistics and data.
          </p>
        </div>
        <div className="govuk-grid-column-one-third">
          <aside className="app-related-items">
            <h2 className="govuk-heading-m" id="releated-content">
              Related content
            </h2>
            <nav role="navigation" aria-labelledby="subsection-title">
              <ul className="govuk-list">
                <li>
                  <Link to="/prototypes/browse-releases">
                    Find statistics and data
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      <hr />
      <h3 className="govuk-heading-m govuk-!-margin-top-9">Related services</h3>
      <p className="govuk-body">
        Use these services to find and compare and contrast performance and
        other information about schools and colleges near you:
      </p>
      <div className="govuk-grid-row govuk-!-margin-bottom-9">
        <div className="govuk-grid-column-one-half">
          <h4 className="govuk-heading-s govuk-!-margin-bottom-0">
            <a
              className="govuk-link"
              href="https://www.gov.uk/school-performance-tables"
            >
              Find and compare schools in England
            </a>
          </h4>
          <p className="govuk-caption-m govuk-!-margin-top-1">
            Search for and check the performance of primary, secondary and
            special needs schools and colleges
          </p>
        </div>
        <div className="govuk-grid-column-one-half">
          <h4 className="govuk-heading-s govuk-!-margin-bottom-0">
            <a
              className="govuk-link"
              href="https://www.get-information-schools.service.gov.uk/"
            >
              Get information about schools
            </a>
          </h4>
          <p className="govuk-caption-m govuk-!-margin-top-1">
            Search to find and download information about schools, colleges,
            educational organisations and governors in England
          </p>
        </div>
      </div>
    </PrototypePage>
  );
};

export default HomePage;
