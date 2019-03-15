import classNames from 'classnames';
import React from 'react';
import Link from '../../../../components/Link';

const PrototypeMethodologySection = () => {
  return (
    <>
      <p>
        The following calculations are used to produce absence National
        Statistics:
      </p>
      <dl className="govuk-list">
        <dt>Percentage of sessions missed due to overall absence</dt>
        <dd>
          (Total overall absence sessions / Total sessions possible) X 100
        </dd>
        <dt>Percentage of sessions missed due to authorised absence</dt>
        <dd>
          (Total authorised absence sessions / Total sessions possible) X 100
        </dd>
        <dt>Percentage of sessions missed due to unauthorised absence</dt>
        <dd>
          (Total unauthorised absence sessions / Total sessions possible) X 100
        </dd>
        <dt>
          Percentage of pupils with one or more session of absence by reason
        </dt>
        <dd>
          (Number of enrolments with one or more session of absence for a reason
          / Number of enrolments) X 100
        </dd>
        <dt>
          Percentage of overall absence for which persistent absentees are
          responsible
        </dt>
        <dd>
          (Overall absence sessions for persistent absentees / Total overall
          absence sessions) X 100
        </dd>
        <dt>
          Percentage of authorised absence for which persistent absentees are
          responsibe
        </dt>
        <dd>
          (Authorised absence session for persistent absentees / Total overall
          absence sessions) X 100
        </dd>
        <dt>
          Percentage of unauthorised absence for which persistent absentees are
          responsible
        </dt>
        <dd>
          (unauthorised absence sessions for persistent absentees / Total
          overall absence sessions) X 100
        </dd>
        <dt>Distribution of reasons for absence</dt>
        <dd>
          (Absence for this reason / Total overall absence with reasons) X 100
        </dd>
        <dt>Absence rates by reason</dt>
        <dd>(Absence for the reason / Total session possible) X 100</dd>
      </dl>
    </>
  );
};

export default PrototypeMethodologySection;
