import {
  AxesConfiguration,
  AxisConfiguration,
  AxisType,
  ChartDataSet,
  ChartDefinition,
  ChartDefinitionAxis,
  chartDefinitions,
  DataSetConfiguration,
} from '@common/modules/charts/types/chart';
import { generateKeyFromDataSet } from '@common/modules/charts/util/chartUtils';
import { Chart } from '@common/services/publicationService';
import mapValues from 'lodash/mapValues';
import { useCallback, useMemo } from 'react';
import { Reducer, useImmerReducer } from 'use-immer';

export interface ChartOptions {
  stacked?: boolean;
  legend?: 'none' | 'top' | 'bottom';
  height: number;
  width?: number;
  title?: string;
  fileId?: string;
  geographicId?: string;
}

export interface ChartDataSetAndConfiguration {
  dataSet: ChartDataSet;
  configuration: DataSetConfiguration;
}

export interface ChartBuilderState {
  definition?: ChartDefinition;
  options: ChartOptions;
  dataSetAndConfiguration: ChartDataSetAndConfiguration[];
  axes: AxesConfiguration;
}

export type ChartBuilderActions =
  | {
      type: 'UPDATE_CHART_DEFINITION';
      payload: ChartDefinition;
    }
  | {
      type: 'ADD_DATA_SET';
      payload: ChartDataSetAndConfiguration;
    }
  | { type: 'REMOVE_DATA_SET'; payload: number }
  | {
      type: 'UPDATE_DATA_SETS';
      payload: ChartDataSetAndConfiguration[];
    }
  | {
      type: 'UPDATE_CHART_OPTIONS';
      payload: ChartOptions;
    }
  | {
      type: 'UPDATE_CHART_AXIS';
      payload: AxisConfiguration;
    };

export const chartBuilderReducer: Reducer<
  ChartBuilderState,
  ChartBuilderActions
> = (draft, action) => {
  switch (action.type) {
    case 'UPDATE_CHART_DEFINITION': {
      draft.definition = action.payload;

      draft.options = {
        // Set default options
        ...action.payload.options,
        title: '',
        ...draft.options,
      };

      draft.axes = mapValues(
        action.payload.axes,
        (axisDefinition: ChartDefinitionAxis, key: AxisType) => {
          const previousConfig = draft.axes[key] ?? {};

          return {
            min: 0,
            referenceLines: [],
            showGrid: true,
            size: 50,
            sortAsc: true,
            sortBy: 'name',
            tickConfig: 'default',
            tickSpacing: 1,
            visible: true,
            unit: '',
            ...(axisDefinition.defaults ?? {}),
            ...previousConfig,
            ...(axisDefinition.constants ?? {}),
            type: axisDefinition.type,
            dataSets:
              axisDefinition.type === 'major'
                ? draft.dataSetAndConfiguration.map(dsc => dsc.dataSet)
                : [],
          } as AxisConfiguration;
        },
      );

      break;
    }
    case 'UPDATE_CHART_AXIS':
      draft.axes[action.payload.type] = action.payload;
      break;
    case 'UPDATE_CHART_OPTIONS':
      draft.options = action.payload;
      break;
    case 'ADD_DATA_SET':
      draft.dataSetAndConfiguration.push(action.payload);
      break;
    case 'REMOVE_DATA_SET':
      draft.dataSetAndConfiguration.splice(action.payload, 1);
      break;
    case 'UPDATE_DATA_SETS':
      draft.dataSetAndConfiguration = action.payload;
      break;
    default:
      break;
  }
};

export function useChartBuilderReducer(initialConfiguration?: Chart) {
  const [state, dispatch] = useImmerReducer<
    ChartBuilderState,
    ChartBuilderActions
  >(
    chartBuilderReducer,
    {
      axes: initialConfiguration?.axes ?? {},
      definition: initialConfiguration
        ? chartDefinitions.find(
            ({ type }) => type === initialConfiguration.type,
          )
        : undefined,
      options: initialConfiguration ?? {
        height: 300,
        title: '',
      },
      dataSetAndConfiguration: [],
    },
    initial => {
      let dataSetAndConfiguration: ChartDataSetAndConfiguration[] = [];

      if (
        initialConfiguration?.axes?.major?.dataSets &&
        initialConfiguration?.labels
      ) {
        dataSetAndConfiguration = initialConfiguration.axes.major.dataSets
          .map(dataSet => {
            const key = generateKeyFromDataSet(dataSet);
            const configuration =
              initialConfiguration.labels && initialConfiguration.labels[key];
            return { dataSet, configuration };
          })
          .filter(
            dsc => typeof dsc.configuration !== 'undefined',
          ) as ChartDataSetAndConfiguration[];
      }

      return {
        ...initial,
        dataSetAndConfiguration,
      };
    },
  );

  const addDataSet = useCallback(
    (addedData: ChartDataSetAndConfiguration) => {
      dispatch({
        type: 'ADD_DATA_SET',
        payload: addedData,
      });
    },
    [dispatch],
  );

  const removeDataSet = useCallback(
    (removedData: ChartDataSetAndConfiguration, index: number) => {
      dispatch({
        type: 'REMOVE_DATA_SET',
        payload: index,
      });
    },
    [dispatch],
  );

  const updateDataSet = useCallback(
    (newData: ChartDataSetAndConfiguration[]) => {
      dispatch({
        type: 'UPDATE_DATA_SETS',
        payload: newData,
      });
    },
    [dispatch],
  );

  const updateChartDefinition = useCallback(
    (nextChartDefinition: ChartDefinition) => {
      dispatch({
        type: 'UPDATE_CHART_DEFINITION',
        payload: nextChartDefinition,
      });
    },
    [dispatch],
  );

  const updateChartOptions = useCallback(
    (chartOptions: ChartOptions) => {
      dispatch({
        type: 'UPDATE_CHART_OPTIONS',
        payload: chartOptions,
      });
    },
    [dispatch],
  );

  const updateChartAxis = useCallback(
    (axisConfiguration: AxisConfiguration) => {
      dispatch({
        type: 'UPDATE_CHART_AXIS',
        payload: axisConfiguration,
      });
    },
    [dispatch],
  );

  const actions = useMemo(
    () => ({
      addDataSet,
      removeDataSet,
      updateDataSet,
      updateChartDefinition,
      updateChartOptions,
      updateChartAxis,
    }),
    [
      addDataSet,
      removeDataSet,
      updateChartAxis,
      updateChartDefinition,
      updateChartOptions,
      updateDataSet,
    ],
  );

  return {
    state,
    dispatch,
    actions,
  };
}
