/* eslint-disable prefer-destructuring */
import dataBlockService, {
  DataBlockRequest,
  GeographicLevel,
} from '@common/services/dataBlockService';
import testData from '@common/modules/find-statistics/components/charts/__tests__/__data__/testBlockData';

import { dataApi } from '@common/services/api';

jest.mock('@common/services/api', () => {
  return {
    dataApi: {
      post: jest.fn(),
    },
  };
});

describe('dataBlockService', () => {
  beforeEach(() => {
    // @ts-ignore
    dataApi.post.mockImplementation(() => {
      return Promise.resolve(testData.response);
    });
  });

  const dataBlockRequest: DataBlockRequest = {
    subjectId: 1,
    geographicLevel: GeographicLevel.National,
    startYear: '2014',
    endYear: '2015',
    filters: ['1', '2'],
    indicators: ['23', '26', '28'],
  };

  test('calls API /Data endpoint', async () => {
    const result = await dataBlockService.getDataBlockForSubject(
      dataBlockRequest,
    );

    expect(dataApi.post).toBeCalledWith('/Data', dataBlockRequest);

    expect(result).toMatchSnapshot(result);
  });
});