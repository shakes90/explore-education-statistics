import { ChartBuilderForm } from '@admin/pages/release/datablocks/components/ChartBuilder';
import Button from '@common/components/Button';
import ErrorSummary from '@common/components/ErrorSummary';
import { Dictionary } from '@common/types';
import React, { MouseEventHandler } from 'react';

interface Props {
  disabled?: boolean;
  formId: string;
  forms: Dictionary<ChartBuilderForm>;
  showSubmitError: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ChartBuilderSaveButton = ({
  disabled,
  formId,
  forms,
  showSubmitError,
  onClick,
}: Props) => {
  return (
    <>
      <ErrorSummary
        title="Cannot save chart"
        id={`${formId}-errorSummary`}
        errors={
          showSubmitError
            ? Object.values(forms)
                .filter(form => !form.isValid)
                .map(form => ({
                  id: form.id,
                  message: `${form.title} tab is invalid`,
                }))
            : []
        }
        onErrorClick={event => {
          event.preventDefault();

          const tab = document.querySelector<HTMLAnchorElement>(
            `${event.currentTarget.getAttribute('href')}-tab`,
          );

          if (tab) {
            tab.click();

            const tabs = document.querySelector<HTMLDivElement>(
              '#chartBuilder-tabs',
            );

            if (tabs) {
              tabs.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }
        }}
      />

      <Button
        type="submit"
        id={`${formId}-submit`}
        disabled={disabled}
        onClick={onClick}
      >
        Save chart options
      </Button>
    </>
  );
};

export default ChartBuilderSaveButton;
