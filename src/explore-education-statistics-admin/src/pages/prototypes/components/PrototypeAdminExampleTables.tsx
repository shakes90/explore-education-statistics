import React from 'react';
import {
  FormGroup,
  FormFieldset,
  FormTextInput,
  FormSelect,
  // FormRadioGroup,
} from '@common/components/form';
import Tabs from '@common/components/Tabs';
import TabsSection from '@common/components/TabsSection';
import Link from '../../../components/Link';

interface Props {
  // tableId?: string;
  task?: string;
}

const PrototypeExampleTable = ({ task }: Props) => {
  return (
    <div className="govuk-width-container">
      <Tabs>
        <TabsSection id="table-preview" title="Table preview">
          <table className="govuk-table">
            <caption className="govuk-table__caption govuk-!-margin-bottom-6">
              Table showing 'Absence by characteristic' from 'Pupil absence' in
              England between 2012/13 and 2016/17
            </caption>
            <thead className="govuk-table__head">
              <tr>
                <th colSpan={2} />
                <th scope="col" className="govuk-table__header--numeric">
                  2012/13
                </th>
                <th scope="col" className="govuk-table__header--numeric">
                  2013/14
                </th>
                <th scope="col" className="govuk-table__header--numeric">
                  2014/15
                </th>
                <th scope="col" className="govuk-table__header--numeric">
                  2015/16
                </th>
                <th scope="col" className="govuk-table__header--numeric">
                  2016/17
                </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr>
                <th rowSpan={4} scope="row">
                  All schools
                </th>
                <th scope="row">Number of pupil enrolments</th>
                <td className="govuk-table__cell--numeric">6,477,725</td>
                <td className="govuk-table__cell--numeric">6,554,005</td>
                <td className="govuk-table__cell--numeric">6,642,755</td>
                <td className="govuk-table__cell--numeric">6,737,190</td>
                <td className="govuk-table__cell--numeric">6,899,770</td>
              </tr>
              <tr>
                <th scope="row">Authorised absence rate</th>
                <td className="govuk-table__cell--numeric">4.2%</td>
                <td className="govuk-table__cell--numeric">3.5%</td>
                <td className="govuk-table__cell--numeric">3.5%</td>
                <td className="govuk-table__cell--numeric">3.4%</td>
                <td className="govuk-table__cell--numeric">3.4%</td>
              </tr>
              <tr>
                <th scope="row">Unuthorised absence rate</th>
                <td className="govuk-table__cell--numeric">1.1%</td>
                <td className="govuk-table__cell--numeric">1.1%</td>
                <td className="govuk-table__cell--numeric">1.1%</td>
                <td className="govuk-table__cell--numeric">1.1%</td>
                <td className="govuk-table__cell--numeric">1.3%</td>
              </tr>
              <tr>
                <th scope="row">Overall absence rate</th>
                <td className="govuk-table__cell--numeric">5.3%</td>
                <td className="govuk-table__cell--numeric">4.5%</td>
                <td className="govuk-table__cell--numeric">4.6%</td>
                <td className="govuk-table__cell--numeric">4.6%</td>
                <td className="govuk-table__cell--numeric">4.7%</td>
              </tr>
            </tbody>
          </table>
          <p className="govuk-body-s">
            Source: DfE prototype example statistics
          </p>
          {task === 'edit' && (
            <>
              <hr />
              <FormFieldset id="table-config" legend="Table details">
                <FormGroup>
                  <FormTextInput
                    id="table-title"
                    name="table-title"
                    label="Table title"
                    value="Table showing 'Absence by characteristic' from 'Pupil absence' in England between 2012/13 and 2016/17"
                  />
                </FormGroup>
                <FormGroup>
                  <FormTextInput
                    id="source"
                    name="source"
                    label="Source"
                    value="DfE prototype example statistics"
                    width={20}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="footnotes" className="govuk-label">
                    Foot notes
                  </label>
                  <textarea
                    name="footnotes"
                    id="footnotes"
                    className="govuk-textarea"
                  />
                </FormGroup>
              </FormFieldset>
              <Link
                to="/prototypes/publication-create-new-absence-table?status=step5"
                className="govuk-button"
              >
                Update table
              </Link>
            </>
          )}
        </TabsSection>
        <TabsSection id="add-chart" title="Add a chart">
          <p>Select chart type</p>
        </TabsSection>
      </Tabs>
      {task === 'view' && (
        <>
          <FormGroup>
            <FormTextInput
              id="permalink"
              name="permalink"
              label="Permalink"
              hint="Copy this URL to view a standalone verion of this table"
              value="http://dfe-url.gov.uk/example-permalink"
              width={20}
            />
          </FormGroup>
          <Link
            className="govuk-button govuk-!-margin-right-3"
            to="/prototypes/publication-create-new-absence-table?status=step5"
          >
            Edit this table
          </Link>

          <Link to="#" className="govuk-button govuk-button--warning">
            Delete this table
          </Link>
        </>
      )}
    </div>
  );
};

export default PrototypeExampleTable;
