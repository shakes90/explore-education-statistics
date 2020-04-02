import useAsyncCallback, {
  AsyncCallbackState,
  AsyncState,
} from '@common/hooks/useAsyncCallback';
import { DependencyList, useCallback, useEffect } from 'react';

export interface AsyncRetryState<T> extends AsyncCallbackState<T> {
  retry: () => void;
}

/**
 * Runs an asynchronous task on component render
 * and provides a `retry` method if you want
 * to try and re-run the task later.
 */
export default function useAsyncRetry<T>(
  task: () => Promise<T>,
  deps: DependencyList = [],
  initialState?: AsyncState<T>,
): AsyncRetryState<T> {
  const [state, run] = useAsyncCallback<T, []>(task, deps, initialState);
  const { isLoading } = state;

  useEffect(() => {
    run();
  }, [run]);

  const retry = useCallback(async () => {
    if (!isLoading) {
      await run();
    }
  }, [isLoading, run]);

  return {
    ...state,
    retry,
  };
}