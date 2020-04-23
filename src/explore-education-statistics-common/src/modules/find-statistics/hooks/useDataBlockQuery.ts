import { useErrorControl } from '@common/contexts/ErrorControlContext';
import useAsyncRetry, { AsyncRetryState } from '@common/hooks/useAsyncRetry';
import tableBuilderService, {
  TableDataResponse,
} from '@common/services/tableBuilderService';
import { DataBlock } from '@common/services/types/blocks';

interface DataBlockWithOptionalResponse extends DataBlock {
  dataBlockResponse?: TableDataResponse;
}

export default function useDataBlockQuery(
  dataBlock: DataBlockWithOptionalResponse | undefined,
): AsyncRetryState<TableDataResponse | undefined> {
  const { withoutErrorHandling } = useErrorControl();

  return useAsyncRetry<TableDataResponse | undefined>(async () => {
    if (!dataBlock) {
      return undefined;
    }

    const { dataBlockRequest, dataBlockResponse } = dataBlock;

    if (!dataBlockResponse) {
      return withoutErrorHandling(() =>
        tableBuilderService.getTableData(dataBlockRequest),
      );
    }

    return dataBlockResponse;
  }, [dataBlock]);
}
