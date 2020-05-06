import useFormSubmit from '@admin/hooks/useFormSubmit';
import editReleaseDataService, {
  ChartFile,
} from '@admin/services/release/edit-release/data/editReleaseDataService';
import Button from '@common/components/Button';
import { Formik } from '@common/components/form';
import Form from '@common/components/form/Form';
import FormFieldFileInput from '@common/components/form/FormFieldFileInput';
import FormFieldTextInput from '@common/components/form/FormFieldTextInput';
import { errorCodeToFieldError } from '@common/components/form/util/serverValidationHandler';
import ModalConfirm from '@common/components/ModalConfirm';
import SummaryList from '@common/components/SummaryList';
import SummaryListItem from '@common/components/SummaryListItem';
import useAsyncRetry from '@common/hooks/useAsyncRetry';
import useToggle from '@common/hooks/useToggle';
import Yup from '@common/validation/yup';
import { FormikProps } from 'formik';
import React, { useState } from 'react';

const errorCodeMappings = [
  errorCodeToFieldError('FILE_TYPE_INVALID', 'file', 'Choose an image file'),
  errorCodeToFieldError(
    'CANNOT_OVERWRITE_FILE',
    'file',
    'Choose a unique file',
  ),
];

interface FormValues {
  name: string;
  file: File | null;
  fileId: string;
}

interface Props {
  canSaveChart: boolean;
  releaseId: string;
  fileId?: string;
  subjectName: string;
  onSubmit: (fileId: string) => void;
  onDelete: (fileId: string) => void;
}

const formId = 'fileUploadForm';

const InfographicChartForm = ({
  canSaveChart,
  releaseId,
  fileId = '',
  subjectName,
  onDelete,
  onSubmit,
}: Props) => {
  const [uploading, setUploading] = useState(false);
  const [deleteFile, toggleDeleteFile] = useToggle(false);

  const { value: files = [], retry: refreshFiles } = useAsyncRetry<ChartFile[]>(
    () => editReleaseDataService.getChartFiles(releaseId),
    [releaseId],
  );

  const handleSubmit = useFormSubmit<FormValues>(async values => {
    if (values.file) {
      setUploading(true);

      try {
        await editReleaseDataService.uploadChartFile(releaseId, {
          name: values.name,
          file: values.file as File,
        });
        await refreshFiles();

        onSubmit((values.file as File).name);
      } finally {
        setUploading(false);
      }
    }
  }, errorCodeMappings);

  const selectedFile = files.find(fileOption => fileOption.filename === fileId);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        name: '',
        file: null,
        fileId: fileId || '',
      }}
      validationSchema={Yup.object<FormValues>({
        name: Yup.string().required('Enter a name'),
        file: Yup.mixed().required('Choose a file'),
        fileId: Yup.string(),
      })}
      onSubmit={handleSubmit}
      render={(form: FormikProps<FormValues>) => {
        return (
          <Form id={formId}>
            {fileId && selectedFile && (
              <>
                <SummaryList>
                  <SummaryListItem term="Name">
                    {selectedFile.title}
                  </SummaryListItem>
                  <SummaryListItem term="Filename">{fileId}</SummaryListItem>
                </SummaryList>

                <Button
                  disabled={!canSaveChart}
                  variant="warning"
                  onClick={toggleDeleteFile.on}
                >
                  Delete infographic
                </Button>

                <ModalConfirm
                  mounted={deleteFile}
                  title="Confirm deletion of infographic"
                  onExit={toggleDeleteFile.off}
                  onCancel={toggleDeleteFile.off}
                  onConfirm={async () => {
                    await editReleaseDataService.deleteChartFile(
                      releaseId,
                      form.values.fileId,
                      subjectName,
                    );
                    await refreshFiles();

                    onDelete(form.values.fileId);
                    toggleDeleteFile.off();
                  }}
                >
                  <p>
                    This data will no longer be available for use in this chart
                  </p>
                </ModalConfirm>
              </>
            )}

            {!fileId && (
              <>
                <FormFieldTextInput
                  id={`${formId}-name`}
                  name="name"
                  label="Select a name to give the file"
                  width={20}
                />

                <FormFieldFileInput<FormValues>
                  id={`${formId}-file`}
                  name="file"
                  label="Select a file to upload"
                />

                <Button
                  type="submit"
                  disabled={!form.values.file || !form.values.name || uploading}
                >
                  Upload
                </Button>
              </>
            )}
          </Form>
        );
      }}
    />
  );
};

export default InfographicChartForm;
