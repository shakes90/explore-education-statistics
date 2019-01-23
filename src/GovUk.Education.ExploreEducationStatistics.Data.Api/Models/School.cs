using MongoDB.Bson.Serialization.Attributes;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.Models
{
    public class School
    {
        [BsonElement("acad_opendate")] public string AcademyOpenDate { get; set; }
        [BsonElement("acad_type")] public string AcademyType { get; set; }
        [BsonElement("estab")] public string Estab { get; set; }
        [BsonElement("laestab")] public string LaEstab { get; set; }
        [BsonElement("urn")] public string Urn { get; set; }
    }
}