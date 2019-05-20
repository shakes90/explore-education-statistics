using System.Collections.Generic;
using System.IO;
using GovUk.Education.ExploreEducationStatistics.Data.Seed.Models;

namespace GovUk.Education.ExploreEducationStatistics.Data.Seed.Extensions
{
    public static class SeedExtensions
    {
        public static IEnumerable<string> GetCsvLines(this Subject subject)
        {
            return ReadAllLines(subject.Filename.ToString());
        }

        public static IEnumerable<string> GetMetaLines(this Subject subject)
        {
            return ReadAllLines(subject.Filename + ".meta");
        }

        private static IEnumerable<string> ReadAllLines(string filename)
        {
            var file = filename + ".csv";
            var path = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "Files/" + file));
            return File.ReadAllLines(path);
        }
    }
}