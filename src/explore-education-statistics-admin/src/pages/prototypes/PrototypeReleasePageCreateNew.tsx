import React from 'react';
import PrototypePage from './components/PrototypePage';
import PrototypeReleaseConfig from './components/PrototypeReleasePageConfig';

const PublicationPage = () => {
  return (
    <PrototypePage
      wide
      breadcrumbs={[
        {
          link: '/prototypes/admin-dashboard',
          text: 'Administrator dashboard',
        },
        { text: 'Create new release', link: '#' },
      ]}
    >
      <h1 className="govuk-heading-xl">Create new release</h1>
      <PrototypeReleaseConfig />
    </PrototypePage>
  );
};

export default PublicationPage;