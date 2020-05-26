import MethodologySummaryForm from '@admin/pages/methodology/components/MethodologySummaryForm';
import { MethodologyRouteParams } from '@admin/routes/edit-methodology/routes';
import methodologyService from '@admin/services/methodology/methodologyService';
import LoadingSpinner from '@common/components/LoadingSpinner';
import useAsyncHandledRetry from '@common/hooks/useAsyncHandledRetry';
import {
  dateToDayMonthYear,
  dayMonthYearToDate,
} from '@common/utils/date/dayMonthYear';
import { formatISO } from 'date-fns';
import React from 'react';
import { RouteComponentProps } from 'react-router';

const MethodologySummaryEditPage = ({
  history,
  match,
}: RouteComponentProps<MethodologyRouteParams>) => {
  const { methodologyId } = match.params;

  const { value: methodology, isLoading } = useAsyncHandledRetry(async () => {
    return methodologyService.getMethodology(methodologyId);
  });

  return (
    <>
      <h2>Edit methodology summary</h2>

      <LoadingSpinner loading={isLoading}>
        {methodology && (
          <MethodologySummaryForm
            id="updateMethodologyForm"
            initialValues={{
              contactId: '',
              title: methodology.title,
              publishScheduled: dateToDayMonthYear(
                new Date(methodology.publishScheduled),
              ),
            }}
            submitText="Update methodology"
            onSubmit={async values => {
              await methodologyService.updateMethodology(methodologyId, {
                ...methodology,
                title: values.title,
                publishScheduled: formatISO(
                  dayMonthYearToDate(values.publishScheduled),
                ),
                contactId: values.contactId,
              });

              history.push(`/methodologies/${methodologyId}/summary`);
            }}
            onCancel={history.goBack}
          />
        )}
      </LoadingSpinner>
    </>
  );
};

export default MethodologySummaryEditPage;