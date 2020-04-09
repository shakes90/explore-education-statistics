import DataBlockContentTabs from '@admin/pages/release/edit-release/manage-datablocks/components/DataBlockContentTabs';
import DataBlockSourceWizard, {
  SavedDataBlock,
} from '@admin/pages/release/edit-release/manage-datablocks/components/DataBlockSourceWizard';
import { manageDataBlocksRoute } from '@admin/routes/edit-release/routes';
import dataBlocksService, {
  ReleaseDataBlock,
} from '@admin/services/release/edit-release/datablocks/service';
import Button from '@common/components/Button';
import { FormSelect } from '@common/components/form';
import LoadingSpinner from '@common/components/LoadingSpinner';
import ModalConfirm from '@common/components/ModalConfirm';
import Tabs from '@common/components/Tabs';
import TabsSection from '@common/components/TabsSection';
import useAsyncRetry from '@common/hooks/useAsyncRetry';
import dataBlockService, {
  DataBlockResponse,
} from '@common/services/dataBlockService';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { DeleteDataBlockPlan } from '@admin/services/release/edit-release/datablocks/types';

export interface ReleaseManageDataBlocksPageParams {
  publicationId: string;
  releaseId: string;
  dataBlockId?: string;
}

interface SelectedDataBlock {
  dataBlock: ReleaseDataBlock;
  response: DataBlockResponse;
}

interface DeleteDataBlock {
  plan: DeleteDataBlockPlan;
  block: ReleaseDataBlock;
}

const emptyDataBlocks: ReleaseDataBlock[] = [];

const ReleaseManageDataBlocksPage = ({
  match,
  history,
}: RouteComponentProps<ReleaseManageDataBlocksPageParams>) => {
  const { publicationId, releaseId, dataBlockId } = match.params;

  const [activeTab, setActiveTab] = useState<string>('');

  const [isLoading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [selectedDataBlock, setSelectedDataBlock] = useState<
    SelectedDataBlock
  >();
  const [deleteDataBlock, setDeleteDataBlock] = useState<DeleteDataBlock>();

  const {
    value: dataBlocks = emptyDataBlocks,
    isLoading: isDataBlocksLoading,
    retry: fetchDataBlocks,
    setValue: setDataBlocks,
  } = useAsyncRetry(() => dataBlocksService.getDataBlocks(releaseId), [
    releaseId,
  ]);

  const dataBlockOptions = useMemo(
    () =>
      dataBlocks.map(({ name, id }, index) => ({
        label: `${name || index}`,
        value: `${id}`,
      })),
    [dataBlocks],
  );

  useEffect(() => {
    setLoading(true);

    if (!dataBlockId) {
      setSelectedDataBlock(undefined);
      setLoading(false);
      return;
    }

    if (isDataBlocksLoading) {
      return;
    }

    const dataBlock = dataBlocks.find(({ id }) => dataBlockId === id);

    if (!dataBlock) {
      history.push(
        manageDataBlocksRoute.generateLink({ publicationId, releaseId }),
      );
      return;
    }

    if (!dataBlock.dataBlockRequest) {
      return;
    }

    dataBlockService
      .getDataBlockForSubject(dataBlock.dataBlockRequest)
      .then(response => {
        if (response) {
          setSelectedDataBlock({
            dataBlock,
            response,
          });
        }
      });
  }, [
    dataBlockId,
    dataBlocks,
    history,
    isDataBlocksLoading,
    publicationId,
    releaseId,
  ]);

  const onDeleteDataBlock = useCallback(
    (dataBlock: DeleteDataBlock) => {
      setDeleteDataBlock(undefined);

      if (dataBlock.block) {
        dataBlocksService
          .deleteDataBlock(releaseId, dataBlock.block.id)
          .then(fetchDataBlocks)
          .then(() =>
            history.push(
              manageDataBlocksRoute.generateLink({ publicationId, releaseId }),
            ),
          );
      }
    },
    [fetchDataBlocks, history, publicationId, releaseId],
  );

  const onDataBlockSave = useMemo(
    () => async (dataBlock: SavedDataBlock) => {
      setIsSaving(true);

      let newDataBlock: ReleaseDataBlock;
      let newDataBlocks: ReleaseDataBlock[];

      if (dataBlock.id) {
        newDataBlock = await dataBlocksService.putDataBlock(
          dataBlock.id,
          dataBlock as ReleaseDataBlock,
        );

        newDataBlocks = [...dataBlocks];

        const currentBlockIndex = newDataBlocks.findIndex(
          db => db.id === newDataBlock.id,
        );

        if (currentBlockIndex > -1) {
          newDataBlocks[currentBlockIndex] = newDataBlock;
        }

        setDataBlocks(newDataBlocks);
        setIsSaving(false);
      } else {
        newDataBlock = await dataBlocksService.postDataBlock(
          releaseId,
          dataBlock,
        );

        setDataBlocks([...dataBlocks, newDataBlock]);
        setIsSaving(false);

        history.push(
          manageDataBlocksRoute.generateLink({
            publicationId,
            releaseId,
            dataBlockId: newDataBlock.id,
          }),
        );
      }
    },
    [dataBlocks, setDataBlocks, releaseId, history, publicationId],
  );

  const handleTableToolLoaded = useCallback(() => setLoading(false), []);

  return (
    <>
      {dataBlockOptions.length > 0 && (
        <FormSelect
          id="selectDataBlock"
          name="selectDataBlock"
          label="Select an existing data block to edit or create a new one"
          disabled={isLoading}
          order={[]}
          value={dataBlockId}
          optGroups={{
            'Create data block': [
              {
                label: 'Create new data block',
                value: '',
              },
            ],
            'Edit existing': dataBlockOptions,
          }}
          onChange={e => {
            history.push(
              manageDataBlocksRoute.generateLink({
                publicationId,
                releaseId,
                dataBlockId: e.target.value ? e.target.value : undefined,
              }),
            );
          }}
        />
      )}

      <hr />

      <div style={{ position: 'relative' }}>
        {(isLoading || isSaving) && (
          <LoadingSpinner
            text={`${isSaving ? 'Saving data block' : 'Loading data block'}`}
            overlay
          />
        )}

        <div>
          <h2>
            {selectedDataBlock && selectedDataBlock.dataBlock
              ? selectedDataBlock.dataBlock.name || 'title not set'
              : 'Create new data block'}
          </h2>

          <Tabs
            openId={activeTab}
            onToggle={tab => {
              setActiveTab(tab.id);
            }}
            id="manageDataBlocks"
          >
            <TabsSection
              title={
                selectedDataBlock && selectedDataBlock.dataBlock
                  ? 'Update data source'
                  : 'Create data source'
              }
            >
              <p>Configure the data source for the data block</p>

              {selectedDataBlock && selectedDataBlock.dataBlock && (
                <>
                  <div className="govuk-!-margin-top-4">
                    <Button
                      type="button"
                      onClick={() =>
                        dataBlocksService
                          .getDeleteBlockPlan(
                            releaseId,
                            selectedDataBlock.dataBlock.id,
                          )
                          .then(plan => {
                            setDeleteDataBlock({
                              plan,
                              block: selectedDataBlock.dataBlock,
                            });
                          })
                      }
                    >
                      Delete this data block
                    </Button>
                  </div>
                </>
              )}

              <ModalConfirm
                title="Delete data block"
                mounted={deleteDataBlock !== undefined}
                onConfirm={() =>
                  deleteDataBlock && onDeleteDataBlock(deleteDataBlock)
                }
                onExit={() => setDeleteDataBlock(undefined)}
                onCancel={() => setDeleteDataBlock(undefined)}
              >
                <p>Are you sure you wish to delete this data block?</p>
                {deleteDataBlock && (
                  <ul>
                    {deleteDataBlock.plan.dependentDataBlocks.map(block => (
                      <li key={block.name}>
                        <p>{block.name}</p>
                        {block.contentSectionHeading && (
                          <p>
                            {`It will be removed from the "${block.contentSectionHeading}" content section.`}
                          </p>
                        )}
                        {block.infographicFilenames.length > 0 && (
                          <p>
                            The following infographic files will also be
                            removed:
                            <ul>
                              {block.infographicFilenames.map(filename => (
                                <li key={filename}>
                                  <p>{filename}</p>
                                </li>
                              ))}
                            </ul>
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </ModalConfirm>

              <div style={{ overflow: 'hidden' }}>
                <DataBlockSourceWizard
                  dataBlock={selectedDataBlock?.dataBlock}
                  dataBlockResponse={selectedDataBlock?.response}
                  releaseId={releaseId}
                  onDataBlockSave={onDataBlockSave}
                  onTableToolLoaded={handleTableToolLoaded}
                />
              </div>
            </TabsSection>
            {!isLoading && selectedDataBlock && (
              <TabsSection title="Configure content">
                <DataBlockContentTabs
                  dataBlock={selectedDataBlock?.dataBlock}
                  dataBlockResponse={selectedDataBlock?.response}
                  releaseId={releaseId}
                  onDataBlockSave={onDataBlockSave}
                />
              </TabsSection>
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ReleaseManageDataBlocksPage;
