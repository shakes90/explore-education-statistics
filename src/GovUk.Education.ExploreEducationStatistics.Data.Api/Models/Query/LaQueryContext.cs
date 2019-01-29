using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver.Linq;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Models.Query
{
    public class LaQueryContext : IQueryContext<CharacteristicDataLa>
    {
        public Guid PublicationId { get; set; }
        public ICollection<SchoolType> SchoolTypes { get; set; }
        public ICollection<int> Years { get; set; }
        public ICollection<string> Attributes { get; set; }
        public ICollection<string> Characteristics { get; set; }

        public IMongoQueryable<CharacteristicDataLa> FindExpression(
            IMongoQueryable<CharacteristicDataLa> queryable)
        {
            queryable = queryable.Where(x => x.Level == Level.Local_Authority.ToString());

            if (SchoolTypes.Count > 0)
            {
                queryable = queryable.Where(x => SchoolTypes.First().ToString() == x.SchoolType);
            }

            if (Years.Count > 0)
            {
                queryable = queryable.Where(x => Years.First() == x.Year);
            }

            if (Characteristics.Count > 0)
            {
                queryable = queryable.Where(x => Characteristics.First() == x.Characteristic.Name);
            }

            return queryable;
        }
    }
}