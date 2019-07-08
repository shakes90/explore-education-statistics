import {
  ChartDataB,
  ChartDefinition,
  ChartProps,
  createDataForAxis,
  getKeysForChart,
  mapNameToNameLabel,
} from '@common/modules/find-statistics/components/charts/ChartFunctions';

import React, { Component } from 'react';
import {
  AxisDomain,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Symbols,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import LoadingSpinner from '@common/components/LoadingSpinner';

const CustomToolTip = ({ active, payload, label }: TooltipProps) => {
  if (active) {
    return (
      <div className="graph-tooltip">
        <p>{label}</p>
        {payload &&
          payload
            .sort((a, b) => {
              if (typeof b.value === 'number' && typeof a.value === 'number') {
                return b.value - a.value;
              }

              return 0;
            })
            .map((_, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <p key={index}>
                  {`${payload[index].name} : ${payload[index].value}`}
                </p>
              );
            })}
      </div>
    );
  }

  return null;
};

export default class LineChartBlock extends Component<ChartProps> {
  public static definition: ChartDefinition = {
    type: 'line',
    name: 'Line',

    data: [
      {
        type: 'line',
        title: 'Line',
        entryCount: 'multiple',
        targetAxis: 'xaxis',
      },
    ],

    axes: [
      {
        id: 'xaxis',
        title: 'X Axis',
        type: 'major',
        defaultDataType: 'timePeriod',
      },
      {
        id: 'yaxis',
        title: 'Y Axis',
        type: 'minor',
      },
    ],
  };

  public render() {
    const { data, height, axes, labels } = this.props;

    const yAxisDomain: [AxisDomain, AxisDomain] = [-10, 10];

    if (!axes.major || !data) return <LoadingSpinner />;

    const chartData: ChartDataB[] = createDataForAxis(
      axes.major,
      data.result,
    ).map(mapNameToNameLabel(labels));

    const keysForChart = getKeysForChart(chartData);

    return (
      <ResponsiveContainer width={900} height={height || 300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
        >
          <Tooltip content={CustomToolTip} />
          <Legend verticalAlign="top" height={36} />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            allowDuplicatedCategory={false}
            label={{
              offset: 5,
              position: 'bottom',
              value: '',
            }}
            padding={{ left: 20, right: 20 }}
            tickMargin={10}
          />
          <YAxis
            label={{
              angle: -90,
              offset: 0,
              position: 'left',
              value: '',
            }}
            scale="auto"
            domain={yAxisDomain}
            dataKey="value"
          />

          {keysForChart.map(name => (
            <Line
              key={name}
              dataKey={name}
              type="linear"
              isAnimationActive={false}
              legendType={labels[name] && labels[name].symbol}
              dot={
                labels[name] &&
                labels[name].symbol &&
                (props => (
                  <Symbols
                    {...props}
                    type={labels[name] && labels[name].symbol}
                  />
                ))
              }
              name={(labels[name] && labels[name].label) || name}
              stroke={labels[name] && labels[name].colour}
              fill={labels[name] && labels[name].colour}
              unit={(labels[name] && labels[name].unit) || ''}
              strokeWidth="2"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
