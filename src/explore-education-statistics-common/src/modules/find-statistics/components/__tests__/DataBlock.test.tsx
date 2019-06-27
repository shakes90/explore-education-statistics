import testData from '@common/modules/find-statistics/components/charts/__tests__/__data__/testBlockData';
import _dataBlockService, {
  DataBlockRequest,
  GeographicLevel,
} from '@common/services/dataBlockService';
import React from 'react';
import { render, wait } from 'react-testing-library';
import DataBlock from '../DataBlock';

jest.mock('@common/services/dataBlockService');

jest.mock('recharts/lib/util/LogUtils');

const dataBlockService = _dataBlockService as jest.Mocked<
  typeof _dataBlockService
>;

describe('DataBlock', () => {
  const dataBlockRequest: DataBlockRequest = {
    subjectId: 1,
    geographicLevel: GeographicLevel.National,
    startYear: '2014',
    endYear: '2015',
    filters: ['1', '2'],
    indicators: ['23', '26', '28'],
  };

  test('renders horizontal chart', async () => {
    const getDataBlockForSubject = dataBlockService.getDataBlockForSubject.mockImplementation(
      (_: DataBlockRequest) => {
        return Promise.resolve(testData.response);
      },
    );

    const { container } = render(
      <DataBlock
        id="test"
        type="datablock"
        dataBlockRequest={dataBlockRequest}
        showTables={false}
        charts={[
          {
            type: 'horizontalbar',
            stacked: true,
            dataSets: [
              { indicator: '23', filters: ['1', '2'] },
              { indicator: '26', filters: ['1', '2'] },
              { indicator: '28', filters: ['1', '2'] },
            ],
            xAxis: { title: 'test x axis' },
            yAxis: { title: 'test y axis' },
            width: 800,
            height: 600,
          },
        ]}
      />,
    );

    await wait();

    expect(getDataBlockForSubject).toBeCalledWith(dataBlockRequest);

    expect(
      container.querySelectorAll('section.govuk-tabs__panel'),
    ).toHaveLength(1);

    expect(
      container.querySelector('section.govuk-tabs__panel h3'),
    ).toHaveTextContent('Charts');

    expect(container.querySelectorAll('.recharts-bar')).toHaveLength(3);
  });

  test('renders vertical chart', async () => {
    const getDataBlockForSubject = dataBlockService.getDataBlockForSubject.mockImplementation(
      (_: DataBlockRequest) => {
        return Promise.resolve(testData.response);
      },
    );

    const { container } = render(
      <DataBlock
        id="test"
        type="datablock"
        dataBlockRequest={dataBlockRequest}
        showTables={false}
        charts={[
          {
            type: 'verticalbar',
            dataSets: [
              { indicator: '23', filters: ['1', '2'] },
              { indicator: '26', filters: ['1', '2'] },
              { indicator: '28', filters: ['1', '2'] },
            ],
            xAxis: { title: 'test x axis' },
            yAxis: { title: 'test y axis' },
            width: 800,
            height: 600,
          },
        ]}
      />,
    );

    await wait();

    expect(getDataBlockForSubject).toBeCalledWith(dataBlockRequest);

    expect(
      container.querySelectorAll('section.govuk-tabs__panel'),
    ).toHaveLength(1);

    expect(
      container.querySelector('section.govuk-tabs__panel h3'),
    ).toHaveTextContent('Charts');

    expect(container.querySelectorAll('.recharts-bar')).toHaveLength(3);
  });

  test('renders table', async () => {
    const getDataBlockForSubject = dataBlockService.getDataBlockForSubject.mockImplementation(
      (_: DataBlockRequest) => {
        return Promise.resolve(testData.response);
      },
    );

    const { container } = render(
      <DataBlock
        id="test"
        type="datablock"
        dataBlockRequest={dataBlockRequest}
        showTables
      />,
    );

    await wait();

    expect(getDataBlockForSubject).toBeCalledWith(dataBlockRequest);

    expect(container.querySelector('table')).toMatchSnapshot();
  });

  test('renders summary', async () => {
    const getDataBlockForSubject = dataBlockService.getDataBlockForSubject.mockImplementation(
      (_: DataBlockRequest) => {
        return Promise.resolve(testData.response);
      },
    );

    const { container } = render(
      <DataBlock
        id="test"
        type="databock"
        dataBlockRequest={dataBlockRequest}
        showTables={false}
        summary={{
          dataKeys: ['23', '26', '28'],
          dataSummary: ['up 10%', 'down 10%', 'up 11%'],
          description: {
            type: 'MarkDownBlock',
            body: `<div>test</div>`,
          },
        }}
      />,
    );

    await wait();

    expect(getDataBlockForSubject).toBeCalledWith(dataBlockRequest);

    expect(
      container.querySelector('#datablock_test_summary'),
    ).toMatchSnapshot();
  });

  test('datablock renders map', async () => {
    const getDataBlockForSubject = dataBlockService.getDataBlockForSubject.mockImplementation(
      (_: DataBlockRequest) => {
        return Promise.resolve(testData.response);
      },
    );

    const { container } = render(
      <DataBlock
        id="test"
        type="datablock"
        dataBlockRequest={dataBlockRequest}
        showTables={false}
        charts={[
          {
            type: 'map',
            dataSets: [
              { indicator: '23', filters: ['1', '2'] },
              { indicator: '26', filters: ['1', '2'] },
              { indicator: '28', filters: ['1', '2'] },
            ],
            xAxis: { title: 'test x axis' },
            yAxis: { title: 'test y axis' },
            width: 800,
            height: 600,
          },
        ]}
      />,
    );

    await wait();

    expect(getDataBlockForSubject).toBeCalledWith(dataBlockRequest);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
