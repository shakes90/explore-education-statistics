import useFormSubmit from '@admin/hooks/useFormSubmit';
import releaseDataFileService, {
  DataFile,
} from '@admin/services/releaseDataFileService';
import Button from '@common/components/Button';
import ButtonGroup from '@common/components/ButtonGroup';
import ButtonText from '@common/components/ButtonText';
import { Form, FormFieldset } from '@common/components/form';
import FormFieldFileInput from '@common/components/form/FormFieldFileInput';
import FormFieldTextInput from '@common/components/form/FormFieldTextInput';
import LoadingSpinner from '@common/components/LoadingSpinner';
import { mapFieldErrors } from '@common/validation/serverValidations';
import Yup from '@common/validation/yup';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';

interface FormValues {
  subjectTitle: string;
  dataFile: File | null;
  metadataFile: File | null;
}

const errorMappings = [
  mapFieldErrors<FormValues>({
    target: 'dataFile',
    messages: {
      CANNOT_OVERWRITE_DATA_FILE: 'Choose a unique data file name',
      DATA_AND_METADATA_FILES_CANNOT_HAVE_THE_SAME_NAME:
        'Choose a different file name for data and metadata files',
      DATA_FILE_CANNOT_BE_EMPTY: 'Choose a data file that is not empty',
      DATA_FILE_MUST_BE_CSV_FILE:
        'Data file must be a csv file with UTF-8 encoding',
      DATA_FILENAME_CANNOT_CONTAIN_SPACES_OR_SPECIAL_CHARACTERS:
        'Data filename cannot contain spaces or special characters',
    },
  }),
  mapFieldErrors<FormValues>({
    target: 'metadataFile',
    messages: {
      CANNOT_OVERWRITE_METADATA_FILE: 'Choose a unique metadata file name',
      METADATA_FILE_CANNOT_BE_EMPTY: 'Choose a metadata file that is not empty',
      META_FILE_MUST_BE_CSV_FILE:
        'Meta file must be a csv file with UTF-8 encoding',
      META_FILENAME_CANNOT_CONTAIN_SPACES_OR_SPECIAL_CHARACTERS:
        'Meta filename cannot contain spaces or special characters',
    },
  }),
  mapFieldErrors<FormValues>({
    target: 'subjectTitle',
    messages: {
      SUBJECT_TITLE_MUST_BE_UNIQUE: 'Subject title must be unique',
    },
  }),
];

interface Props {
  releaseId: string;
  formId?: string;
  dataFiles: DataFile[];
  canUpdateRelease: boolean;
  reloadFiles: () => void;
}

const DataFileUploadForm = ({
  releaseId,
  formId = 'dataFileUploadForm',
  dataFiles,
  canUpdateRelease,
  reloadFiles,
}: Props) => {
  const [isUploading, setIsUploading] = useState(false);

  const resetForm = (form: FormikHelpers<FormValues>) => {
    form.resetForm();

    document
      .querySelectorAll(`#${formId} input[type='file']`)
      .forEach(input => {
        const fileInput = input as HTMLInputElement;
        fileInput.value = '';
      });
  };

  const handleSubmit = useFormSubmit<FormValues>(async (values, actions) => {
    setIsUploading(true);
    await releaseDataFileService
      .uploadDataFiles(releaseId, {
        subjectTitle: values.subjectTitle,
        dataFile: values.dataFile as File,
        metadataFile: values.metadataFile as File,
      })
      .then(() => {
        setIsUploading(false);
        reloadFiles();
      })
      .finally(() => {
        setIsUploading(false);
      });
  }, errorMappings);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        subjectTitle: '',
        dataFile: null,
        metadataFile: null,
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object<FormValues>({
        subjectTitle: Yup.string()
          .required('Enter a subject title')
          .test('unique', 'Subject title must be unique', function unique(
            value: string,
          ) {
            if (!value) {
              return true;
            }
            return (
              dataFiles.find(
                f => f.title.toUpperCase() === value.toUpperCase(),
              ) === undefined
            );
          }),
        dataFile: Yup.mixed().required('Choose a data file'),
        metadataFile: Yup.mixed().required('Choose a metadata file'),
      })}
    >
      {form => {
        return (
          <Form id={formId}>
            {canUpdateRelease && (
              <>
                {isUploading && (
                  <LoadingSpinner text="Uploading files" overlay />
                )}
                <FormFieldset
                  id={`${formId}-allFieldsFieldset`}
                  legend="Add new data to release"
                >
                  <div className="govuk-inset-text">
                    <h2 className="govuk-heading-m">Before you start</h2>
                    <div className="govuk-list--bullet">
                      <li>
                        make sure your data has passed the screening checks in
                        our{' '}
                        <a href="https://github.com/dfe-analytical-services/ees-data-screener">
                          R Project
                        </a>{' '}
                      </li>
                      <li>
                        if your data doesn’t meet these standards, you won’t be
                        able to upload it to your release
                      </li>
                      <li>
                        if you have any issues uploading data and files, or
                        questions about data standards contact:{' '}
                        <a href="mailto:explore.statistics@education.gov.uk">
                          explore.statistics@education.gov.uk
                        </a>
                      </li>
                    </div>
                  </div>

                  <FormFieldTextInput<FormValues>
                    id={`${formId}-subjectTitle`}
                    name="subjectTitle"
                    label="Subject title"
                    width={20}
                  />

                  <FormFieldFileInput<FormValues>
                    id={`${formId}-dataFile`}
                    name="dataFile"
                    label="Upload data file"
                    formGroupClass="govuk-!-margin-top-6"
                  />

                  <FormFieldFileInput<FormValues>
                    id={`${formId}-metadataFile`}
                    name="metadataFile"
                    label="Upload metadata file"
                  />
                </FormFieldset>

                <ButtonGroup>
                  <Button type="submit" id="upload-data-files-button">
                    Upload data files
                  </Button>
                  <ButtonText onClick={() => resetForm(form)}>
                    Cancel
                  </ButtonText>
                </ButtonGroup>
              </>
            )}

            {typeof canUpdateRelease !== 'undefined' &&
              !canUpdateRelease &&
              'This release has been approved, and can no longer be updated.'}
          </Form>
        );
      }}
    </Formik>
  );
};

export default DataFileUploadForm;
