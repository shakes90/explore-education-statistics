import DetailsMenu from '@common/components/DetailsMenu';
import FormFieldCheckboxSearchGroup from '@common/components/form/FormFieldCheckboxSearchGroup';
import FormFieldCheckboxSearchSubGroups, {
  FormFieldCheckboxSearchSubGroupsProps,
} from '@common/components/form/FormFieldCheckboxSearchSubGroups';
import FormCheckboxSelectionCount from '@frontend/prototypes/table-tool/components/FormCheckboxSelectedCount';
import React, { useEffect, useState } from 'react';

const FormFieldCheckboxGroupsMenu = <T extends {}>(
  props: FormFieldCheckboxSearchSubGroupsProps<T>,
) => {
  const { error, name, options, legend } = props;
  const [open, setOpen] = useState();

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <DetailsMenu
      open={open}
      summary={
        <>
          {legend}
          <FormCheckboxSelectionCount name={name} />
        </>
      }
    >
      {options.length > 1 && (
        <FormFieldCheckboxSearchSubGroups {...props} hideCount legendHidden />
      )}

      {options.length === 1 && (
        <FormFieldCheckboxSearchGroup
          {...props}
          selectAll
          options={options[0].options}
        />
      )}
    </DetailsMenu>
  );
};

export default FormFieldCheckboxGroupsMenu;
