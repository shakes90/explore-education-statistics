import EditableKeyStat, {
  KeyStatsFormValues,
} from '@admin/components/editable/EditableKeyStat';
import _tableBuilderService, {
  TableDataQuery,
  TableDataResponse,
} from '@common/services/tableBuilderService';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import noop from 'lodash/noop';
import React from 'react';

jest.mock('@common/services/tableBuilderService');

const tableBuilderService = _tableBuilderService as jest.Mocked<
  typeof _tableBuilderService
>;

describe('EditableKeyStat', () => {
  const testQuery: TableDataQuery = {
    filters: ['filter-1'],
    indicators: ['indicator-1'],
    subjectId: 'subject-1',
    timePeriod: {
      startCode: 'AY',
      startYear: 2020,
      endCode: 'AY',
      endYear: 2020,
    },
    locations: {
      country: ['england'],
    },
  };

  const testTableDataResponse: TableDataResponse = {
    subjectMeta: {
      publicationName: 'Test publication',
      subjectName: 'Test subject',
      geoJsonAvailable: false,
      filters: {
        Filter1: {
          legend: 'Filter 1',
          name: 'filter1',
          options: {
            FilterGroup1: {
              label: 'Filter group 1',
              options: [
                {
                  label: 'Filter 1',
                  value: 'filter-1',
                },
              ],
            },
          },
        },
      },
      locations: [
        {
          label: 'England',
          level: 'country',
          value: 'england',
        },
      ],
      timePeriodRange: [{ code: 'AY', label: '2020/21', year: 2020 }],
      indicators: [
        {
          label: 'Number of applications received',
          name: 'applications_received',
          unit: '',
          value: 'indicator-1',
        },
      ],
      boundaryLevels: [],
      footnotes: [],
    },
    results: [
      {
        filters: ['filter-1'],
        geographicLevel: 'country',
        location: {
          country: {
            name: 'england',
            code: 'england',
          },
        },
        timePeriod: '2020_AY',
        measures: {
          'indicator-1': '608180',
        },
      },
    ],
  };

  test('renders correctly with read-only summary', async () => {
    tableBuilderService.getTableData.mockResolvedValue(testTableDataResponse);

    render(
      <EditableKeyStat
        id="test-id-1"
        name="Key Stat 1"
        onSubmit={noop}
        query={testQuery}
        summary={{
          dataSummary: ['Down from 620,330 in 2017'],
          dataDefinitionTitle: ['What is the number of applications received?'],
          dataDefinition: [
            'Total number of applications received for places at primary and secondary schools.',
          ],
          dataKeys: [],
        }}
      />,
    );

    await waitFor(() => {
      expect(tableBuilderService.getTableData).toHaveBeenCalledTimes(1);

      expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
        'Number of applications received',
      );

      expect(screen.getByTestId('editableKeyStat-value')).toHaveTextContent(
        '608,180',
      );

      expect(screen.getByTestId('editableKeyStat-summary')).toHaveTextContent(
        'Down from 620,330 in 2017',
      );

      expect(
        screen.getByRole('button', {
          name: 'What is the number of applications received?',
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByTestId('editableKeyStat-definition'),
      ).toHaveTextContent(
        'Total number of applications received for places at primary and secondary schools.',
      );
    });
  });

  test('renders correctly without read-only summary', async () => {
    tableBuilderService.getTableData.mockResolvedValue(testTableDataResponse);

    render(
      <EditableKeyStat
        id="test-id-1"
        name="Key Stat 1"
        onSubmit={noop}
        query={testQuery}
      />,
    );

    await waitFor(() => {
      expect(tableBuilderService.getTableData).toHaveBeenCalledTimes(1);

      expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
        'Number of applications received',
      );

      expect(screen.getByTestId('editableKeyStat-value')).toHaveTextContent(
        '608,180',
      );

      expect(
        screen.queryByTestId('editableKeyStat-summary'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('editableKeyStat-definition'),
      ).not.toBeInTheDocument();
    });
  });

  test('clicking Edit button renders editable summary form with no initial summary', async () => {
    tableBuilderService.getTableData.mockResolvedValue(testTableDataResponse);

    render(
      <EditableKeyStat
        isEditing
        id="test-id-1"
        name="Key Stat 1"
        onSubmit={noop}
        query={testQuery}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
        'Number of applications received',
      );
    });

    userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(
      screen.getByText('Key Stat 1', { selector: 'h3' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
      'Number of applications received',
    );
    expect(screen.getByTestId('editableKeyStat-value')).toHaveTextContent(
      '608,180',
    );
    expect(screen.getByLabelText('Trend')).toHaveValue('');
    expect(screen.getByLabelText('Guidance title')).toHaveValue('Help');
    expect(screen.getByLabelText('Guidance text')).toHaveTextContent('');
  });

  test('clicking Edit button renders editable summary form with initial summary', async () => {
    tableBuilderService.getTableData.mockResolvedValue(testTableDataResponse);

    render(
      <EditableKeyStat
        isEditing
        id="test-id-1"
        name="Key Stat 1"
        onSubmit={noop}
        query={testQuery}
        summary={{
          dataSummary: ['Down from 620,330 in 2017'],
          dataDefinitionTitle: ['What is the number of applications received?'],
          dataDefinition: [
            'Total number of applications received for places at primary and secondary schools.',
          ],
          dataKeys: [],
        }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
        'Number of applications received',
      );
    });

    userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(
      screen.getByText('Key Stat 1', { selector: 'h3' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
      'Number of applications received',
    );
    expect(screen.getByTestId('editableKeyStat-value')).toHaveTextContent(
      '608,180',
    );
    expect(screen.getByLabelText('Trend')).toHaveValue(
      'Down from 620,330 in 2017',
    );
    expect(screen.getByLabelText('Guidance title')).toHaveValue(
      'What is the number of applications received?',
    );
    expect(screen.getByLabelText('Guidance text')).toHaveTextContent(
      'Total number of applications received for places at primary and secondary schools.',
    );
  });

  test('clicking Cancel button shows read-only summary again', async () => {
    tableBuilderService.getTableData.mockResolvedValue(testTableDataResponse);

    render(
      <EditableKeyStat
        isEditing
        id="test-id-1"
        name="Key Stat 1"
        onSubmit={noop}
        query={testQuery}
        summary={{
          dataSummary: ['Down from 620,330 in 2017'],
          dataDefinitionTitle: ['What is the number of applications received?'],
          dataDefinition: [
            'Total number of applications received for places at primary and secondary schools.',
          ],
          dataKeys: [],
        }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
        'Number of applications received',
      );
    });

    // Start editing
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByLabelText('Trend')).toHaveValue(
      'Down from 620,330 in 2017',
    );

    // Cancel editing
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByLabelText('Trend')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Guidance title')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Guidance text')).not.toBeInTheDocument();

    expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
      'Number of applications received',
    );

    expect(screen.getByTestId('editableKeyStat-value')).toHaveTextContent(
      '608,180',
    );

    expect(screen.getByTestId('editableKeyStat-summary')).toHaveTextContent(
      'Down from 620,330 in 2017',
    );

    expect(
      screen.getByRole('button', {
        name: 'What is the number of applications received?',
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('editableKeyStat-definition')).toHaveTextContent(
      'Total number of applications received for places at primary and secondary schools.',
    );
  });

  test('can submit with updated summary field values', async () => {
    const handleSubmit = jest.fn();

    tableBuilderService.getTableData.mockResolvedValue(testTableDataResponse);

    render(
      <EditableKeyStat
        isEditing
        id="test-id-1"
        name="Key Stat 1"
        onSubmit={handleSubmit}
        query={testQuery}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('editableKeyStat-title')).toHaveTextContent(
        'Number of applications received',
      );
    });

    userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    userEvent.clear(screen.getByLabelText('Trend'));
    await userEvent.type(screen.getByLabelText('Trend'), 'New trend text');

    userEvent.clear(screen.getByLabelText('Guidance title'));
    await userEvent.type(
      screen.getByLabelText('Guidance title'),
      'New guidance title',
    );

    // Note that we can't change 'Guidance text' field
    // as CKEditor doesn't work in Jest

    expect(handleSubmit).not.toBeCalled();

    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        dataDefinition: '',
        dataDefinitionTitle: 'New guidance title',
        dataSummary: 'New trend text',
      } as KeyStatsFormValues);
    });
  });

  test('does not render if there was an error fetching the table data', async () => {
    tableBuilderService.getTableData.mockRejectedValue(
      new Error('Something went wrong'),
    );

    render(
      <EditableKeyStat
        id="test-id-1"
        name="Key Stat 1"
        onSubmit={noop}
        query={testQuery}
        summary={{
          dataSummary: ['Down from 620,330 in 2017'],
          dataDefinitionTitle: ['What is the number of applications received?'],
          dataDefinition: [
            'Total number of applications received for places at primary and secondary schools.',
          ],
          dataKeys: [],
        }}
      />,
    );

    await waitFor(() => {
      expect(tableBuilderService.getTableData).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId('keyStat-title')).not.toBeInTheDocument();
      expect(screen.queryByTestId('keyStat-value')).not.toBeInTheDocument();
      expect(screen.queryByTestId('keyStat-summary')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('keyStat-definition'),
      ).not.toBeInTheDocument();
    });
  });

  test('does not render if there is no matching result in the response', async () => {
    tableBuilderService.getTableData.mockResolvedValue({
      ...testTableDataResponse,
      subjectMeta: {
        ...testTableDataResponse.subjectMeta,
        indicators: [
          {
            label: 'Number of applications received',
            name: 'applications_received',
            unit: '',
            value: 'indicator-1',
          },
        ],
      },
      results: [],
    });

    render(
      <EditableKeyStat
        id="test-id-1"
        name="Key Stat 1"
        onSubmit={noop}
        query={testQuery}
        summary={{
          dataSummary: ['Down from 620,330 in 2017'],
          dataDefinitionTitle: ['What is the number of applications received?'],
          dataDefinition: [
            'Total number of applications received for places at primary and secondary schools.',
          ],
          dataKeys: [],
        }}
      />,
    );

    await waitFor(() => {
      expect(tableBuilderService.getTableData).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId('keyStat-title')).not.toBeInTheDocument();
      expect(screen.queryByTestId('keyStat-value')).not.toBeInTheDocument();
      expect(screen.queryByTestId('keyStat-summary')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('keyStat-definition'),
      ).not.toBeInTheDocument();
    });
  });
});
