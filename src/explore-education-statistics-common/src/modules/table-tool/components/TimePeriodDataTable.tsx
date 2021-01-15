import ErrorBoundary from '@common/components/ErrorBoundary';
import WarningMessage from '@common/components/WarningMessage';
import useAsyncRetry from '@common/hooks/useAsyncRetry';
import Header from '@common/modules/table-tool/components/utils/Header';
import { TableHeadersConfig } from '@common/modules/table-tool/types/tableHeaders';
import { TableDataResponse } from '@common/services/tableBuilderService';
import React, { forwardRef, memo } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./workers/table.worker';
import DataTableCaption from './DataTableCaption';
import FixedMultiHeaderDataTable from './FixedMultiHeaderDataTable';

interface GeneratedTable {
  columnHeaders: Header[];
  rowHeaders: Header[];
  rows: string[][];
}

interface Props {
  captionTitle?: string;
  table: TableDataResponse;
  tableHeadersConfig: TableHeadersConfig;
  source?: string;
}

const TimePeriodDataTableInternal = forwardRef<HTMLElement, Props>(
  function TimePeriodDataTableInternal(
    { table, tableHeadersConfig, captionTitle, source }: Props,
    dataTableRef,
  ) {
    const { value } = useAsyncRetry<GeneratedTable>(() => {
      const worker = new Worker();

      return new Promise<GeneratedTable>(resolve => {
        worker.postMessage([tableHeadersConfig, table]);
        worker.onmessage = event => {
          resolve(event.data);
        };
      });
    });

    if (!value) {
      return null;
    }

    const { columnHeaders, rowHeaders, rows } = value;

    return (
      <FixedMultiHeaderDataTable
        caption={
          <DataTableCaption
            {...table.subjectMeta}
            title={captionTitle}
            id="dataTableCaption"
          />
        }
        columnHeaders={columnHeaders}
        rowHeaders={rowHeaders}
        rows={rows}
        ref={dataTableRef}
        footnotes={table.subjectMeta.footnotes}
        source={source}
      />
    );
  },
);

TimePeriodDataTableInternal.displayName = 'TimePeriodDataTableInternal';

const TimePeriodDataTable = forwardRef<HTMLElement, Props>((props, ref) => {
  return (
    <ErrorBoundary
      fallback={
        <WarningMessage>
          There was a problem rendering the table.
        </WarningMessage>
      }
    >
      <TimePeriodDataTableInternal {...props} ref={ref} />
    </ErrorBoundary>
  );
});

TimePeriodDataTable.displayName = 'TimePeriodDataTable';

export default memo(TimePeriodDataTable);
