import Button from '@common/components/Button';
import {
  FormFieldSelect,
  FormFieldset,
  FormGroup,
} from '@common/components/form';
import { SelectOption } from '@common/components/form/FormSelect';
import Yup from '@common/lib/validation/yup';
import TimePeriod from '@common/services/types/TimePeriod';
import { Comparison } from '@common/types/util';
import { MetaSpecification } from '@frontend/prototypes/table-tool/components/meta/initialSpec';
import { Form, Formik } from 'formik';
import React from 'react';

interface FormValues {
  start: string;
  end: string;
}

interface Props {
  specification: MetaSpecification;
  onSubmit: (values: FormValues) => void;
}

const TimePeriodFiltersForm = ({ specification, onSubmit }: Props) => {
  const startEndDateValues = specification.timePeriod.options.map(
    ({ code, year }) => `${year}_${code}`,
  );

  const timePeriodOptions: SelectOption[] = specification.timePeriod.options.map(
    option => {
      return {
        label: option.label,
        value: `${option.year}_${option.code}`,
      };
    },
  );

  return (
    <Formik<FormValues>
      onSubmit={onSubmit}
      initialValues={{
        start: '2012_AY',
        end: '2016_AY',
      }}
      validationSchema={Yup.object<FormValues>({
        end: Yup.string()
          .required('End date is required')
          .oneOf(startEndDateValues, 'Must be one of provided dates')
          .test(
            'moreThanOrEqual',
            'Must be after or same as start date',
            function moreThanOrEqual(value: string) {
              const start: string = this.resolve(Yup.ref('start'));

              if (!start) {
                return false;
              }

              const endTime = TimePeriod.fromString(value);
              const startTime = TimePeriod.fromString(start);

              const comparison = endTime.compare(startTime);

              return (
                comparison === Comparison.GreaterThan ||
                comparison === Comparison.EqualTo
              );
            },
          ),
        start: Yup.string()
          .required('Start date is required')
          .oneOf(startEndDateValues, 'Must be one of provided dates')
          .test(
            'lessThanOrEqual',
            'Must be before or same as end date',
            function lessThanOrEqual(value: string) {
              const end: string = this.resolve(Yup.ref('end'));

              if (!end) {
                return false;
              }

              const startTime = TimePeriod.fromString(value);
              const endTime = TimePeriod.fromString(end);

              const comparison = startTime.compare(endTime);

              return (
                comparison === Comparison.LessThan ||
                comparison === Comparison.EqualTo
              );
            },
          ),
      })}
      render={() => {
        return (
          <Form>
            <FormFieldset
              id="filter-timePeriod"
              legend={specification.timePeriod.legend}
              hint={specification.timePeriod.hint}
            >
              <FormFieldSelect
                name="start"
                id="filter-timePeriod-start"
                label="Start date"
                options={timePeriodOptions}
              />
              <FormFieldSelect
                name="end"
                id="filter-timePeriod-end"
                label="End date"
                options={timePeriodOptions}
              />
            </FormFieldset>

            <FormGroup>
              <Button type="submit">Submit</Button>
            </FormGroup>
          </Form>
        );
      }}
    />
  );
};

export default TimePeriodFiltersForm;
