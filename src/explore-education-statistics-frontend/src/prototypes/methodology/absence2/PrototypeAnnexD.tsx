import React from 'react';

const PrototypeMethodologySection = () => {
  return (
    <>
      <p>
        The following breakdowns are currently available in published exclusions
        statistics.
      </p>
      <table className="govuk-table">
        <tbody>
          <tr>
            <th colSpan={3}>National level</th>
          </tr>
          <tr>
            <td>Exclusion numbers and rates</td>
            <td />
            <td>
              For permanent and fixed-period exclusions broken down by school
              type. Time series
            </td>
          </tr>
          <tr>
            <td>Exclusions information by characteristic</td>
            <td />
            <td>
              Permanent and fixed-period exclusion information by age, gender,
              free school meal eligibility, national curriculum year group, SEN
              provision, ethnic group and level of deprivation
            </td>
          </tr>
          <tr>
            <td>Duration of fixed-period exclusions</td>
            <td />
            <td>
              The duration of fixed-period exclusions, including average length
              of exclusion, broken down by school type
            </td>
          </tr>
          <tr>
            <td>Number of fixed-period exclusions</td>
            <td />
            <td>
              The number of fixed-period exclusions, including the number
              subsequently being permanently excluded, broken down by school
              type
            </td>
          </tr>
          <tr>
            <td>Exclusions by reason</td>
            <td />
            <td>
              The number and proportion of permanent and fixed-period exclusions
              broken down by school type
            </td>
          </tr>
          <tr>
            <td>Exclusion review panels</td>
            <td />
            <td>
              Information on the number of exclusion review panels in maintained
              primary, secondary, special schools and academies
            </td>
          </tr>
          <tr>
            <td>Academy exclusions</td>
            <td />
            <td>
              Permanent, fixed-period and one or more fixed-period exclusion
              information for academies
            </td>
          </tr>
          <tr>
            <th colSpan={3}>Local authority level</th>
          </tr>
          <tr>
            <td>Exclusion numbers and rates</td>
            <td />
            <td>
              For permanent and fixed-period exclusions as well as those with
              one or more fixed-period exclusion broken down by school type
            </td>
          </tr>
          <tr>
            <td>Exclusions by reason</td>
            <td />
            <td>For fixed-period and permanent exclusions</td>
          </tr>
          <tr>
            <td>Exclusions by ethnicity</td>
            <td />
            <td>
              For fixed-period and permanent exclusions. A school type split is
              provided for fixed-period exclusions
            </td>
          </tr>
          <tr>
            <th colSpan={3}>School level</th>
          </tr>
          <tr>
            <td>Exclusion numbers and rates</td>
            <td />
            <td>
              For permanent and fixed-period exclusions as well as those with
              one or more fixed-period exclusion broken down by school type
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PrototypeMethodologySection;
