import ImporterStatus from '@admin/components/ImporterStatus';
import { ImportStatusCode } from '@admin/services/importService';
import releaseDataFileService, {
  DataFile,
  DeleteDataFilePlan,
} from '@admin/services/releaseDataFileService';
import releaseMetaFileService from '@admin/services/releaseMetaFileService';
import Accordion from '@common/components/Accordion';
import AccordionSection from '@common/components/AccordionSection';
import ButtonText from '@common/components/ButtonText';
import LoadingSpinner from '@common/components/LoadingSpinner';
import ModalConfirm from '@common/components/ModalConfirm';
import SummaryList from '@common/components/SummaryList';
import SummaryListItem from '@common/components/SummaryListItem';
import { format } from 'date-fns';
import remove from 'lodash/remove';
import React, { useEffect, useState } from 'react';

interface Props {
  releaseId: string;
  dataFiles: DataFile[];
  canUpdateRelease: boolean;
  reloadFiles: () => void;
}

interface DeleteDataFile {
  plan: DeleteDataFilePlan;
  file: DataFile;
}

const DataFileUploadsList = ({
  releaseId,
  dataFiles: providedDataFiles,
  canUpdateRelease,
  reloadFiles,
}: Props) => {
  const [dataFiles, setDataFiles] = useState<DataFile[]>([]);
  const [deleteDataFile, setDeleteDataFile] = useState<DeleteDataFile>();
  const [openedAccordions, setOpenedAccordions] = useState<string[]>([]);

  useEffect(() => {
    setDataFiles(providedDataFiles);
  }, [providedDataFiles]);

  const statusChangeHandler = async (
    dataFile: DataFile,
    importstatusCode: ImportStatusCode,
  ) => {
    setDataFiles(
      dataFiles.map(file =>
        file.filename !== dataFile.filename
          ? file
          : {
              ...file,
              canDelete:
                importstatusCode &&
                (importstatusCode === 'NOT_FOUND' ||
                  importstatusCode === 'COMPLETE' ||
                  importstatusCode === 'FAILED'),
            },
      ),
    );
  };

  const setDeleting = (dataFile: DeleteDataFile, deleting: boolean) => {
    setDataFiles(
      dataFiles.map(file =>
        file.filename !== dataFile.file.filename
          ? file
          : {
              ...file,
              isDeleting: deleting,
            },
      ),
    );
  };

  const handleDelete = async (dataFileToDelete: DeleteDataFile) => {
    setDeleting(dataFileToDelete, true);
    setDeleteDataFile(undefined);
    await releaseDataFileService
      .deleteDataFiles(releaseId, (deleteDataFile as DeleteDataFile).file)
      .then(() => {
        setDeleting(dataFileToDelete, false);
        reloadFiles();
      })
      .finally(() => {
        setDeleting(dataFileToDelete, false);
      });
  };

  if (dataFiles.length === 0) return null;

  const DeleteFileModal = () => {
    if (!deleteDataFile) {
      return null;
    }
    return (
      <ModalConfirm
        mounted={!!deleteDataFile}
        title="Confirm deletion of selected data files"
        onExit={() => setDeleteDataFile(undefined)}
        onCancel={() => setDeleteDataFile(undefined)}
        onConfirm={() => handleDelete(deleteDataFile)}
      >
        <p>This data will no longer be available for use in this release.</p>
        {deleteDataFile.plan.deleteDataBlockPlan.dependentDataBlocks.length >
          0 && (
          <p>
            The following data blocks will also be deleted:
            <ul>
              {deleteDataFile.plan.deleteDataBlockPlan.dependentDataBlocks.map(
                block => (
                  <li key={block.name}>
                    <p>{block.name}</p>
                    {block.contentSectionHeading && (
                      <p>
                        {`It will also be removed from the "${block.contentSectionHeading}" content section.`}
                      </p>
                    )}
                    {block.infographicFilesInfo.length > 0 && (
                      <p>
                        The following infographic files will also be removed:
                        <ul>
                          {block.infographicFilesInfo.map(finfo => (
                            <li key={finfo.filename}>
                              <p>{finfo.filename}</p>
                            </li>
                          ))}
                        </ul>
                      </p>
                    )}
                  </li>
                ),
              )}
            </ul>
          </p>
        )}
        {deleteDataFile.plan.footnoteIds.length > 0 && (
          <p>
            {`${deleteDataFile.plan.footnoteIds.length} ${
              deleteDataFile.plan.footnoteIds.length > 1
                ? 'footnotes'
                : 'footnote'
            } will be removed or updated.`}
          </p>
        )}
      </ModalConfirm>
    );
  };

  return (
    <>
      <hr />
      <h2 className="govuk-heading-m">Uploaded data files</h2>
      <Accordion
        id="uploaded-files"
        onToggleAll={openAll => {
          if (openAll) {
            setOpenedAccordions(
              dataFiles.map((dataFile, index) => {
                return `${dataFile.title}-${index}`;
              }),
            );
          } else {
            setOpenedAccordions([]);
          }
        }}
      >
        {dataFiles.map((dataFile, index) => {
          const accId = `${dataFile.title}-${index}`;
          return (
            <AccordionSection
              key={accId}
              heading={dataFile.title}
              onToggle={() => {
                if (openedAccordions.includes(accId)) {
                  setOpenedAccordions(
                    remove(openedAccordions, (item: string) => {
                      return item !== accId;
                    }),
                  );
                } else {
                  setOpenedAccordions([...openedAccordions, accId]);
                }
              }}
              open={openedAccordions.includes(accId)}
            >
              {dataFile.isDeleting && (
                <LoadingSpinner text="Deleting files" overlay />
              )}
              <SummaryList
                key={dataFile.filename}
                className="govuk-!-margin-bottom-9"
              >
                <SummaryListItem term="Subject title">
                  <h4 className="govuk-heading-m">{dataFile.title}</h4>
                </SummaryListItem>
                <SummaryListItem term="Data file">
                  <ButtonText
                    onClick={() =>
                      releaseDataFileService.downloadDataFile(
                        releaseId,
                        dataFile.filename,
                      )
                    }
                  >
                    {dataFile.filename}
                  </ButtonText>
                </SummaryListItem>
                <SummaryListItem term="Metadata file">
                  <ButtonText
                    onClick={() =>
                      releaseMetaFileService.downloadDataMetadataFile(
                        releaseId,
                        dataFile.metadataFilename,
                      )
                    }
                  >
                    {dataFile.metadataFilename}
                  </ButtonText>
                </SummaryListItem>
                <SummaryListItem term="Data file size">
                  {dataFile.fileSize.size.toLocaleString()}{' '}
                  {dataFile.fileSize.unit}
                </SummaryListItem>
                <SummaryListItem term="Number of rows">
                  {dataFile.rows.toLocaleString()}
                </SummaryListItem>

                <ImporterStatus
                  releaseId={releaseId}
                  dataFile={dataFile}
                  onStatusChangeHandler={statusChangeHandler}
                />
                <SummaryListItem term="Uploaded by">
                  <a href={`mailto:${dataFile.userName}`}>
                    {dataFile.userName}
                  </a>
                </SummaryListItem>
                <SummaryListItem term="Date uploaded">
                  {format(dataFile.created, 'd/M/yyyy HH:mm')}
                </SummaryListItem>
                {canUpdateRelease && dataFile.canDelete && (
                  <SummaryListItem
                    term="Actions"
                    actions={
                      <>
                        <ButtonText
                          className="govuk-!-margin-left-2"
                          onClick={() => {}}
                        >
                          Replace files
                        </ButtonText>
                        <ButtonText
                          className="govuk-!-margin-left-2"
                          onClick={() =>
                            releaseDataFileService
                              .getDeleteDataFilePlan(releaseId, dataFile)
                              .then(plan => {
                                setDeleteDataFile({
                                  plan,
                                  file: dataFile,
                                });
                              })
                          }
                        >
                          Delete files
                        </ButtonText>
                      </>
                    }
                  />
                )}
                <SummaryListItem term="File replacements">
                  {/* dataFile.fileReplacements */ [].length} file replacements
                </SummaryListItem>
              </SummaryList>
            </AccordionSection>
          );
        })}
      </Accordion>

      {DeleteFileModal()}
    </>
  );
};

export default DataFileUploadsList;
