import {
  FilterOption,
  IndicatorOption,
} from '@common/services/tableBuilderService';
import camelCase from 'lodash/camelCase';

abstract class Filter {
  public readonly value: string;

  public readonly label: string;

  public constructor({ value, label }: FilterOption) {
    this.value = value;
    this.label = label;
  }
}

export class CategoryFilter extends Filter {}

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