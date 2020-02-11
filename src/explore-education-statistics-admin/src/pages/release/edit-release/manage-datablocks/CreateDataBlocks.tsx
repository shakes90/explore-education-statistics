import DataBlockDetailsForm, {
  DataBlockDetailsFormValues,
} from '@admin/pages/release/edit-release/manage-datablocks/DataBlockDetailsForm';
import { mapDataBlockResponseToFullTable } from '@common/modules/find-statistics/components/util/tableUtil';
import { TableDataQuery } from '@common/modules/table-tool/services/tableBuilderService';
import { FullTable } from '@common/modules/table-tool/types/fullTable';
import getDefaultTableHeaderConfig, {
  TableHeadersConfig,
} from '@common/modules/table-tool/utils/tableHeaders';
import { generateTableTitle } from '@common/modules/table-tool/components/DataTableCaption';
import TableToolWizard, {
  TableToolState,
} from '@common/modules/table-tool/components/TableToolWizard';
import TimePeriodDataTable from '@common/modules/table-tool/components/TimePeriodDataTable';
import initialiseFromQuery from '@common/modules/table-tool/components/utils/initialiseFromQuery';
import WizardStep from '@common/modules/table-tool/components/WizardStep';
import WizardStepHeading from '@common/modules/table-tool/components/WizardStepHeading';
import {
  DataBlock,
  DataBlockResponse,
} from '@common/services/dataBlockService';
import React, { createRef, useEffect, useState } from 'react';

interface CreateDataBlockProps {
  releaseId: string;
  dataBlock?: DataBlock;
  dataBlockResponse?: DataBlockResponse;
  loading?: boolean;
  onDataBlockSave: (
    dataBlock: DataBlock,
    newDataBlockResponse?: TableToolState,
  ) => Promise<DataBlock>;
  onTableToolLoaded?: () => void;
}

const CreateDataBlocks = ({
  releaseId,
  dataBlock,
  dataBlockResponse,
  loading = false,
  onDataBlockSave,
  onTableToolLoaded,
}: CreateDataBlockProps) => {
  const dataTableRef = createRef<HTMLTableElement>();

  const [query, setQuery] = useState<TableDataQuery | undefined>(
    dataBlock?.dataBlockRequest,
  );
  const [table, setTable] = useState<FullTable | undefined>(
    dataBlockResponse && mapDataBlockResponseToFullTable(dataBlockResponse),
  );
  const [tableHeaders, setTableHeaders] = useState<TableHeadersConfig>();
  const [tableToolState, setTableToolState] = useState<TableToolState>();

  const [initialValues, setInitialValues] = useState<
    DataBlockDetailsFormValues
  >();

  useEffect(() => {
    if (dataBlock && dataBlockResponse) {
      if (dataBlock.dataBlockRequest) {
        initialiseFromQuery(dataBlock.dataBlockRequest, releaseId).then(
          state => {
            setTableToolState(state);

            if (onTableToolLoaded) {
              onTableToolLoaded();
            }
          },
        );
      }

      setQuery(dataBlock.dataBlockRequest);

      const dataTable = mapDataBlockResponseToFullTable(dataBlockResponse);
      setTable(dataTable);

      if (dataBlock?.tables && dataBlock.tables.length > 0) {
        setTableHeaders({
          ...dataBlock?.tables?.[0]?.tableHeaders,
        });
      } else {
        setTableHeaders(getDefaultTableHeaderConfig(dataTable.subjectMeta));
      }
    }
  }, [dataBlock, dataBlockResponse, onTableToolLoaded, releaseId]);

  useEffect(() => {
    if (!dataBlock) {
      setInitialValues({
        title: table ? generateTableTitle(table.subjectMeta) : '',
        name: '',
        source: '',
        customFootnotes: '',
      });
      return;
    }

    const {
      heading: title = '',
      name = '',
      source = '',
      customFootnotes = '',
    } = dataBlock;

    setInitialValues({
      title,
      name,
      source,
      customFootnotes,
    });
  }, [dataBlock, table]);

  return !loading ? (
    <TableToolWizard
      releaseId={releaseId}
      themeMeta={[]}
      initialState={tableToolState}
      onTableCreated={response => {
        setQuery(response.query);
        setTable(response.table);
        setTableHeaders(response.tableHeaders);
      }}
      finalStep={() => (
        <WizardStep>
          {wizardStepProps => (
            <>
              <WizardStepHeading {...wizardStepProps}>
                Data block details
              </WizardStepHeading>

              {query && tableHeaders && (
                <DataBlockDetailsForm
                  initialValues={initialValues}
                  query={query}
                  tableHeaders={tableHeaders}
                  initialDataBlock={dataBlock}
                  releaseId={releaseId}
                  onDataBlockSave={db => onDataBlockSave(db)}
                >
                  {table && tableHeaders && (
                    <div className="govuk-!-margin-bottom-4">
                      <div className="govuk-width-container">
                        <TimePeriodDataTable
                          ref={dataTableRef}
                          fullTable={table}
                          tableHeadersConfig={tableHeaders}
                        />
                      </div>
                    </div>
                  )}
                </DataBlockDetailsForm>
              )}
            </>
          )}
        </WizardStep>
      )}
    />
  ) : null;
};

export default CreateDataBlocks;
