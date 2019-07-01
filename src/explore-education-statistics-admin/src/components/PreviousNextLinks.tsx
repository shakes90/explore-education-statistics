import Link from '@admin/components/Link';
import React from 'react';

export interface PreviousNextLink {
  label: string;
  linkTo: string;
}

export interface Props {
  previousSection?: PreviousNextLink;
  nextSection?: PreviousNextLink;
}

const PreviousNextLinks = ({ previousSection, nextSection }: Props) => {
  if (previousSection && nextSection) {
    return (
      <div className="govuk-grid-row govuk-!-margin-top-9">
        <div className="govuk-grid-column-one-half ">
          <Link to={previousSection.linkTo}>
            Previous step, {previousSection.label}
          </Link>
        </div>
        <div className="govuk-grid-column-one-half dfe-align--right">
          <Link to={nextSection.linkTo}>Next step, {nextSection.label}</Link>
        </div>
      </div>
    );
  }

  if (previousSection) {
    return (
      <div className="govuk-!-margin-top-9">
        <Link to={previousSection.linkTo}>
          Previous step, {previousSection.label}
        </Link>
      </div>
    );
  }

  if (nextSection) {
    return (
      <div className="govuk-!-margin-top-9 dfe-align--right">
        <Link to={nextSection.linkTo}>Next step, {nextSection.label}</Link>
      </div>
    );
  }

  return <></>;
};

export default PreviousNextLinks;
