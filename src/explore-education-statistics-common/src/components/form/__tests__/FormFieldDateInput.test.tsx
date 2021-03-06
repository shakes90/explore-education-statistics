import FormFieldDateInput from '@common/components/form/FormFieldDateInput';
import { PartialDate } from '@common/utils/date/partialDate';
import { fireEvent, render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import noop from 'lodash/noop';
import React from 'react';

describe('FormFieldDateInput', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Formik initialValues={{}} onSubmit={noop}>
        <FormFieldDateInput
          legend="Start date"
          id="startDate"
          name="startDate"
        />
      </Formik>,
    );

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('renders with an error message correctly', () => {
    const { container } = render(
      <Formik
        initialValues={{}}
        initialErrors={{
          startDate: 'The date is wrong',
        }}
        initialTouched={{
          startDate: true,
        }}
        onSubmit={noop}
      >
        <FormFieldDateInput
          legend="Start date"
          id="startDate"
          name="startDate"
        />
      </Formik>,
    );

    expect(container.querySelector('fieldset')).toHaveAttribute(
      'aria-describedby',
      'startDate-error',
    );
    expect(screen.getByText('The date is wrong')).toHaveAttribute(
      'id',
      'startDate-error',
    );
  });

  test('renders with a hint correctly', () => {
    const { container } = render(
      <Formik initialValues={{}} onSubmit={noop}>
        <FormFieldDateInput
          legend="Start date"
          hint="Test hint"
          id="startDate"
          name="startDate"
        />
      </Formik>,
    );

    expect(container.querySelector('fieldset')).toHaveAttribute(
      'aria-describedby',
      'startDate-hint',
    );
    expect(screen.getByText('Test hint')).toHaveAttribute(
      'id',
      'startDate-hint',
    );
  });

  test('renders with a hint and error correctly', () => {
    const { container } = render(
      <Formik
        initialValues={{}}
        initialErrors={{
          startDate: 'The date is wrong',
        }}
        initialTouched={{
          startDate: true,
        }}
        onSubmit={noop}
      >
        <FormFieldDateInput
          legend="Start date"
          hint="Test hint"
          id="startDate"
          name="startDate"
        />
      </Formik>,
    );

    expect(container.querySelector('fieldset')).toHaveAttribute(
      'aria-describedby',
      'startDate-error startDate-hint',
    );
    expect(screen.getByText('Test hint')).toHaveAttribute(
      'id',
      'startDate-hint',
    );
    expect(screen.getByText('The date is wrong')).toHaveAttribute(
      'id',
      'startDate-error',
    );
  });

  test('sets a valid UTC date as a form value', () => {
    const onChange = jest.fn();

    render(
      <Formik<{ startDate?: Date }> initialValues={{}} onSubmit={noop}>
        {form => {
          onChange(form.values.startDate);

          return (
            <FormFieldDateInput
              legend="Start date"
              id="startDate"
              name="startDate"
            />
          );
        }}
      </Formik>,
    );

    fireEvent.change(screen.getByLabelText('Day'), {
      target: {
        value: 10,
      },
    });

    fireEvent.change(screen.getByLabelText('Month'), {
      target: {
        value: 12,
      },
    });

    fireEvent.change(screen.getByLabelText('Year'), {
      target: {
        value: 2020,
      },
    });

    expect(screen.getByLabelText('Day')).toHaveValue(10);
    expect(screen.getByLabelText('Month')).toHaveValue(12);
    expect(screen.getByLabelText('Year')).toHaveValue(2020);

    expect(onChange).toHaveBeenCalledWith(new Date('2020-12-10T00:00:00.000Z'));
  });

  test('does not set an invalid date as a form value', () => {
    const onChange = jest.fn();

    render(
      <Formik<{ startDate?: Date }> initialValues={{}} onSubmit={noop}>
        {form => {
          onChange(form.values.startDate);

          return (
            <FormFieldDateInput
              legend="Start date"
              id="startDate"
              name="startDate"
            />
          );
        }}
      </Formik>,
    );

    fireEvent.change(screen.getByLabelText('Day'), {
      target: {
        value: 32,
      },
    });

    fireEvent.change(screen.getByLabelText('Month'), {
      target: {
        value: 12,
      },
    });

    fireEvent.change(screen.getByLabelText('Year'), {
      target: {
        value: 2020,
      },
    });

    expect(screen.getByLabelText('Day')).toHaveValue(32);
    expect(screen.getByLabelText('Month')).toHaveValue(12);
    expect(screen.getByLabelText('Year')).toHaveValue(2020);

    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  test('does not set a partial date as a form value', () => {
    const onChange = jest.fn();

    render(
      <Formik<{ startDate?: Date }> initialValues={{}} onSubmit={noop}>
        {form => {
          onChange(form.values.startDate);

          return (
            <FormFieldDateInput
              legend="Start date"
              id="startDate"
              name="startDate"
            />
          );
        }}
      </Formik>,
    );

    fireEvent.change(screen.getByLabelText('Day'), {
      target: {
        value: 10,
      },
    });

    expect(screen.getByLabelText('Day')).toHaveValue(10);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  test('can hide day field when `type = partialDate` and `partialDateType = monthYear`', () => {
    render(
      <Formik<{ startDate?: PartialDate }> initialValues={{}} onSubmit={noop}>
        <FormFieldDateInput
          legend="Start date"
          id="startDate"
          name="startDate"
          type="partialDate"
          partialDateType="monthYear"
        />
      </Formik>,
    );

    expect(screen.queryByLabelText('Day')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Month')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
  });

  test('does not hide day field when `type = date` and `partialDateType = monthYear`', () => {
    render(
      <Formik<{ startDate?: PartialDate }> initialValues={{}} onSubmit={noop}>
        <FormFieldDateInput
          legend="Start date"
          id="startDate"
          name="startDate"
          type="date"
          partialDateType="monthYear"
        />
      </Formik>,
    );

    expect(screen.getByLabelText('Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Month')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
  });

  test('can set a full PartialDate as a form value when `type = partialDate`', () => {
    const onChange = jest.fn();

    render(
      <Formik<{ startDate?: PartialDate }> initialValues={{}} onSubmit={noop}>
        {form => {
          onChange(form.values.startDate);

          return (
            <FormFieldDateInput
              legend="Start date"
              id="startDate"
              name="startDate"
              type="partialDate"
            />
          );
        }}
      </Formik>,
    );

    fireEvent.change(screen.getByLabelText('Day'), {
      target: {
        value: 15,
      },
    });

    fireEvent.change(screen.getByLabelText('Month'), {
      target: {
        value: 6,
      },
    });

    fireEvent.change(screen.getByLabelText('Year'), {
      target: {
        value: 2020,
      },
    });

    expect(screen.getByLabelText('Day')).toHaveValue(15);
    expect(screen.getByLabelText('Month')).toHaveValue(6);
    expect(screen.getByLabelText('Year')).toHaveValue(2020);

    expect(onChange).toHaveBeenCalledWith({
      day: 15,
      month: 6,
      year: 2020,
    });
  });

  test('can set only a day for a form value when `type = partialDate`', () => {
    const onChange = jest.fn();

    render(
      <Formik<{ startDate?: PartialDate }> initialValues={{}} onSubmit={noop}>
        {form => {
          onChange(form.values.startDate);

          return (
            <FormFieldDateInput
              legend="Start date"
              id="startDate"
              name="startDate"
              type="partialDate"
            />
          );
        }}
      </Formik>,
    );

    fireEvent.change(screen.getByLabelText('Day'), {
      target: {
        value: 15,
      },
    });

    expect(screen.getByLabelText('Day')).toHaveValue(15);

    expect(onChange).toHaveBeenCalledWith({
      day: 15,
    });
  });

  test('can set an invalid PartialDate as a form value when `type = partialDate`', () => {
    const onChange = jest.fn();

    render(
      <Formik<{ startDate?: PartialDate }> initialValues={{}} onSubmit={noop}>
        {form => {
          onChange(form.values.startDate);

          return (
            <FormFieldDateInput
              legend="Start date"
              id="startDate"
              name="startDate"
              type="partialDate"
            />
          );
        }}
      </Formik>,
    );

    fireEvent.change(screen.getByLabelText('Day'), {
      target: {
        value: 32,
      },
    });

    fireEvent.change(screen.getByLabelText('Month'), {
      target: {
        value: 6,
      },
    });

    fireEvent.change(screen.getByLabelText('Year'), {
      target: {
        value: 2020,
      },
    });

    expect(screen.getByLabelText('Day')).toHaveValue(32);
    expect(screen.getByLabelText('Month')).toHaveValue(6);
    expect(screen.getByLabelText('Year')).toHaveValue(2020);

    expect(onChange).toHaveBeenCalledWith({
      day: 32,
      month: 6,
      year: 2020,
    });
  });
});
