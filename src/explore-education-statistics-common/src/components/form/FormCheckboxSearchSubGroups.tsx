import ButtonText from '@common/components/ButtonText';
import FormCheckboxGroup, {
  CheckboxGroupAllChangeEvent,
  CheckboxOption,
  FormCheckboxGroupProps,
} from '@common/components/form/FormCheckboxGroup';
import FormFieldset, {
  FormFieldsetProps,
} from '@common/components/form/FormFieldset';
import useMounted from '@common/hooks/useMounted';
import { OmitStrict } from '@common/types';
import React, {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styles from './FormCheckboxSearchSubGroups.module.scss';
import FormTextSearchInput from './FormTextSearchInput';

export interface FormCheckboxSearchSubGroupsProps
  extends OmitStrict<
    FormCheckboxGroupProps,
    'onAllChange' | 'selectAll' | 'selectAllText' | 'options'
  > {
  options: {
    id?: string;
    legend: string;
    options: CheckboxOption[];
  }[];
  onAllChange?: (
    event: MouseEvent<HTMLButtonElement>,
    checked: boolean,
  ) => void;
  onSubGroupAllChange?: (
    event: CheckboxGroupAllChangeEvent,
    checked: boolean,
    options: CheckboxOption[],
  ) => void;
  searchLabel?: string;
}

const FormCheckboxSearchSubGroups = ({
  searchLabel = 'Search options',
  onAllChange,
  onSubGroupAllChange,
  ...props
}: FormCheckboxSearchSubGroupsProps) => {
  const {
    id,
    legend,
    hint,
    legendHidden,
    legendSize,
    error,
    name,
    onFieldsetFocus,
    onFieldsetBlur,
    options = [],
    value = [],
    ...groupProps
  } = props;

  const fieldsetProps: FormFieldsetProps = {
    id,
    legend,
    legendHidden,
    legendSize,
    hint,
    error,
    onFocus: onFieldsetFocus,
    onBlur: onFieldsetBlur,
  };

  const { isMounted, onMounted } = useMounted();

  const [searchTerm, setSearchTerm] = useState('');

  const totalOptions = useMemo(
    () => options.reduce((acc, group) => acc + group.options.length, 0),
    [options],
  );

  const isAllChecked = useMemo(
    () =>
      options.every(group =>
        group.options.every(option => value.includes(option.value)),
      ),
    [options, value],
  );

  const handleAllGroupsChange: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      if (onAllChange) {
        onAllChange(event, isAllChecked);
      }
    },
    [isAllChecked, onAllChange],
  );

  let filteredOptions = options;

  if (searchTerm) {
    const lowercaseSearchTerm = searchTerm.toLowerCase();

    filteredOptions = options
      .filter(optionGroup =>
        optionGroup.options.some(
          option =>
            value.indexOf(option.value) > -1 ||
            option.label.toLowerCase().includes(lowercaseSearchTerm),
        ),
      )
      .map(optionGroup => ({
        ...optionGroup,
        options: optionGroup.options.filter(
          option =>
            value.indexOf(option.value) > -1 ||
            option.label.toLowerCase().includes(lowercaseSearchTerm),
        ),
      }));
  }

  return (
    <FormFieldset {...fieldsetProps}>
      {isMounted && (
        <>
          {totalOptions > 1 && (
            <ButtonText
              id={`${id}-all`}
              className="govuk-!-margin-bottom-4"
              underline={false}
              onClick={handleAllGroupsChange}
            >
              {`${
                isAllChecked ? 'Unselect' : 'Select'
              } all ${totalOptions} options`}
            </ButtonText>
          )}

          <FormTextSearchInput
            id={`${id}-search`}
            name={`${name}-search`}
            label={searchLabel}
            width={20}
            onChange={event => setSearchTerm(event.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }}
          />
        </>
      )}

      <div
        aria-live={onMounted('assertive')}
        className={styles.optionsContainer}
      >
        {filteredOptions.map((optionGroup, index) => (
          <FormCheckboxGroup
            {...groupProps}
            key={optionGroup.legend}
            name={name}
            id={optionGroup.id ? optionGroup.id : `${id}-${index + 1}`}
            legend={optionGroup.legend}
            legendSize="s"
            options={optionGroup.options}
            value={value}
            selectAll
            selectAllText={(allChecked, opts) =>
              `${allChecked ? 'Unselect' : 'Select'} all ${
                opts.length
              } subgroup options`
            }
            onAllChange={(event, checked) => {
              if (onSubGroupAllChange) {
                onSubGroupAllChange(event, checked, optionGroup.options);
              }
            }}
          />
        ))}
      </div>
    </FormFieldset>
  );
};

export default FormCheckboxSearchSubGroups;
