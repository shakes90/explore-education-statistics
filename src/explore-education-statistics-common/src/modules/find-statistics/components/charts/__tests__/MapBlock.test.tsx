/* eslint-disable */
import React from 'react';

import { render, wait, waitForDomChange } from 'react-testing-library';

import testData from '@common/modules/find-statistics/components/charts/__tests__/__data__/testBlockData';
import MapBlock from '../MapBlock';

describe('MapBlock', () => {
  test('renders', async () => {
    const { container } = render(
      <MapBlock
        {...testData.AbstractMultipleChartProps}
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
        {...testData.AbstractMultipleChartProps}
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
        {...testData.AbstractMultipleChartProps}
        height={600}
        width={900}
      />,
    );

    await wait();

    const select = container.querySelector('#selectedIndicator');

    expect(select).toBeVisible();

    if (select) {
      expect(select.querySelector('option[value="28"]')).toHaveTextContent(
        'Authorised absence rate',
      );
      expect(select.querySelector('option[value="26"]')).toHaveTextContent(
        'Overall absence rate',
      );
      expect(select.querySelector('option[value="23"]')).toHaveTextContent(
        'Unauthorised absence rate',
      );
    }
  });
});
