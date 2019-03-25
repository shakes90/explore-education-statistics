import React, { Component, createRef } from 'react';
import FormCheckbox, { CheckboxChangeEventHandler } from './FormCheckbox';
import FormFieldset, { FieldSetProps } from './FormFieldset';

export interface CheckboxOption {
  hint?: string;
  id: string;
  label: string;
  value: string;
}

export type FormCheckboxGroupProps = {
  name: string;
  onAllChange?: CheckboxChangeEventHandler;
  onChange?: CheckboxChangeEventHandler<any>;
  options: CheckboxOption[];
  selectAll?: boolean;
  value: string[];
} & FieldSetProps;

interface State {
  checkedCount: number;
}

/**
 * Basic checkbox group that should be used as a controlled component.
 * When using Formik, use {@see FormFieldRadioGroup} instead.
 */
class FormCheckboxGroup extends Component<FormCheckboxGroupProps, State> {
  public static defaultProps = {
    legendSize: 'm',
    selectAll: false,
    value: [],
  };

  private ref = createRef<HTMLDivElement>();

  public componentDidMount(): void {
    if (this.ref.current) {
      import('govuk-frontend/components/checkboxes/checkboxes').then(
        ({ default: GovUkCheckboxes }) => {
          new GovUkCheckboxes(this.ref.current).init();
        },
      );
    }
  }

  public render() {
    const { value, onAllChange, name, id, options, selectAll } = this.props;
    const isAllChecked = options.every(
      option => (value as string[]).indexOf(option.value) > -1,
    );

    return (
      <FormFieldset {...this.props}>
        <div className="govuk-checkboxes" ref={this.ref}>
          {selectAll && (
            <FormCheckbox
              id={`${id}-all`}
              label="Select all"
              name={name}
              value="select-all"
              checked={isAllChecked}
              onChange={event => {
                if (onAllChange) {
                  onAllChange(event);
                }
              }}
            />
          )}

          {options.map(option => (
            <FormCheckbox
              {...option}
              name={name}
              key={option.id}
              checked={value.indexOf(option.value) > -1}
              onChange={event => {
                if (this.props.onChange) {
                  this.props.onChange(event);
                }
              }}
            />
          ))}
        </div>
      </FormFieldset>
    );
  }
}

export default FormCheckboxGroup;
