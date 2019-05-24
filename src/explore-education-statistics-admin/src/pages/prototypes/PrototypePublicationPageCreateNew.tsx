import React from 'react';
import PrototypePage from './components/PrototypePage';
import PrototypePublicationConfig from './components/PrototypePublicationPageConfig';

const PublicationPage = () => {
  return (
    <PrototypePage
      wide
      breadcrumbs={[
        {
          link: '/prototypes/admin-dashboard',
          text: 'Administrator dashboard',
        },
        { text: 'Create new publication', link: '#' },
      ]}
    >
      <h1 className="govuk-heading-xl">Create new publication</h1>
      <PrototypePublicationConfig />
    </PrototypePage>
  );
};

export default PublicationPage;
