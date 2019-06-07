import HorizontalBarBlock from '@common/modules/find-statistics/components/charts/HorizontalBarBlock';
import LineChartBlock from '@common/modules/find-statistics/components/charts/LineChartBlock';
import { MapFeature } from '@common/modules/find-statistics/components/charts/MapBlock';
import VerticalBarBlock from '@common/modules/find-statistics/components/charts/VerticalBarBlock';
import {
  DataBlockData,
  DataBlockMetadata,
} from '@common/services/dataBlockService';
import {
  Axis,
  ChartType,
  ReferenceLine,
} from '@common/services/publicationService';
import dynamic from 'next-server/dynamic';
import React from 'react';

const DynamicMapBlock = dynamic(
  () => import('@common/modules/find-statistics/components/charts/MapBlock'),
  {
    ssr: false,
  },
);

export interface ChartRendererProps {
  type: ChartType;
  indicators: string[];
  data: DataBlockData;
  meta: DataBlockMetadata;
  xAxis?: Axis;
  yAxis?: Axis;
  height?: number;
  width?: number;
  stacked?: boolean;
  geometry?: MapFeature;
  referenceLines?: ReferenceLine[];
}

function ChartRenderer(props: ChartRendererProps) {
  const {
    data,
    geometry,
    height,
    width,
    meta,
    indicators,
    referenceLines,
    stacked,
    type,
    xAxis = { title: '' },
    yAxis = { title: '' },
  } = props;

  const labels = Object.entries(meta.indicators).reduce(
    (results, [key, indicator]) => ({ ...results, [key]: indicator.label }),
    {},
  );

  // TODO : Temporary sort on the results to get them in date order
  data.result.sort((a, b) => {
    if (a.year < b.year) {
      return -1;
    }

    if (a.year > b.year) {
      return 1;
    }

    return 0;
  });

  switch (type.toLowerCase()) {
    case 'line':
      return (
        <LineChartBlock
          chartDataKeys={indicators}
          data={data}
          meta={meta}
          labels={labels}
          xAxis={xAxis}
          yAxis={yAxis}
          height={height}
          width={width}
          referenceLines={referenceLines}
        />
      );
    case 'verticalbar':
      return (
        <VerticalBarBlock
          chartDataKeys={indicators}
          data={data}
          meta={meta}
          labels={labels}
          xAxis={xAxis}
          yAxis={yAxis}
          height={height}
          width={width}
          referenceLines={referenceLines}
        />
      );
    case 'horizontalbar':
      return (
        <HorizontalBarBlock
          chartDataKeys={indicators}
          data={data}
          meta={meta}
          labels={labels}
          xAxis={xAxis}
          yAxis={yAxis}
          height={height}
          width={width}
          stacked={stacked}
          referenceLines={referenceLines}
        />
      );
    case 'map':
      return (
        <DynamicMapBlock
          chartDataKeys={indicators}
          data={data}
          meta={meta}
          labels={labels}
          xAxis={xAxis}
          yAxis={yAxis}
          height={height}
          width={width}
          geometry={geometry}
        />
      );
    default:
      return <div>[ Unimplemented chart type requested ${type} ]</div>;
  }
}

export default ChartRenderer;
