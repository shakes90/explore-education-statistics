import React from 'react';

import { render, wait } from 'react-testing-library';
import HorzontalBarBlock from '../HorizontalBarBlock';

import testData from './__data__/testBlockData';

const elementContainingText = (
  container: HTMLElement,
  selector: string,
  text: string,
) =>
  Array.from(container.querySelectorAll(selector)).filter(
    element => element.textContent && element.textContent.trim() === text,
  );

describe('HorzontalBarBlock', () => {
  test('renders with correct output', async () => {
    const { container } = render(
      <HorzontalBarBlock
        {...testData.AbstractChartProps}
        stacked
        height={600}
        width={900}
      />,
    );

    await wait();

    expect(
      elementContainingText(container, '.xAxis text tspan', 'test x axis')
        .length,
    ).toBe(1);

    expect(
      elementContainingText(container, '.yAxis text tspan', 'test y axis')
        .length,
    ).toBe(1);

    expect(elementContainingText(container, 'text tspan', '2014').length).toBe(
      1,
    );

    expect(elementContainingText(container, 'text tspan', '2015').length).toBe(
      1,
    );

    expect(container).toMatchSnapshot();
  });
});
