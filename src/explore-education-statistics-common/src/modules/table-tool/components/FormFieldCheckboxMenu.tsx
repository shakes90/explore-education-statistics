import DetailsMenu from '@common/components/DetailsMenu';
import {
  FormFieldCheckboxGroup,
  FormFieldCheckboxSearchGroup,
} from '@common/components/form';
import { FormFieldCheckboxSearchGroupProps } from '@common/components/form/FormFieldCheckboxSearchGroup';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import FormCheckboxSelectionCount from './FormCheckboxSelectedCount';

const FormFieldCheckboxMenu = <T extends {}>(
  props: FormFieldCheckboxSearchGroupProps<T>,
) => {
  const { name, options, legend } = props;
  const [open, setOpen] = useState(false);

  const [, meta] = useField(name);

  useEffect(() => {
    if (meta.error && meta.touched) {
      setOpen(true);
    }
  }, [meta.error, meta.touched]);

  return (
    <DetailsMenu
      open={open}
      jsRequired
      summary={
        <>
          {legend}
          <FormCheckboxSelectionCount name={name} />
        </>
      }
    >
      {options.length > 1 ? (
        <FormFieldCheckboxSearchGroup
          selectAll
          legendHidden
          {...props}
          name={name}
          options={options}
        />
      ) : (
        <FormFieldCheckboxGroup
          selectAll
          {...props}
          name={name}
          options={options}
        />
      )}
    </DetailsMenu>
  );
};

export default FormFieldCheckboxMenu;
