import { Form, FormFieldRadioGroup, Formik } from '@common/components/form';
import SummaryList from '@common/components/SummaryList';
import SummaryListItem from '@common/components/SummaryListItem';
import Yup from '@common/lib/validation/yup';
import { PublicationSubject } from '@common/services/tableBuilderService';
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { InjectedWizardProps } from './Wizard';
import WizardStepFormActions from './WizardStepFormActions';
import WizardStepHeading from './WizardStepHeading';

interface FormValues {
  subjectId: string;
}

export type PublicationSubjectFormSubmitHandler = (values: {
  subjectId: string;
  subjectName: string;
}) => void;

interface Props {
  onSubmit: PublicationSubjectFormSubmitHandler;
  options: PublicationSubject[];
}

const PublicationSubjectForm = (props: Props & InjectedWizardProps) => {
  const { isActive, onSubmit, options, goToNextStep } = props;
  const [subjectName, setSubjectName] = useState('');

  const formId = 'publicationSubjectForm';

  const stepHeading = (
    <WizardStepHeading {...props} fieldsetHeading>
      Choose a subject
    </WizardStepHeading>
  );

  const initialValues = {
    subjectId: '',
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={async ({ subjectId }) => {
        await onSubmit({
          subjectId,
          subjectName,
        });
        goToNextStep();
      }}
      initialValues={initialValues}
      validationSchema={Yup.object<FormValues>({
        subjectId: Yup.string().required('Choose a publication subject'),
      })}
      render={(form: FormikProps<FormValues>) => {
        return isActive ? (
          <Form {...form} id={formId}>
            <FormFieldRadioGroup<FormValues>
              name="subjectId"
              legend={stepHeading}
              options={options.map(option => ({
                label: option.label,
                value: `${option.id}`,
              }))}
              id={`${formId}-subjectId`}
              onChange={(event, option) => {
                setSubjectName(option.label);
              }}
            />

            <WizardStepFormActions
              {...props}
              form={form}
              formId={formId}
              onPreviousStep={() => {
                form.resetForm(initialValues);
                setSubjectName('');
              }}
            />
          </Form>
        ) : (
          <>
            {stepHeading}
            <SummaryList noBorder>
              <SummaryListItem term="Subject">{subjectName}</SummaryListItem>
            </SummaryList>
          </>
        );
      }}
    />
  );
};

export default PublicationSubjectForm;
