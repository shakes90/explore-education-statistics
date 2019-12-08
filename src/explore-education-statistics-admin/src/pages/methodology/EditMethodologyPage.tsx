import Link from '@admin/components/Link';
import Page from '@admin/components/Page';
import RelatedInformation from '@common/components/RelatedInformation';
import React from 'react';

const EditMethodologyPage = () => {
  return (
    <Page
      wide
      breadcrumbs={[
        { name: 'Manage methodology', link: '/methodology' },
        { name: 'Edit methodology' },
      ]}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">
            <span className="govuk-caption-xl">Edit methodology</span>
            [[methodology title]]
          </h1>
        </div>

        <div className="govuk-grid-column-one-third">
          <RelatedInformation heading="Help and guidance">
            <ul className="govuk-list">
              <li>
                <Link to="/documentation" target="blank">
                  Creating new methodology{' '}
                </Link>
              </li>
            </ul>
          </RelatedInformation>
        </div>
      </div>
    </Page>
  );
};

export default EditMethodologyPage;
