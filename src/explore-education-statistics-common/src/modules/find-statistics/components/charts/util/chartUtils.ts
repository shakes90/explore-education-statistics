import formatPretty from '@common/lib/utils/number/formatPretty';
import { ChartMetaData } from '@common/modules/find-statistics/components/charts/types/chart';
import {
  DataBlockMetadata,
  LabelValueMetadata,
  Location,
  Result,
} from '@common/services/dataBlockService';
import {
  AxisConfiguration,
  AxisGroupBy,
  ChartDataSet,
  ChartSymbol,
  DataSetConfiguration,
  LabelConfiguration,
} from '@common/services/publicationService';
import { Dictionary } from '@common/types';
import difference from 'lodash/difference';
import { AxisDomain } from 'recharts';

export const colours: string[] = [
  '#4763a5',
  '#f5a450',
  '#1d70b8',
  '#800080',
  '#C0C0C0',
];

export const symbols: ChartSymbol[] = [
  'circle',
  'square',
  'triangle',
  'cross',
  'star',
];

function existAndCodesDoNotMatch(a?: Location, b?: Location) {
  return a !== undefined && b !== undefined && a.code !== b.code;
}

function filterResultsForDataSet(ds: ChartDataSet) {
  return (result: Result) => {
    // fail fast with the two things that are most likely to not match
    if (ds.indicator && !Object.keys(result.measures).includes(ds.indicator))
      return false;

    if (ds.filters) {
      if (difference(ds.filters, result.filters).length > 0) return false;
    }

    if (ds.location) {
      const { location } = result;

      if (existAndCodesDoNotMatch(location.country, ds.location.country))
        return false;

      if (existAndCodesDoNotMatch(location.region, ds.location.region))
        return false;

      if (
        existAndCodesDoNotMatch(
          location.localAuthorityDistrict,
          ds.location.localAuthorityDistrict,
        )
      )
        return false;

      if (
        existAndCodesDoNotMatch(
          location.localAuthority,
          ds.location.localAuthority,
        )
      )
        return false;
    }

    if (ds.timePeriod) {
      if (ds.timePeriod !== result.timePeriod) return false;
    }

    return true;
  };
}

export interface ChartDataB {
  name: string;

  [key: string]: string;
}

export function generateKeyFromDataSet(
  dataSet: ChartDataSet,
  ignoringField?: AxisGroupBy,
) {
  const { indicator, filters, location, timePeriod } = {
    ...dataSet,
  };

  const dontIgnoreLocations = ignoringField !== 'locations';

  const joinedLocations = [
    (dontIgnoreLocations &&
      location &&
      location.country &&
      location.country.code) ||
      '',
    (dontIgnoreLocations &&
      location &&
      location.region &&
      location.region.code) ||
      '',
    (dontIgnoreLocations &&
      location &&
      location.localAuthorityDistrict &&
      location.localAuthorityDistrict.code) ||
      '',
    (dontIgnoreLocations &&
      location &&
      location.localAuthority &&
      location.localAuthority.code) ||
      '',
  ];

  return [
    indicator,
    ...(filters || []),

    ...joinedLocations,

    (ignoringField !== 'timePeriod' && timePeriod) || '',
  ].join('_');
}

function generateNameForAxisConfiguration(
  result: Result,
  dataSet: ChartDataSet,
  groupBy?: AxisGroupBy,
): string {
  switch (groupBy) {
    case 'timePeriod':
      return result.timePeriod;
    case 'indicators':
      return `${dataSet.indicator}`;
    case 'filters':
      return generateKeyFromDataSet(
        { ...dataSet, filters: result.filters },
        groupBy,
      );
    case 'locations':
      if (
        result.location.localAuthorityDistrict &&
        result.location.localAuthorityDistrict.code &&
        result.location.localAuthorityDistrict.code !== ''
      )
        return `${result.location.localAuthorityDistrict.code}`;

      if (
        result.location.localAuthority &&
        result.location.localAuthority.code &&
        result.location.localAuthority.code !== ''
      )
        return `${result.location.localAuthority.code}`;

      if (
        result.location.region &&
        result.location.region.code &&
        result.location.region.code !== ''
      )
        return `${result.location.region.code}`;

      if (result.location.country) return `${result.location.country.code}`;

      return '';
    default:
      return '';
  }
}

function getChartDataForAxis(
  dataForAxis: Result[],
  dataSet: ChartDataSet,
  meta: ChartMetaData,
  groupBy?: AxisGroupBy,
) {
  const source = groupBy && meta[groupBy];

  const initialNames = source && Object.keys(source);

  if (initialNames === undefined || initialNames.length === 0) {
    throw new Error(
      'Invalid grouping specified for the data on the axis, unable to determine the groups',
    );
  }

  const nameDictionary: Dictionary<ChartDataB> = initialNames.reduce(
    (chartdata, n) => ({ ...chartdata, [n]: { name: n } }),
    {},
  );

  return Object.values(
    dataForAxis.reduce<Dictionary<ChartDataB>>((r, result) => {
      const name = generateNameForAxisConfiguration(result, dataSet, groupBy);

      return {
        ...r,
        [name]: {
          name,
          [generateKeyFromDataSet(dataSet, groupBy)]:
            formatPretty(result.measures[dataSet.indicator]) || 'NaN',
        },
      };
    }, nameDictionary),
  );
}

function reduceCombineChartData(
  newCombinedData: ChartDataB[],
  { name, ...valueData }: { name: string },
) {
  // find and remove the existing matching (by name) entry from the list of data, or create a new one empty one
  const existingDataIndex = newCombinedData.findIndex(
    axisValue => axisValue.name === name,
  );
  const [existingData] =
    existingDataIndex >= 0
      ? newCombinedData.splice(existingDataIndex, 1)
      : [{ name }];

  // put the new entry into the array with any existing and new values added to it
  return [
    ...newCombinedData,
    {
      ...existingData,
      ...valueData,
    },
  ];
}

export function sortChartData(
  chartData: ChartDataB[],
  sortBy: string | undefined,
  sortAsc: boolean,
) {
  if (sortBy === undefined) return chartData;

  const mappedValueAndData = chartData.map(data => ({
    value:
      data[sortBy] === undefined ? undefined : Number.parseFloat(data[sortBy]),
    data,
  }));

  return mappedValueAndData
    .sort(({ value: valueA }, { value: valueB }) => {
      if (valueA !== undefined && valueB !== undefined) {
        return sortAsc ? valueA - valueB : valueB - valueA;
      }
      return 0;
    })
    .map(({ data }) => data);
}

export function createDataForAxis(
  axisConfiguration: AxisConfiguration,
  results: Result[],
  meta: ChartMetaData,
) {
  if (axisConfiguration === undefined || results === undefined) return [];

  return axisConfiguration.dataSets.reduce<ChartDataB[]>(
    (combinedChartData, dataSetForAxisConfiguration) => {
      return getChartDataForAxis(
        results.filter(filterResultsForDataSet(dataSetForAxisConfiguration)),
        dataSetForAxisConfiguration,
        meta,
        axisConfiguration.groupBy,
      ).reduce(reduceCombineChartData, [...combinedChartData]);
    },
    [],
  );
}

const FindFirstInDictionaries = (
  metaDataObjects: (Dictionary<LabelConfiguration> | undefined)[],
  name: string,
) => (result: string | undefined, meta?: Dictionary<LabelConfiguration>) =>
  result || (meta && meta[name] && meta[name].label);

export function mapNameToNameLabel(
  keepOriginalValue = false,
  ...metaDataObjects: (Dictionary<LabelConfiguration> | undefined)[]
) {
  return ({ name, ...otherdata }: { name: string }) => ({
    ...(keepOriginalValue ? { __name: name } : {}),
    name:
      metaDataObjects.reduce(
        FindFirstInDictionaries(metaDataObjects, name),
        '',
      ) || name,
    ...otherdata,
  });
}

export function createSortedDataForAxis(
  axisConfiguration: AxisConfiguration,
  results: Result[],
  meta: ChartMetaData,
  mapFunction: (data: ChartDataB) => ChartDataB = data => data,
): ChartDataB[] {
  const chartData: ChartDataB[] = createDataForAxis(
    axisConfiguration,
    results,
    meta,
  ).map(mapFunction);

  const sorted = sortChartData(
    chartData,
    axisConfiguration.sortBy,
    axisConfiguration.sortAsc !== false,
  );

  if (axisConfiguration.dataRange) {
    return sorted.slice(...axisConfiguration.dataRange);
  }

  return sorted;
}

export function createSortedAndMappedDataForAxis(
  axisConfiguration: AxisConfiguration,
  results: Result[],
  meta: ChartMetaData,
  labels: Dictionary<DataSetConfiguration>,
  keepOriginalValue = false,
): ChartDataB[] {
  return createSortedDataForAxis(
    axisConfiguration,
    results,
    meta,
    mapNameToNameLabel(
      keepOriginalValue,
      labels,
      meta.timePeriod,
      meta.locations,
      meta.filters,
      meta.indicators,
    ),
  );
}

export function getKeysForChart(chartData: ChartDataB[]) {
  return Array.from(
    chartData.reduce((setOfKeys, { name: _, ...values }) => {
      return new Set([...Array.from(setOfKeys), ...Object.keys(values)]);
    }, new Set<string>()),
  );
}

export function populateDefaultChartProps(
  name: string,
  config: DataSetConfiguration,
) {
  return {
    dataKey: name,
    isAnimationActive: false,
    name: (config && config.label) || name,
    stroke: config && config.colour,
    fill: config && config.colour,
    unit: (config && config.unit) || '',
  };
}

export const conditionallyAdd = (size?: string, add?: number) => {
  if (size) {
    return +size + (add === undefined ? 0 : add);
  }
  return add;
};

const calculateMinMaxReduce = (
  { min, max }: { min: number; max: number },
  next: string,
) => {
  const nextValue = parseFloat(next);
  if (Number.isNaN(nextValue) && Number.isFinite(nextValue))
    return { min, max };

  return {
    min: nextValue < min ? nextValue : min,
    max: nextValue > max ? nextValue : max,
  };
};

export function calculateDataRange(chartData: ChartDataB[]) {
  // removing the 'name' variable from the object and just keeping the rest of the values
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allValuesInData = chartData.reduce<string[]>(
    (all, { name, ...values }) => [...all, ...Object.values(values)], // eslint-disable-line
    [],
  );

  return allValuesInData.reduce(calculateMinMaxReduce, {
    min: +Infinity,
    max: -Infinity,
  });
}

const parseNumberOrDefault = (
  number: string | undefined,
  def: number,
): number => {
  const parsed = number === undefined ? undefined : Number.parseFloat(number);

  if (parsed === undefined || Number.isNaN(parsed)) return def;
  return parsed;
};

export function getNiceMaxValue(maxValue: number) {
  if (maxValue === 0) {
    return 0;
  }

  const maxIsLessThanOne = Math.abs(maxValue) < 1;
  let max = maxValue;
  if (maxIsLessThanOne) {
    max = maxValue * 100;
  }

  const numberOf0s = 10 ** Math.floor(Math.log10(Math.abs(max)));
  const maxReducedToLessThan10 = Math.ceil(max / numberOf0s);

  if (maxReducedToLessThan10 % 2 && maxReducedToLessThan10 % 5) {
    return maxIsLessThanOne
      ? ((maxReducedToLessThan10 + 1) * numberOf0s) / 100
      : (maxReducedToLessThan10 + 1) * numberOf0s;
  }
  return maxIsLessThanOne
    ? (maxReducedToLessThan10 * numberOf0s) / 100
    : maxReducedToLessThan10 * numberOf0s;
}

function calculateMinorTicks(
  config: string | undefined,
  min: number,
  max: number,
  spacing = '5',
): number[] | undefined {
  let spacingValue = +spacing;

  if (spacingValue <= 0) spacingValue = 1.0;
  if (
    Number.isNaN(min) ||
    Number.isNaN(max) ||
    !Number.isFinite(min) ||
    !Number.isFinite(max)
  )
    return undefined;

  if (config === 'custom') {
    const minimumSpacingValue = getNiceMaxValue(
      Math.floor((Number(max) - Number(min)) / 100),
    );
    if (spacingValue < minimumSpacingValue) {
      spacingValue = minimumSpacingValue;
    }

    const result = [];

    let [start, end] = [min, max];
    if (start > end) [start, end] = [end, start];

    for (let i = start; i < end; i += spacingValue) {
      result.push(parseFloat(i.toPrecision(10)));
    }

    result.push(max);

    return result;
  }

  if (config === 'startEnd') {
    return [min, max];
  }
  return undefined;
}

function calculateMajorTicks(
  config: string | undefined,
  categories: string[],
  min: number,
  max: number,
  spacing = '1',
): string[] | undefined {
  let spacingValue = parseInt(spacing, 10);

  if (spacingValue <= 0) spacingValue = 1.0;
  if (
    Number.isNaN(min) ||
    Number.isNaN(max) ||
    !Number.isFinite(min) ||
    !Number.isFinite(max)
  )
    return undefined;

  if (config === 'custom') {
    const result = [];

    let [start, end] = [min, max];
    if (start > end) [start, end] = [end, start];

    for (let i = start; i < end; i += spacingValue) {
      result.push(categories[i]);
    }

    result.push(categories[max]);

    return result;
  }

  if (config === 'startEnd') {
    return [categories[min], categories[max]];
  }
  return undefined;
}

export function generateMinorAxis(
  chartData: ChartDataB[],
  axis: AxisConfiguration,
) {
  const { min, max } = calculateDataRange(chartData);

  const axisMin = parseNumberOrDefault(axis.min, min);
  const axisMax = parseNumberOrDefault(axis.max, getNiceMaxValue(max));

  const domain: [AxisDomain, AxisDomain] = [axisMin, axisMax];

  const ticks = calculateMinorTicks(
    axis.tickConfig,
    axisMin,
    axisMax,
    axis.tickSpacing,
  );
  return { domain, ticks };
}

export function generateMajorAxis(
  chartData: ChartDataB[],
  axis: AxisConfiguration,
) {
  const majorAxisCateories = chartData.map(({ name }) => name);

  const min = parseNumberOrDefault(axis.min, 0);
  const max = parseNumberOrDefault(axis.max, majorAxisCateories.length - 1);

  const domain: [AxisDomain, AxisDomain] = [min, max];

  const ticks = calculateMajorTicks(
    axis.tickConfig,
    majorAxisCateories,
    min,
    max,
    axis.tickSpacing,
  );
  return { domain, ticks };
}

export function parseMetaData(
  metaData?: DataBlockMetadata,
): ChartMetaData | undefined {
  if (metaData === undefined) return undefined;

  const allFilters: LabelValueMetadata[] = Object.values(
    metaData.filters,
  ).reduce<LabelValueMetadata[]>((filters, { options }) => {
    return filters.concat(...Object.values(options).map(_ => _.options));
  }, []);

  return {
    filters: allFilters.reduce(
      (f, { label, value }) => ({
        ...f,
        [value]: { label, value },
      }),
      {},
    ),

    indicators: metaData.indicators,
    locations: metaData.locations,
    boundaryLevels: metaData.boundaryLevels,
    timePeriod: Object.entries(metaData.timePeriod).reduce(
      (timePeriod, [value, data]) => ({
        ...timePeriod,
        [value]: {
          ...data,
          value,
        },
      }),
      {},
    ),
  };
}
