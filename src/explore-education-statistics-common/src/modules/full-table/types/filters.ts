import {
  FilterOption,
  IndicatorOption,
  TimePeriodOption,
} from '@common/modules/full-table/services/tableBuilderService';
import camelCase from 'lodash/camelCase';

export abstract class Filter {
  public readonly value: string;

  public readonly label: string;

  public constructor({ value, label }: FilterOption) {
    this.value = value;
    this.label = label;
  }
}

export class CategoryFilter extends Filter {
  public readonly isTotal: boolean;

  public constructor({ value, label }: FilterOption, isTotal = false) {
    super({ value, label });
    this.isTotal = isTotal;
  }
}

export class LocationFilter extends Filter {
  public readonly level: string;

  public constructor({ value, label }: FilterOption, level: string) {
    super({ value, label });
    this.level = camelCase(level);
  }
}

export class Indicator extends Filter {
  public readonly unit: string;

  public constructor({ value, label, unit }: IndicatorOption) {
    super({ value, label });
    this.unit = unit;
  }
}

export class TimePeriodFilter extends Filter {
  public readonly year: number;

  public readonly code: string;

  public constructor({ year, code, label }: TimePeriodOption) {
    super({ label, value: `${year}_${code}` });

    this.code = code;
    this.year = year;
  }
}
