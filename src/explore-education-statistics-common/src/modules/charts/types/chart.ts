import { horizontalBarBlockDefinition } from '@common/modules/charts/components/HorizontalBarBlock';
import { infographicBlockDefinition } from '@common/modules/charts/components/InfographicBlock';
import { lineChartBlockDefinition } from '@common/modules/charts/components/LineChartBlock';
import { mapBlockDefinition } from '@common/modules/charts/components/MapBlock';
import { verticalBarBlockDefinition } from '@common/modules/charts/components/VerticalBarBlock';
import { DataSetConfiguration } from '@common/modules/charts/types/dataSet';
import { FullTableMeta } from '@common/modules/table-tool/types/fullTable';
import { TableDataResult } from '@common/services/tableBuilderService';
import { NestedPartial } from '@common/types';

export type ChartType =
  | 'line'
  | 'verticalbar'
  | 'horizontalbar'
  | 'map'
  | 'infographic';

export type ChartSymbol =
  | 'circle'
  | 'cross'
  | 'diamond'
  | 'square'
  | 'star'
  | 'triangle'
  | 'wye';

export type LineStyle = 'solid' | 'dashed' | 'dotted';

export type AxisGroupBy = 'timePeriod' | 'locations' | 'filters' | 'indicators';
export type AxisType = 'major' | 'minor';
export type TickConfig = 'default' | 'startEnd' | 'custom';

export interface ReferenceLine {
  label: string;
  position: number | string;
}

export interface Label {
  text: string;
  rotated?: boolean;
  width?: number;
}

export interface AxisConfiguration {
  type: AxisType;
  groupBy?: AxisGroupBy;
  sortBy?: string;
  sortAsc?: boolean;
  dataSets: DataSetConfiguration[];
  referenceLines: ReferenceLine[];
  visible: boolean;
  unit?: string;
  showGrid?: boolean;
  label?: Label;
  size?: number;
  min?: number;
  max?: number;
  title?: string;
  tickConfig?: TickConfig;
  tickSpacing?: number;
}

export type AxesConfiguration = {
  [key in AxisType]?: AxisConfiguration;
};

export interface ChartProps {
  data: TableDataResult[];
  meta: FullTableMeta;
  title: string;
  alt: string;
  height: number;
  width?: number;
  axes: AxesConfiguration;
  legend?: 'none' | 'top' | 'bottom';
}

export interface StackedBarProps extends ChartProps {
  barThickness?: number;
  stacked?: boolean;
}

export interface ChartCapabilities {
  dataSymbols: boolean;
  stackable: boolean;
  lineStyle: boolean;
  gridLines: boolean;
  canSize: boolean;
  canSort: boolean;
  fixedAxisGroupBy: boolean;
  hasReferenceLines: boolean;
  hasLegend: boolean;
  requiresGeoJson: boolean;
}

export interface ChartDefinitionOptions {
  stacked?: boolean;
  legend?: 'none' | 'top' | 'bottom';
  height: number;
  width?: number;
  barThickness?: number;
  title: string;
  alt: string;
}

export interface ChartDefinition {
  type: ChartType;
  name: string;
  capabilities: ChartCapabilities;
  options: {
    defaults?: Partial<ChartDefinitionOptions>;
  };
  data: {
    type: string;
    title: string;
    entryCount: number | 'multiple';
    targetAxis: string;
  }[];
  axes: {
    [key in AxisType]?: ChartDefinitionAxis;
  };
}

export interface ChartDefinitionAxisCapabilities {
  canRotateLabel: boolean;
}

export interface ChartDefinitionAxis {
  id: string;
  title: string;
  type: AxisType;
  hide?: boolean;
  capabilities: ChartDefinitionAxisCapabilities;
  defaults?: NestedPartial<AxisConfiguration>;
}

export const chartDefinitions: ChartDefinition[] = [
  lineChartBlockDefinition,
  verticalBarBlockDefinition,
  horizontalBarBlockDefinition,
  mapBlockDefinition,
  infographicBlockDefinition,
];
