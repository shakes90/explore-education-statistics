import {
  ReleaseDataFileRouteParams,
  ReleaseRouteParams,
  releaseDataRoute,
} from '@admin/routes/releaseRoutes';
import { generatePath, RouteComponentProps } from 'react-router';
import Link from '@admin/components/Link';
import LoadingSpinner from '@common/components/LoadingSpinner';
import useAsyncHandledRetry from '@common/hooks/useAsyncHandledRetry';
import releaseDataFileService from '@admin/services/releaseDataFileService';
import { Form, FormFieldTextInput } from '@common/components/form';
import Button from '@common/components/Button';
import Yup from '@common/validation/yup';
import { Formik } from 'formik';
import React from 'react';

interface EditSubjectFormValues {
  title: string;
}

const ReleaseDataFilePage = ({
  match: {
    params: { publicationId, releaseId, fileId },
  },
}: RouteComponentProps<ReleaseDataFileRouteParams>) => {
  const {
    value: dataFile,
    isLoading: dataFileLoading,
  } = useAsyncHandledRetry(
    () => releaseDataFileService.getDataFile(releaseId, fileId),
    [releaseId, fileId],
  );

  return (
    <>
      <Link
        className="govuk-!-margin-bottom-6"
        back
        to={generatePath<ReleaseRouteParams>(releaseDataRoute.path, {
          publicationId,
          releaseId,
        })}
      >
        Back
      </Link>
      <LoadingSpinner loading={dataFileLoading}>
        {dataFile && (
          <section>
            <h2>Edit data file details</h2>
            <Formik<EditSubjectFormValues>
              initialValues={{ title: dataFile.title }}
              validationSchema={Yup.object<EditSubjectFormValues>({
                title: Yup.string().required('Enter a subject title'),
              })}
              onSubmit={values =>
                console.log(
                  `Make request to change title of subject ${fileId} to ${values.title}`,
                )
              }
            >
              {form => {
                return (
                  <Form {...form} id="edit-data-file-form">
                    <FormFieldTextInput id="title" label="Title" name="title" />
                    <Button type="submit">Save changes</Button>
                  </Form>
                );
              }}
            </Formik>
          </section>
        )}
      </LoadingSpinner>
    </>
  );
};

export default ReleaseDataFilePage;
