import React, { Component } from 'react';
import Link from '../components/Link';

class HomePage extends Component {
  public render() {
    return (
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>Explore education statistics</h1>
          <p>Use this service to:</p>
          <ul>
            <li>do something</li>
            <li>do something else</li>
          </ul>
          <a
            href="#"
            role="button"
            className="govuk-button govuk-button--start govuk-!-margin-top-2 govuk-!-margin-bottom-8"
          >
            Start now
          </a>
          <h2>Before you start</h2>
          <p>Do something.</p>
        </div>

        <div className="govuk-grid-column-one-third">
          <aside className="app-related-items" role="complementary">
            <h2>Quick Links</h2>

            <nav role="navigation" aria-labelledby="subsection-title">
              <ul className="govuk-list govuk-body-s">
                <li>
                  <Link to="/themes" data-testid="themes-link">
                    Themes
                  </Link>
                </li>
                <li>
                  <Link to="/topics" data-testid="topics-link">
                    Topics
                  </Link>
                </li>
                <li>
                  <Link to="/publications">Publications</Link>
                </li>
                <li>
                  <Link to="/local-authorities/sheffield">
                    Local Authority - Sheffield
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    );
  }
}

export default HomePage;
