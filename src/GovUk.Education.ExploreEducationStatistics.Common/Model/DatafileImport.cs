using System.Collections.Generic;
using GovUk.Education.ExploreEducationStatistics.Common.Converters;
using GovUk.Education.ExploreEducationStatistics.Common.Services;
using Microsoft.Azure.Cosmos.Table;

namespace GovUk.Education.ExploreEducationStatistics.Common.Model
{
    public class DatafileImport : TableEntity
    {
        public DatafileImport(string releaseId, string dataFileName, int numberOfRows, string message)
        {
            PartitionKey = releaseId;
            RowKey = dataFileName;
            Errors = "";
            Status = IStatus.QUEUED;
            NumberOfRows = numberOfRows;
            Message = message;
        }

        public DatafileImport()
        {
        }
        
        [EntityEnumPropertyConverter] public IStatus Status { get; set; }

        public string Errors { get; set; }

        public int NumberOfRows { get; set; }
        
        public string Message { get; set; }

        public override IDictionary<string, EntityProperty> WriteEntity(OperationContext operationContext)
        {
            var results = base.WriteEntity(operationContext);
            EntityEnumPropertyConverter.Serialize(this, results);
            return results;
        }

        public override void ReadEntity(IDictionary<string, EntityProperty> properties,
            OperationContext operationContext)
        {
            base.ReadEntity(properties, operationContext);
            EntityEnumPropertyConverter.Deserialize(this, properties);
        }
    }
}