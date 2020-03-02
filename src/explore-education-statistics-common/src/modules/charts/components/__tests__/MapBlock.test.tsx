import testData from '@common/modules/charts/components/__tests__/__data__/testBlockData';
import MapBlock from '@common/modules/charts/components/MapBlock';
import { render, wait } from '@testing-library/react';
import React from 'react';

describe('MapBlock', () => {
  test('renders', async () => {
    const { container } = render(
      <MapBlock
        {...{
          ...testData.AbstractMultipleChartProps,
          axes: {
            ...testData.AbstractMultipleChartProps.axes,
            major: {
              ...testData.AbstractMultipleChartProps.axes.major,
              groupBy: 'locations',
            },
          },
        }}
        height={600}
        width={900}
      />,
    );

    await wait();

    expect(container).toMatchSnapshot();
  });

  test('includes all locations in select', async () => {
    const { container } = render(
      <MapBlock
        {...{
          ...testData.AbstractMultipleChartProps,
          axes: {
            ...testData.AbstractMultipleChartProps.axes,
            major: {
              ...testData.AbstractMultipleChartProps.axes.major,
              groupBy: 'locations',
            },
          },
        }}
        height={600}
        width={900}
      />,
    );

    await wait();

    const select = container.querySelector('#selectedLocation');

    expect(select).toBeVisible();

    if (select) {
      expect(
        select.querySelector('option[value="E92000001"]'),
      ).toHaveTextContent('England');
      expect(
        select.querySelector('option[value="S92000001"]'),
      ).toHaveTextContent('Scotland');
    }
  });

  test('includes all indicators in select', async () => {
    const { container } = render(
      <MapBlock
        {...{
          ...testData.AbstractMultipleChartProps,
          axes: {
            ...testData.AbstractMultipleChartProps.axes,
            major: {
              ...testData.AbstractMultipleChartProps.axes.major,
              groupBy: 'locations',
            },
          },
        }}
        height={600}
        width={900}
      />,
    );

    await wait();

    const select = container.querySelector('#selectedIndicator');

    expect(select).toBeVisible();

    if (select) {
      expect(
        select.querySelector('option[value="28_1_2_____"]'),
      ).toHaveTextContent('Authorised absence rate');
      expect(
        select.querySelector('option[value="26_1_2_____"]'),
      ).toHaveTextContent('Overall absence rate');
      expect(
        select.querySelector('option[value="23_1_2_____"]'),
      ).toHaveTextContent('Unauthorised absence rate');
    }
  });

  test('include all indicators from reduced selection', async () => {
    const { container } = render(
      <MapBlock
        {...{
          ...testData.AbstractLargeDataChartProps_smaller_datasets,
          axes: {
            ...testData.AbstractLargeDataChartProps_smaller_datasets.axes,
            major: {
              ...testData.AbstractLargeDataChartProps_smaller_datasets.axes
                .major,
              groupBy: 'locations',
            },
          },
        }}
        height={600}
        width={900}
      />,
    );

    await wait();

    const select = container.querySelector('#selectedIndicator');

    expect(select).toBeVisible();

    if (select) {
      expect(
        select.querySelector('option[value="26_1_2_____"]'),
      ).toHaveTextContent('Overall absence rate');
      expect(
        select.querySelector('option[value="23_1_2_____"]'),
      ).toHaveTextContent('Unauthorised absence rate');
    }
  });
});
