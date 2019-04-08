import { Comparison } from 'src/types/util';
import TimePeriod from '../TimePeriod';

describe('TimePeriod', () => {
  describe('fromString', () => {
    test('can create instance with format', () => {
      const period = TimePeriod.fromString('2016_ACADEMIC');

      expect(period.year).toBe(2016);
      expect(period.code).toBe('ACADEMIC');
    });

    test('throws error if string is invalid format', () => {
      expect(() => TimePeriod.fromString('invalid format')).toThrow(TypeError);
    });

    test('throws error if string is partially invalid format', () => {
      expect(() => TimePeriod.fromString('2016_INVALID')).toThrow(TypeError);
    });
  });

  describe('academic years', () => {
    test('label is correctly formatted', () => {
      const period = new TimePeriod(2016, 'ACADEMIC');

      expect(period.label).toBe('2016/17');
    });

    test('comparison against an older period returns greater than', () => {
      const period = new TimePeriod(2016, 'ACADEMIC');
      const otherPeriod = new TimePeriod(2014, 'ACADEMIC');

      expect(period.compare(otherPeriod)).toBe(Comparison.GreaterThan);
    });

    test('comparison against a newer period returns less than', () => {
      const period = new TimePeriod(2016, 'ACADEMIC');
      const otherPeriod = new TimePeriod(2017, 'ACADEMIC');

      expect(period.compare(otherPeriod)).toBe(Comparison.LessThan);
    });

    test('comparison against the same period returns equal to', () => {
      const period = new TimePeriod(2016, 'ACADEMIC');
      const otherPeriod = new TimePeriod(2016, 'ACADEMIC');

      expect(period.compare(otherPeriod)).toBe(Comparison.EqualTo);
    });

    test('next period is next year', () => {
      const period = new TimePeriod(2016, 'ACADEMIC');

      const nextPeriod = period.nextPeriod();

      expect(nextPeriod.year).toBe(2017);
      expect(nextPeriod.code).toBe('ACADEMIC');
    });

    test('previous period is previous year', () => {
      const period = new TimePeriod(2016, 'ACADEMIC');

      const previousPeriod = period.previousPeriod();

      expect(previousPeriod.year).toBe(2015);
      expect(previousPeriod.code).toBe('ACADEMIC');
    });

    test('range is created with yearly periods', () => {
      const range = TimePeriod.createRange(
        new TimePeriod(2011, 'ACADEMIC'),
        new TimePeriod(2015, 'ACADEMIC'),
      );

      expect(range).toEqual([
        new TimePeriod(2011, 'ACADEMIC'),
        new TimePeriod(2012, 'ACADEMIC'),
        new TimePeriod(2013, 'ACADEMIC'),
        new TimePeriod(2014, 'ACADEMIC'),
        new TimePeriod(2015, 'ACADEMIC'),
      ]);
    });
  });
});
