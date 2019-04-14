import React from 'react';
import Link from '../../../components/Link';

interface Props {
  sectionId?: string;
  action?: string;
}

const PrototypePublicationSummary = () => {
  return (
    <>
      <h2 className="govuk-heading-m">Release setup summary</h2>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Publication title</dt>
          <dd className="govuk-summary-list__value">
            Pupil absence statistics and data for schools in England
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Release type</dt>
          <dd className="govuk-summary-list__value">Academic year</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Release period</dt>
          <dd className="govuk-summary-list__value">2018 to 2019</dd>
        </div>
      </dl>
      <Link to="/prototypes/publication-create-new-absence-config-edit">
        Edit release setup details
      </Link>
    </>
  );
};

export default PrototypePublicationSummary;
