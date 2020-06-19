import FormField, {
  FormFieldComponentProps,
} from '@common/components/form/FormField';
import { OmitStrict } from '@common/types';
import React from 'react';
import FormCheckboxSearchSubGroups, {
  FormCheckboxSearchSubGroupsProps,
} from './FormCheckboxSearchSubGroups';
import FormFieldCheckboxSearchGroup from './FormFieldCheckboxSearchGroup';
import handleAllChange from './util/handleAllCheckboxChange';

export type FormFieldCheckboxSearchSubGroupsProps<FormValues> = OmitStrict<
  FormFieldComponentProps<FormCheckboxSearchSubGroupsProps, FormValues>,
  'formGroup'
>;

const FormFieldCheckboxSearchSubGroups = <FormValues extends {}>(
  props: FormFieldCheckboxSearchSubGroupsProps<FormValues>,
) => {
  const { options } = props;

  return (
    <>
      {options.length > 1 && (
        <FormField<string[]> {...props}>
          {({ field, helpers, meta }) => {
            return (
              <FormCheckboxSearchSubGroups
                {...props}
                {...field}
                small
                onAllChange={(event, checked) => {
                  if (event.isDefaultPrevented()) {
                    return;
                  }

                  handleAllChange({
                    checked,
                    meta,
                    helpers,
                    options: options.flatMap(group => group.options),
                  });
                }}
                onSubGroupAllChange={(event, checked, groupOptions) => {
                  if (props.onSubGroupAllChange) {
                    props.onSubGroupAllChange(event, checked, groupOptions);
                  }

                  if (event.isDefaultPrevented()) {
                    return;
                  }

                  handleAllChange({
                    checked,
                    meta,
                    helpers,
                    options: groupOptions,
                  });
                }}
                onChange={(event, option) => {
                  if (props.onChange) {
                    props.onChange(event, option);
                  }

                  if (event.isDefaultPrevented()) {
                    return;
                  }

                  field.onChange(event);
                }}
              />
            );
          }}
        </FormField>
      )}

      {options.length === 1 && (
        <FormFieldCheckboxSearchGroup
          {...props}
          onAllChange={(event, checked) => {
            if (props.onSubGroupAllChange) {
              props.onSubGroupAllChange(event, checked, options[0].options);
            }
          }}
          options={options[0].options}
        />
      )}
    </>
  );
};

export default FormFieldCheckboxSearchSubGroups;
