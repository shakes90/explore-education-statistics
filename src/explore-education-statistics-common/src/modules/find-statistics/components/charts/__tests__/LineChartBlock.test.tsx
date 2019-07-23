import React from 'react';

import { render } from 'react-testing-library';
import PrototypeData from '@common/modules/find-statistics/components/charts/__tests__/__data__/testBlockData';
import LineChartBlock from '../LineChartBlock';

jest.mock('recharts/lib/util/LogUtils');

const props = PrototypeData.AbstractChartProps;
const { axes } = props;

describe('LineChartBlock', () => {
  test('renders basic chart correctly', () => {
    const { container } = render(<LineChartBlock {...props} />);

    expect(container).toMatchSnapshot();

    // axes
    expect(
      container.querySelector('.recharts-cartesian-axis.xAxis'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.recharts-cartesian-axis.yAxis'),
    ).toBeInTheDocument();

    // grid & grid lines
    expect(
      container.querySelector('.recharts-cartesian-grid'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.recharts-cartesian-grid-horizontal'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.recharts-cartesian-grid-vertical'),
    ).toBeInTheDocument();

    expect(
      container.querySelector('.recharts-default-legend'),
    ).toBeInTheDocument();

    // expect there to be lines for all 3 data sets
    expect(
      Array.from(container.querySelectorAll('.recharts-line')).length,
    ).toBe(3);
  });

  test('major axis can be hidden', () => {
    const { container } = render(
      <LineChartBlock
        {...props}
        axes={{
          ...axes,
          major: {
            ...axes.major,
            visible: false,
          },
        }}
      />,
    );

    expect(
      container.querySelector('.recharts-cartesian-axis.xAxis'),
    ).not.toBeInTheDocument();
  });

  test('minor axis can be hidden', () => {
    const { container } = render(
      <LineChartBlock
        {...props}
        axes={{
          ...axes,
          minor: {
            ...axes.minor,
            visible: false,
          },
        }}
      />,
    );

    expect(
      container.querySelector('.recharts-cartesian-axis.yAxis'),
    ).not.toBeInTheDocument();
  });

  test('both axes can be hidden', () => {
    const { container } = render(
      <LineChartBlock
        {...props}
        axes={{
          ...axes,
          minor: {
            ...axes.minor,
            visible: false,
          },
          major: {
            ...axes.major,
            visible: false,
          },
        }}
      />,
    );

    expect(
      container.querySelector('.recharts-cartesian-axis.yAxis'),
    ).not.toBeInTheDocument();

    expect(
      container.querySelector('.recharts-cartesian-axis.xAxis'),
    ).not.toBeInTheDocument();
  });

  test('can hide legend', () => {
    const { container } = render(<LineChartBlock {...props} legend="none" />);

    expect(
      container.querySelector('.recharts-default-legend'),
    ).not.toBeInTheDocument();
  });

  test('can set dashed line styles', () => {
    const { container } = render(
      <LineChartBlock
        {...{
          ...props,
          labels: {
            '23_1_2_____': {
              ...PrototypeData.AbstractChartProps.labels['23_1_2_____'],
              lineStyle: 'dashed',
            },
          },
        }}
      />,
    );

    expect(
      container.querySelector('.recharts-line-curve[stroke-dasharray="5 5"]'),
    ).toBeInTheDocument();
  });

  test('can set dotted line styles', () => {
    const { container } = render(
      <LineChartBlock
        {...{
          ...props,
          labels: {
            '23_1_2_____': {
              ...PrototypeData.AbstractChartProps.labels['23_1_2_____'],
              lineStyle: 'dotted',
            },
          },
        }}
      />,
    );

    expect(
      container.querySelector('.recharts-line-curve[stroke-dasharray="2 2"]'),
    ).toBeInTheDocument();
  });

  test('can render major axis reference line', () => {
    const { container } = render(
      <LineChartBlock
        {...{
          ...props,
          axes: {
            ...props.axes,
            major: {
              ...props.axes.major,
              referenceLines: [
                {
                  label: 'hello',
                  position: '2014/15',
                },
              ],
            },
          },
        }}
        legend="none"
      />,
    );

    expect(
      container.querySelector('.recharts-reference-line'),
    ).toBeInTheDocument();
  });
  test('can render minor axis reference line', () => {
    const { container } = render(
      <LineChartBlock
        {...{
          ...props,
          axes: {
            ...props.axes,
            minor: {
              ...props.axes.minor,
              referenceLines: [
                {
                  label: 'hello',
                  position: 0,
                },
              ],
            },
          },
        }}
        legend="none"
      />,
    );

    expect(
      container.querySelector('.recharts-reference-line'),
    ).toBeInTheDocument();
  });
});
