import classNames from 'classnames';
import React from 'react';
import Link from '../../../../components/Link';

const PrototypeMethodologySection = () => {
  return (
    <>
      <table className="govuk-table">
        <tr>
          <th colSpan={3}>National level</th>
        </tr>
        <tr>
          <td>Absence rates</td>
          <td />
          <td>
            Overall, authorised and unauthorised absence rate breakdowns. Time
            series.
          </td>
        </tr>
        <tr>
          <td>Those who are persistent absentees </td>
          <td />
          <td>
            Those missing 10 per cent or more of their own possible sessions in
            the period. Time series.
          </td>
        </tr>
        <tr>
          <td>Absence by reason </td>
          <td />
          <td>
            Breakdown of absence by reason. [Available by gender in combined
            autumn and spring and full year releases.]
          </td>
        </tr>
        <tr>
          <td>Pupils who miss one or more session due to absence by reason </td>
          <td />
          <td>
            The number and percentage of pupils missing one or more session for
            overall, authorised and unauthorised absence and for individual
            reasons for absence
          </td>
        </tr>
        <tr>
          <td>Absence by reason for persistent absentees </td>
          <td>*</td>
          <td>
            Breakdown of absence by reason for pupils who are classified as
            persistent absentees.
          </td>
        </tr>
        <tr>
          <td>Absence by pupil characteristic </td>
          <td>* ~</td>
          <td>
            Overall, authorised and unauthorised absence rates by gender, free
            school meal eligibility, free school meal eligibility in the last 6
            years, national curriculum year group, first language, SEN provision
            and ethnic group.
          </td>
        </tr>
        <tr>
          <td>Characteristics of persistent absentees</td>
          <td>* ~</td>
          <td>
            Persistent absence rates as well as the overall, authorised and
            unauthorised absence rates for persistent absentees by gender, free
            school meal eligibility, free school meal eligibility in the last 6
            years, national curriculum year group, first language, Special
            Educational Need (SEN) provision and ethnic group.
          </td>
        </tr>
        <tr>
          <td>Absence levels by SEN primary need</td>
          <td>*</td>
          <td>
            Including overall, authorised and unauthorised absence rates and
            persistent absence rates by SEN pupil’s primary need.
          </td>
        </tr>
        <tr>
          <td>Distribution of enrolments by overall absence (days)</td>
          <td>*</td>
          <td>
            Distribution of pupil enrolments by length of overall absence in
            days and by overall absence rates.
          </td>
        </tr>
        <tr>
          <td>
            Distribution of schools by the percentage of persistent absentees
          </td>
          <td>*</td>
          <td>
            Including the number of schools by persistent absence rate brackets.
          </td>
        </tr>
        <tr>
          <td>Pupil absence in schools by IDACI decile</td>
          <td>*</td>
          <td>
            Including overall, authorised and unauthorised absence rates and
            persistent absence rates by income deprivation affecting children
            indices (IDACI) decile of pupil residence.
          </td>
        </tr>
        <tr>
          <th colSpan={3}>
            Local authority level, available local authority tables (full year
            release only) or accompanying csv files (all releases)
          </th>
        </tr>
        <tr>
          <td>Absence rates</td>
          <td />
          <td>Overall, authorised and unauthorised absence rate breakdowns</td>
        </tr>
        <tr>
          <td>Those who are persistent absentees</td>
          <td />
          <td>
            Those missing 10 per cent or more of their own possible sessions in
            the period
          </td>
        </tr>
        <tr>
          <td>Absence by reason</td>
          <td />
          <td>A breakdown of absence sessions by reason</td>
        </tr>
        <tr>
          <td>PRU absence</td>
          <td />
          <td>
            Overall, authorised and unauthorised absence rates, persistent
            absentee rates and absence by reason in pupil referral units (PRUs)
          </td>
        </tr>
        <tr>
          <td>Pupils who miss one or more session due to absence by reason</td>
          <td />
          <td>
            The number of pupils missing one or more session for overall,
            authorised and unauthorised absence and for individual reasons for
            absence
          </td>
        </tr>
        <tr>
          <td>Absence and persistent absence by pupil characteristic </td>
          <td>* ~</td>
          <td>
            Overall, authorised, unauthorised and persistent absence rates and
            absence by reason by gender, free school meal eligibility, free
            school meal eligibility in the last 6 years, national curriculum
            year group, first language, SEN provision and ethnic group.
          </td>
        </tr>
        <tr>
          <td>Pupil absence in schools by IDACI decile</td>
          <td>*</td>
          <td>
            Including overall, authorised and unauthorised absence rates and
            persistent absence rates by income deprivation affecting children
            indices (IDACI) decile of pupil residence and school location.
            [Available at LA District level]
          </td>
        </tr>
        <tr>
          <td>Four year old absence</td>
          <td />
          <td>Overall absence rates for four year olds</td>
        </tr>
        <tr>
          <th colSpan={3}>School level, available via underlying data only</th>
        </tr>
        <tr>
          <td>Absence rates</td>
          <td />
          <td>Overall, authorised and unauthorised absence rate breakdowns</td>
        </tr>
        <tr>
          <td>Those who are persistent absentees</td>
          <td />
          <td>
            Those missing 10 per cent or more of their own possible sessions in
            the period
          </td>
        </tr>
        <tr>
          <td>Absence by reason</td>
          <td />
          <td>A breakdown of absence sessions by reason</td>
        </tr>
        <tr>
          <td>Four year old absence</td>
          <td />
          <td>Overall absence rates for four year olds</td>
        </tr>
      </table>
    </>
  );
};

export default PrototypeMethodologySection;
