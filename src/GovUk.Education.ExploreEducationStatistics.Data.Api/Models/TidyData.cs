using System;
using System.Collections.Generic;
using GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Query;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Models
{
    public abstract class TidyData : ITidyData
    {
        protected TidyData()
        {
        }

        protected TidyData(Guid publicationId,
            int releaseId,
            DateTime releaseDate,
            string term,
            int year,
            Level level,
            Country country,
            SchoolType schoolType,
            Dictionary<string, string> attributes)
        {
            PublicationId = publicationId;
            ReleaseId = releaseId;
            ReleaseDate = releaseDate;
            Term = term;
            Year = year;
            Level = level;
            Country = country;
            SchoolType = schoolType;
            Attributes = attributes;
        }

        public long Id { get; set; }
        public Guid PublicationId { get; set; }
        public int ReleaseId { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Term { get; set; }
        public int Year { get; set; }
        public Level Level { get; set; }
        public Country Country { get; set; }
        public SchoolType SchoolType { get; set; }
        public Dictionary<string, string> Attributes { get; set; }
    }
}