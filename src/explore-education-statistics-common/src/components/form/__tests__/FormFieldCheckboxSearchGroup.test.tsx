import Yup from '@common/validation/yup';
import { fireEvent, render, wait } from '@testing-library/react';
import { Formik } from 'formik';
import React from 'react';
import FormFieldCheckboxSearchGroup from '../FormFieldCheckboxSearchGroup';

jest.mock('lodash/debounce');

describe('FormFieldCheckboxSearchGroup', () => {
  interface FormValues {
    test: string[];
  }

  test('checking option checks it', async () => {
    const { getByLabelText } = render(
      <Formik
        initialValues={{
          test: [],
        }}
        onSubmit={() => undefined}
      >
        {() => (
          <FormFieldCheckboxSearchGroup<FormValues>
            name="test"
            id="checkboxes"
            legend="Test checkboxes"
            options={[
              { id: 'checkbox-1', value: '1', label: 'Checkbox 1' },
              { id: 'checkbox-2', value: '2', label: 'Checkbox 2' },
              { id: 'checkbox-3', value: '3', label: 'Checkbox 3' },
            ]}
          />
        )}
      </Formik>,
    );

    const checkbox = getByLabelText('Checkbox 1') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    await wait();

    expect(checkbox.checked).toBe(true);
  });

  test('un-checking option un-checks it', async () => {
    const { getByLabelText } = render(
      <Formik
        initialValues={{
          test: ['1'],
        }}
        onSubmit={() => undefined}
      >
        {() => (
          <FormFieldCheckboxSearchGroup<FormValues>
            name="test"
            id="checkboxes"
            legend="Test checkboxes"
            options={[
              { id: 'checkbox-1', value: '1', label: 'Checkbox 1' },
              { id: 'checkbox-2', value: '2', label: 'Checkbox 2' },
              { id: 'checkbox-3', value: '3', label: 'Checkbox 3' },
            ]}
          />
        )}
      </Formik>,
    );

    const checkbox = getByLabelText('Checkbox 1') as HTMLInputElement;

    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);

    await wait();

    expect(checkbox.checked).toBe(false);
  });

  test('clicking `Select all 3 options` button checks all values', () => {
    const { getByLabelText, getByText } = render(
      <Formik
        initialValues={{
          test: [],
        }}
        onSubmit={() => undefined}
      >
        {() => (
          <FormFieldCheckboxSearchGroup<FormValues>
            name="test"
            id="checkboxes"
            legend="Test checkboxes"
            options={[
              { id: 'checkbox-1', value: '1', label: 'Checkbox 1' },
              { id: 'checkbox-2', value: '2', label: 'Checkbox 2' },
              { id: 'checkbox-3', value: '3', label: 'Checkbox 3' },
            ]}
            selectAll
          />
        )}
      </Formik>,
    );

    fireEvent.click(getByText('Select all 3 options'));

    expect((getByLabelText('Checkbox 1') as HTMLInputElement).checked).toBe(
      true,
    );
    expect((getByLabelText('Checkbox 2') as HTMLInputElement).checked).toBe(
      true,
    );
    expect((getByLabelText('Checkbox 3') as HTMLInputElement).checked).toBe(
      true,
    );
  });

  test('clicking `Unselect all 3 options` button un-checks all values', () => {
    const { getByLabelText, getByText } = render(
      <Formik
        initialValues={{
          test: ['1', '2', '3'],
        }}
        onSubmit={() => undefined}
      >
        {() => (
          <FormFieldCheckboxSearchGroup<FormValues>
            name="test"
            id="checkboxes"
            legend="Test checkboxes"
            selectAll
            options={[
              { id: 'checkbox-1', value: '1', label: 'Checkbox 1' },
              { id: 'checkbox-2', value: '2', label: 'Checkbox 2' },
              { id: 'checkbox-3', value: '3', label: 'Checkbox 3' },
            ]}
          />
        )}
      </Formik>,
    );

    const checkbox1 = getByLabelText('Checkbox 1') as HTMLInputElement;
    const checkbox2 = getByLabelText('Checkbox 2') as HTMLInputElement;
    const checkbox3 = getByLabelText('Checkbox 3') as HTMLInputElement;

    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(true);

    fireEvent.click(getByText('Unselect all 3 options'));

    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
  });

  test('checking all options renders the `Unselect all 3 options` button', async () => {
    const { getByLabelText, queryByText } = render(
      <Formik
        initialValues={{
          test: [],
        }}
        onSubmit={() => undefined}
      >
        {() => (
          <FormFieldCheckboxSearchGroup<FormValues>
            name="test"
            id="checkboxes"
            legend="Test checkboxes"
            selectAll
            options={[
              { id: 'checkbox-1', label: 'Checkbox 1', value: '1' },
              { id: 'checkbox-2', label: 'Checkbox 2', value: '2' },
              { id: 'checkbox-3', label: 'Checkbox 3', value: '3' },
            ]}
          />
        )}
      </Formik>,
    );

    const checkbox1 = getByLabelText('Checkbox 1') as HTMLInputElement;
    const checkbox2 = getByLabelText('Checkbox 2') as HTMLInputElement;
    const checkbox3 = getByLabelText('Checkbox 3') as HTMLInputElement;

    expect(checkbox1.checked).toBe(false);
    expect(queryByText('Select all 3 options')).not.toBeNull();
    expect(queryByText('Unselect all 3 options')).toBeNull();

    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
    fireEvent.click(checkbox3);

    await wait();

    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(true);

    expect(queryByText('Select all 3 options')).toBeNull();
    expect(queryByText('Unselect all 3 options')).not.toBeNull();
  });

  test('un-checking any options renders the `Select all 3 options` button ', async () => {
    const { getByLabelText, queryByText } = render(
      <Formik
        initialValues={{
          test: ['1', '2', '3'],
        }}
        onSubmit={() => undefined}
      >
        {() => (
          <FormFieldCheckboxSearchGroup<FormValues>
            name="test"
            id="checkboxes"
            legend="Test checkboxes"
            selectAll
            options={[
              { id: 'checkbox-1', label: 'Checkbox 1', value: '1' },
              { id: 'checkbox-2', label: 'Checkbox 2', value: '2' },
              { id: 'checkbox-3', label: 'Checkbox 3', value: '3' },
            ]}
          />
        )}
      </Formik>,
    );

    const checkbox = getByLabelText('Checkbox 1') as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
    expect(queryByText('Unselect all 3 options')).not.toBeNull();
    expect(queryByText('Select all 3 options')).toBeNull();

    fireEvent.click(checkbox);

    await wait();

    expect(checkbox.checked).toBe(false);
    expect(queryByText('Unselect all 3 options')).toBeNull();
    expect(queryByText('Select all 3 options')).not.toBeNull();
  });

  describe('error messages', () => {
    test('does not display validation message when checkboxes are untouched', async () => {
      const { queryByText } = render(
        <Formik
          initialValues={{
            test: [],
          }}
          onSubmit={() => undefined}
          validationSchema={Yup.object({
            test: Yup.array().required('Select at least one option'),
          })}
        >
          {() => (
            <FormFieldCheckboxSearchGroup<FormValues>
              name="test"
              id="checkboxes"
              legend="Test checkboxes"
              options={[
                { id: 'checkbox-1', value: '1', label: 'Checkbox 1' },
                { id: 'checkbox-2', value: '2', label: 'Checkbox 2' },
                { id: 'checkbox-3', value: '3', label: 'Checkbox 3' },
              ]}
            />
          )}
        </Formik>,
      );

      expect(queryByText('Select at least one option')).toBeNull();
    });

    test('displays validation message when no checkboxes are checked', async () => {
      const { getByLabelText, queryByText } = render(
        <Formik
          initialValues={{
            test: ['1'],
          }}
          initialTouched={{
            test: true,
          }}
          onSubmit={() => undefined}
          validationSchema={Yup.object({
            test: Yup.array().required('Select at least one option'),
          })}
        >
          {() => (
            <FormFieldCheckboxSearchGroup<FormValues>
              name="test"
              id="checkboxes"
              legend="Test checkboxes"
              options={[
                { id: 'checkbox-1', value: '1', label: 'Checkbox 1' },
                { id: 'checkbox-2', value: '2', label: 'Checkbox 2' },
                { id: 'checkbox-3', value: '3', label: 'Checkbox 3' },
              ]}
            />
          )}
        </Formik>,
      );

      const checkbox = getByLabelText('Checkbox 1') as HTMLInputElement;

      expect(checkbox.checked).toBe(true);
      expect(queryByText('Select at least one option')).toBeNull();

      fireEvent.click(checkbox);

      await wait();

      expect(checkbox.checked).toBe(false);
      expect(queryByText('Select at least one option')).not.toBeNull();
    });

    test('does not display validation message when `showError` is false', async () => {
      const { getByLabelText, queryByText } = render(
        <Formik
          initialValues={{
            test: ['1'],
          }}
          initialTouched={{
            test: true,
          }}
          onSubmit={() => undefined}
          validationSchema={Yup.object({
            test: Yup.array().required('Select at least one option'),
          })}
        >
          {() => (
            <FormFieldCheckboxSearchGroup<FormValues>
              name="test"
              id="checkboxes"
              legend="Test checkboxes"
              showError={false}
              options={[
                { id: 'checkbox-1', value: '1', label: 'Checkbox 1' },
                { id: 'checkbox-2', value: '2', label: 'Checkbox 2' },
                { id: 'checkbox-3', value: '3', label: 'Checkbox 3' },
              ]}
            />
          )}
        </Formik>,
      );

      const checkbox = getByLabelText('Checkbox 1') as HTMLInputElement;

      expect(checkbox.checked).toBe(true);
      expect(queryByText('Select at least one option')).toBeNull();

      fireEvent.click(checkbox);

      await wait();

      expect(checkbox.checked).toBe(false);
      expect(queryByText('Select at least one option')).toBeNull();
    });
  });

  test('providing a search term does not remove checkboxes that have already been checked', () => {
    jest.useFakeTimers();

    const { getAllByLabelText, getByLabelText } = render(
      <Formik
        initialValues={{
          test: ['1'],
        }}
        onSubmit={() => undefined}
      >
        {() => (
          <FormFieldCheckboxSearchGroup<FormValues>
            name="test"
            id="checkboxes"
            legend="Test checkboxes"
            searchLabel="Search options"
            options={[
              { id: 'checkbox-1', value: '1', label: 'Checkbox 1' },
              { id: 'checkbox-2', value: '2', label: 'Checkbox 2' },
              { id: 'checkbox-3', value: '3', label: 'Checkbox 3' },
            ]}
          />
        )}
      </Formik>,
    );

    const searchInput = getByLabelText('Search options') as HTMLInputElement;

    expect(getByLabelText('Checkbox 1')).toHaveAttribute('checked');

    fireEvent.change(searchInput, {
      target: {
        value: '2',
      },
    });

    jest.runAllTimers();

    expect(getAllByLabelText(/Checkbox/)).toHaveLength(2);
    expect(getByLabelText('Checkbox 1')).toHaveAttribute('checked');
    expect(getByLabelText('Checkbox 2')).not.toHaveAttribute('checked');
  });
});
