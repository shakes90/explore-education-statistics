import React from 'react';

import Details from '@common/components/Details';
import ChartRenderer from '@common/modules/find-statistics/components/ChartRenderer';
import { DataBlockResponse } from '@common/services/dataBlockService';
import { ChartDefinition } from '@common/modules/find-statistics/components/charts/ChartFunctions';
import ChartDataSelector, {
  DataUpdatedEvent,
} from '@admin/modules/chart-builder/ChartDataSelector';
import {
  ChartDataSet,
  DataLabelConfigurationItem,
  AxisConfigurationItem,
} from '@common/services/publicationService';
import { Dictionary } from '@common/types';
import LoadingSpinner from '@common/components/LoadingSpinner';
import styles from './graph-builder.module.scss';
import ConstData from '../../pages/prototypes/PrototypeData';
import ChartTypeSelector from './ChartTypeSelector';
import ChartDataConfiguration from './ChartDataConfiguration';
import ChartAxisConfiguration from './ChartAxisConfiguration';

interface Props {
  data: DataBlockResponse;
}

const ChartBuilder = ({ data }: Props) => {
  const [selectedChartType, selectChartType] = React.useState<
    ChartDefinition | undefined
  >();

  const { chartTypes } = ConstData;

  const indicatorIds = Object.keys(data.metaData.indicators);

  const filterIdCombinations: string[][] = Object.values(
    data.result.reduce((filterSet, result) => {
      const filterIds = Array.from(result.filters);

      return {
        ...filterSet,
        [filterIds.join('_')]: filterIds,
      };
    }, {}),
  );

  const [dataSets, setDataSets] = React.useState<ChartDataSet[]>([]);

  const onDataUpdated = (addedData: DataUpdatedEvent[]) => {
    setDataSets(addedData);
  };

  const [dataLabels, setDataLabels] = React.useState<
    Dictionary<DataLabelConfigurationItem>
  >({});

  const [axes, setAxes] = React.useState<Dictionary<AxisConfigurationItem>>({
    major: {
      name: '',
      groupBy: ['timePeriod'],
      dataSets: [],
    },
    minor: {
      name: '',
      groupBy: [],
      dataSets: [],
    },
  });

  React.useEffect(() => {
    setAxes({
      major: {
        name: '',
        groupBy: ['timePeriod'],
        dataSets,
      },
      minor: {
        name: '',
        groupBy: [],
        dataSets: [],
      },
    });
  }, [dataSets]);

  /*
  React.useEffect(() => {
    selectChartType(chartTypes[0]);
    setDataSets([
      {
        indicator: '23',
        filters: ['1', '71'],
      },
    ]);
  }, []);
   */

  return (
    <div className={styles.editor}>
      <Details summary="Select chart type" open>
        <ChartTypeSelector
          chartTypes={chartTypes}
          onSelectChart={selectChartType}
          selectedChartType={selectedChartType}
        />
      </Details>

      {selectedChartType && (
        <Details summary="Add data to chart" open>
          <ChartDataSelector
            onDataUpdated={onDataUpdated}
            metaData={data.metaData}
            indicatorIds={indicatorIds}
            filterIds={filterIdCombinations}
            chartType={selectedChartType}
          />
        </Details>
      )}

      {selectedChartType && dataSets.length > 0 && (
        <React.Fragment>
          <Details summary="Chart preview" open>
            <ChartRenderer
              type={selectedChartType.type}
              dataSets={dataSets}
              axes={axes}
              data={data}
              meta={data.metaData}
              dataLabels={dataLabels}
            />
          </Details>

          <Details summary="Data label options">
            <ChartDataConfiguration
              dataSets={dataSets}
              data={data}
              meta={data.metaData}
              onDataLabelsChange={setDataLabels}
            />
          </Details>

          <Details summary="Axes options" open>
            <p>
              Add / Remove and update the axes and how they display data ranges
            </p>
            {selectedChartType.axes.map(axis => (
              <ChartAxisConfiguration
                dataSets={dataSets}
                key={axis.id}
                meta={data.metaData}
                {...axis}
              />
            ))}
          </Details>
        </React.Fragment>
      )}
    </div>
  );
};

export default ChartBuilder;
