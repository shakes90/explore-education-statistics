import DataBlockDetailsForm, {
  DataBlockDetailsFormValues,
} from '@admin/pages/release/datablocks/components/DataBlockDetailsForm';
import { ReleaseDataBlock } from '@admin/services/dataBlockService';
import { generateTableTitle } from '@common/modules/table-tool/components/DataTableCaption';
import TableHeadersForm from '@common/modules/table-tool/components/TableHeadersForm';
import TableToolWizard, {
  InitialTableToolState,
} from '@common/modules/table-tool/components/TableToolWizard';
import TimePeriodDataTable from '@common/modules/table-tool/components/TimePeriodDataTable';
import WizardStep from '@common/modules/table-tool/components/WizardStep';
import WizardStepHeading from '@common/modules/table-tool/components/WizardStepHeading';
import { FullTable } from '@common/modules/table-tool/types/fullTable';
import { TableHeadersConfig } from '@common/modules/table-tool/types/tableHeaders';
import getDefaultTableHeaderConfig from '@common/modules/table-tool/utils/getDefaultTableHeadersConfig';
import mapFullTable from '@common/modules/table-tool/utils/mapFullTable';
import mapTableHeadersConfig from '@common/modules/table-tool/utils/mapTableHeadersConfig';
import { UnmappedTableHeadersConfig } from '@common/services/permalinkService';
import {
  ReleaseTableDataQuery,
  TableDataResponse,
} from '@common/services/tableBuilderService';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type DataBlockSourceWizardSaveHandler = (params: {
  details: DataBlockDetailsFormValues;
  table: FullTable;
  tableHeaders: TableHeadersConfig;
  query: ReleaseTableDataQuery;
}) => void;

interface DataBlockSourceWizardFinalStepProps {
  dataBlock?: ReleaseDataBlock;
  query: ReleaseTableDataQuery;
  table: TableDataResponse;
  tableHeaders?: UnmappedTableHeadersConfig;
  onSave: DataBlockSourceWizardSaveHandler;
}

const DataBlockSourceWizardFinalStep = ({
  dataBlock,
  query,
  table,
  tableHeaders,
  onSave,
}: DataBlockSourceWizardFinalStepProps) => {
  const dataTableRef = createRef<HTMLTableElement>();

  const [currentTableHeaders, setCurrentTableHeaders] = useState<
    TableHeadersConfig
  >();

  const [captionTitle, setCaptionTitle] = useState<string>(
    dataBlock?.heading ?? '',
  );

  const fullTable = useMemo(() => mapFullTable(table), [table]);

  useEffect(() => {
    const initialTableHeaders = tableHeaders
      ? mapTableHeadersConfig(tableHeaders, fullTable.subjectMeta)
      : getDefaultTableHeaderConfig(fullTable.subjectMeta);

    // Synchronize table headers if the table
    // has been changed by the user.
    setCurrentTableHeaders(initialTableHeaders);
  }, [fullTable.subjectMeta, tableHeaders]);

  const handleSubmit = useCallback(
    (details: DataBlockDetailsFormValues) => {
      if (currentTableHeaders) {
        onSave({
          details,
          table: fullTable,
          tableHeaders: currentTableHeaders,
          query,
        });
      }
    },
    [currentTableHeaders, onSave, query, table],
  );

  return (
    <>
      <div className="govuk-!-margin-bottom-4">
        <TableHeadersForm
          initialValues={currentTableHeaders}
          id="dataBlockSourceWizard-tableHeadersForm"
          onSubmit={async nextTableHeaders => {
            setCurrentTableHeaders(nextTableHeaders);

            if (dataTableRef.current) {
              dataTableRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }}
        />

        {currentTableHeaders && (
          <TimePeriodDataTable
            ref={dataTableRef}
            table={table}
            captionTitle={captionTitle}
            tableHeadersConfig={currentTableHeaders}
          />
        )}
      </div>

      <DataBlockDetailsForm
        initialValues={{
          heading: dataBlock?.heading ?? generateTableTitle(table.subjectMeta),
          highlightName: dataBlock?.highlightName ?? '',
          name: dataBlock?.name ?? '',
          source: dataBlock?.source ?? '',
        }}
        onTitleChange={setCaptionTitle}
        onSubmit={handleSubmit}
      />
    </>
  );
};

interface DataBlockSourceWizardProps {
  dataBlock?: ReleaseDataBlock;
  tableToolState: InitialTableToolState;
  onSave: DataBlockSourceWizardSaveHandler;
}

const DataBlockSourceWizard = ({
  dataBlock,
  tableToolState,
  onSave,
}: DataBlockSourceWizardProps) => {
  return (
    <div className="govuk-!-margin-bottom-8">
      <p>Configure data source for the data block</p>
      <TableToolWizard
        themeMeta={[]}
        initialState={tableToolState}
        finalStep={({ response, query }) => (
          <WizardStep>
            {wizardStepProps => (
              <>
                <WizardStepHeading {...wizardStepProps}>
                  {dataBlock ? 'Update data block' : 'Create data block'}
                </WizardStepHeading>

                {query && response && (
                  <DataBlockSourceWizardFinalStep
                    dataBlock={dataBlock}
                    query={query}
                    table={response}
                    tableHeaders={dataBlock?.table.tableHeaders}
                    onSave={onSave}
                  />
                )}
              </>
            )}
          </WizardStep>
        )}
      />
    </div>
  );
};

export default DataBlockSourceWizard;
