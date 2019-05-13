using System;
using System.Collections.Generic;
using System.Linq;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Services
{
    public static class TimePeriodUtil
    {
        public static IEnumerable<int> YearsRange(IEnumerable<int> specificYears, int start, int end)
        {
            if (specificYears != null && specificYears.Any())
            {
                // Years have been specified. Ignore any StartYear and EndYear
                return specificYears;
            }

            if (start > 0 || end > 0)
            {
                // Generate a new range
                return YearRange(start, end);
            }

            return new List<int>();
        }

        private static IEnumerable<int> YearRange(int start, int end)
        {
            if (start <= 0 || end <= 0)
            {
                throw new ArgumentNullException("Both StartYear and EndYear must be specified");
            }

            if (start > end)
            {
                throw new ArgumentOutOfRangeException(
                    "StartYear cannot be greater than EndYear");
            }

            var startYearLength = start.ToString().Length;
            var endYearLength = end.ToString().Length;

            if (startYearLength != endYearLength || (startYearLength != 4 && startYearLength != 6))
            {
                throw new ArgumentOutOfRangeException(
                    "StartYear and EndYear must both be four digits in the case of calendar years or six digits in the case of academic years");
            }

            return startYearLength == 4 ? FourDigitYearRange(start, end) : SixDigitYearRange(start, end);
        }

        private static IEnumerable<int> FourDigitYearRange(int start, int end)
        {
            return Enumerable.Range(start, end - start + 1);
        }

        private static IEnumerable<int> SixDigitYearRange(int start, int end)
        {
            var years = new List<int>();
            var year = start;
            while (year <= end)
            {
                years.Add(year);
                year += 101;
            }

            return years;
        }
    }
}