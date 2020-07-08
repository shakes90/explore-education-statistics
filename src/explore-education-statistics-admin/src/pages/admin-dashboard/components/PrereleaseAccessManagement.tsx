import useFormSubmit from '@admin/hooks/useFormSubmit';
import preReleaseContactService, {
  PrereleaseContactDetails,
} from '@admin/services/preReleaseContactService';
import { Release } from '@admin/services/releaseService';
import Button from '@common/components/Button';
import ButtonText from '@common/components/ButtonText';
import Form from '@common/components/form/Form';
import FormFieldset from '@common/components/form/FormFieldset';
import FormFieldTextInput from '@common/components/form/FormFieldTextInput';
import SummaryList from '@common/components/SummaryList';
import SummaryListItem from '@common/components/SummaryListItem';
import { mapFieldErrors } from '@common/validation/serverValidations';
import Yup from '@common/validation/yup';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';

interface FormValues {
  email: string;
}

const errorMappings = [
  mapFieldErrors<FormValues>({
    target: 'email',
    messages: {
      USER_ALREADY_EXISTS: 'User already exists',
    },
  }),
];

interface Model {
  preReleaseContactsForRelease: PrereleaseContactDetails[];
  inviting: boolean;
  removing: boolean;
}

interface Props {
  release: Release;
}

const PrereleaseAccessManagement = ({ release }: Props) => {
  const [model, setModel] = useState<Model>();

  useEffect(() => {
    preReleaseContactService
      .getPreReleaseContactsForRelease(release.id)
      .then(preReleaseContactsForRelease =>
        setModel({
          preReleaseContactsForRelease,
          inviting: false,
          removing: false,
        }),
      );
  }, [release.id]);

  const formId = `invitePrereleaseAccessUsers-${release.id}`;

  const inviteUserByEmail: (
    email: string,
    resetForm: () => void,
  ) => Promise<void> = async (email, resetForm) => {
    setModel({
      ...(model as Model),
      inviting: true,
    });

    await preReleaseContactService
      .addPreReleaseContactToRelease(release.id, email)
      .then(updatedContacts => {
        resetForm();

        setModel({
          preReleaseContactsForRelease: updatedContacts,
          inviting: false,
          removing: false,
        });
      });
  };

  const handleSubmit = useFormSubmit<FormValues>(async (values, actions) => {
    await inviteUserByEmail(values.email, actions.resetForm);
  }, errorMappings);

  return (
    <>
      {model && (
        <>
          <Formik<FormValues>
            enableReinitialize
            initialValues={{
              email: '',
            }}
            validationSchema={Yup.object<FormValues>({
              email: Yup.string().email('Enter a valid email address'),
            })}
            onSubmit={handleSubmit}
          >
            {() => {
              return (
                <Form id={formId}>
                  <FormFieldset
                    legend="Manage pre release access"
                    legendSize="s"
                    id={`pre-release-selection-${release.id}`}
                  >
                    <FormFieldTextInput<FormValues>
                      id={`${formId}-email`}
                      label="Invite a new user"
                      name="email"
                      disabled={model.inviting || model.removing}
                    />
                    <Button
                      type="submit"
                      className="govuk-!-margin-top-6 govuk-button--secondary"
                      disabled={model.inviting || model.removing}
                    >
                      {model.inviting && 'Inviting new user'}
                      {model.removing && 'Removing user'}
                      {!model.inviting && !model.removing && 'Invite new user'}
                    </Button>
                  </FormFieldset>
                </Form>
              );
            }}
          </Formik>

          <SummaryList>
            {model.preReleaseContactsForRelease.map(existingContact => (
              <SummaryListItem
                key={existingContact.email}
                term="Pre release access"
                actions={
                  <ButtonText
                    onClick={() => {
                      setModel({
                        ...model,
                        removing: true,
                      });

                      preReleaseContactService
                        .removePreReleaseContactFromRelease(
                          release.id,
                          existingContact.email,
                        )
                        .then(updatedContacts =>
                          setModel({
                            ...model,
                            preReleaseContactsForRelease: updatedContacts,
                            removing: false,
                          }),
                        );
                    }}
                  >
                    Remove
                  </ButtonText>
                }
              >
                {existingContact.email}
                {existingContact.invited && <> (invited)</>}
              </SummaryListItem>
            ))}
          </SummaryList>
        </>
      )}
    </>
  );
};

export default PrereleaseAccessManagement;
