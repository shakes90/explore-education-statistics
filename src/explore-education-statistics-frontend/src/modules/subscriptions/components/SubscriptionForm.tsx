import { Form, Formik, FormikErrors, FormikProps, FormikTouched } from 'formik';
import React, { Component, createRef } from 'react';
import Button from 'src/components/Button';
import ErrorSummary, { ErrorSummaryMessage } from 'src/components/ErrorSummary';
import createErrorHelper from 'src/lib/validation/createErrorHelper';
import Yup from 'src/lib/validation/yup';
import { FormFieldset, FormFieldTextInput } from "../../../components/form";

interface FormValues {
  email: string;
}

export type SubscriptionFormSubmitHandler = (
  values: FormValues,
) => void;

interface Props {
  onSubmit: SubscriptionFormSubmitHandler;
}

interface State {
  isSubmitted: boolean;
  submitError: string;
}

class SubscriptionForm extends Component<Props, State> {

  public state: State = {
    isSubmitted: false,
    submitError: '',
  };

  private ref = createRef<HTMLDivElement>();

  private getSummaryErrors(
    errors: FormikErrors<FormValues>,
    touched: FormikTouched<FormValues>,
  ) {
    const summaryErrors: ErrorSummaryMessage[] = Object.entries(errors)
      .filter(([errorName]) => touched[errorName as keyof FormValues])
      .map(([errorName, message]) => ({
        id: `filter-${errorName}`,
        message: typeof message === 'string' ? message : '',
      }));

    if (this.state.submitError) {
      summaryErrors.push({
        id: 'submit-button',
        message: 'Could not submit request. Please try again later.',
      });
    }

    return summaryErrors;
  }

  public render() {
    return (
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Email is required')
            .email("Please enter a valid email"),
        })}
        onSubmit={async (form, actions) => {
          try {
            await this.props.onSubmit(form);
          } catch (error) {
            this.setState({
              submitError: error.message,
            });
          }

          actions.setSubmitting(false);
        }}
        render={({
                   errors,
                   touched,
                   values,
                   ...form
                 }: FormikProps<FormValues>) => {
          const { getError } = createErrorHelper({ errors, touched });

          return (
            <div ref={this.ref}>
              <ErrorSummary
                errors={this.getSummaryErrors(errors, touched)}
                id="filter-errors"
              />

              <Form>

                <FormFieldset
                  id="email-address"
                  legend="Email address"
                  hint="Enter a valid email address."
                >
                  <FormFieldTextInput<FormValues>
                    id="email-id"
                    name="email"
                    width={20}
                  />
                </FormFieldset>

                <Button
                  disabled={form.isSubmitting}
                  id="submit-button"
                  onClick={event => {
                    event.preventDefault();

                    // Manually validate/submit so we can scroll
                    // back to the top of the form if there are errors
                    form.validateForm().then(validationErrors => {
                      form.submitForm();

                      if (
                        Object.keys(validationErrors).length > 0 &&
                        this.ref.current
                      ) {
                        this.ref.current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }
                    });
                  }}
                  type="submit"
                >
                  {form.isSubmitting && form.isValid
                    ? 'Submitting'
                    : 'Submit'}
                </Button>
              </Form>
            </div>
          );
        }}
      />
    );
  }
}

export default SubscriptionForm;
