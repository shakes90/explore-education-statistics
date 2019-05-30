import Button from '@common/components/Button';
import Details from '@common/components/Details';
import { Formik } from '@common/components/form';
import { Form } from 'formik';
import React from 'react';
import FormFieldSortableList from './FormFieldSortableList';
import { SortableOption } from './FormSortableList';

interface Props {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
}

export interface FormValues {
  columnGroups: SortableOption[];
  columns: SortableOption[];
  rowGroups: SortableOption[];
  rows: SortableOption[];
}

const TableHeadersForm = (props: Props) => {
  const { onSubmit, initialValues } = props;

  return (
    <Details summary="Re-order table headers">
      <p className="govuk-hint">
        Drag and drop the options below to re-order the table headers.
      </p>

      <Formik<FormValues>
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={() => {
          return (
            <Form>
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-quarter">
                  <FormFieldSortableList<FormValues>
                    name="rowGroups"
                    id="sort-rowGroups"
                    legend="Row groups"
                  />
                </div>
                <div className="govuk-grid-column-one-quarter">
                  <FormFieldSortableList<FormValues>
                    name="rows"
                    id="sort-rows"
                    legend="Rows"
                  />
                </div>
                <div className="govuk-grid-column-one-quarter">
                  <FormFieldSortableList<FormValues>
                    name="columnGroups"
                    id="sort-columnGroups"
                    legend="Column groups"
                  />
                </div>
                <div className="govuk-grid-column-one-quarter">
                  <FormFieldSortableList<FormValues>
                    name="columns"
                    id="sort-columns"
                    legend="Columns"
                  />
                </div>
              </div>

              <Button type="submit">Re-order table</Button>
            </Form>
          );
        }}
      />
    </Details>
  );
};

export default TableHeadersForm;
