import React from 'react';

const PrototypeMethodologySection = () => {
  return (
    <>
      <p>
        Published pupil absence National Statistics are available at the
        following links.{' '}
      </p>
      <dl>
        <dt>*</dt>
        <dd>Identifies those published as National Statistics</dd>
        <dt>~</dt>
        <dd>
          For the 2006/07 academic year the separate autumn and spring term
          reports were published as parts of one release
        </dd>
        <dt>^</dt>
        <dd>Provisional publication</dd>
      </dl>
      <h3>Full academic year</h3>
      <ul className="govuk-list">
        <li>
          <a href="/prototypes/publication">
            Pupil absence in schools in England: 2016 to 2017 *
          </a>{' '}
        </li>
      </ul>
      <h3>Autumn term</h3>
      <ul className="govuk-list">
        <li>
          <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-autumn-term-2016">
            Pupil absence in schools in England: autumn term 2016 *
          </a>{' '}
        </li>
      </ul>
      <h3>Spring term</h3>
      <ul className="govuk-list">
        <li>
          <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-spring-term-2012">
            Pupil absence in schools in England: spring term 2012 *
          </a>{' '}
        </li>
      </ul>
      <h3>Autumn and spring terms</h3>
      <ul className="govuk-list">
        <li>
          <a href="https://www.gov.uk/government/statistics/pupil-absence-in-schools-in-england-autumn-2015-and-spring-2016">
            Pupil absence in schools in England: autumn 2015 and spring 2016 *
          </a>{' '}
        </li>
      </ul>
    </>
  );
};

export default PrototypeMethodologySection;
