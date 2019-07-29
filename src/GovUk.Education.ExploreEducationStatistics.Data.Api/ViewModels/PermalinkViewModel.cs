using System;
using System.Security.Policy;

namespace GovUk.Education.ExploreEducationStatistics.Data.Api.ViewModels
{
    public class PermalinkViewModel
    {
        public string Id { get; set; }
        
        public string Title { get; set; }
        
        public string Url => "/data-tables/permalink/" + Id;

        public ResultWithMetaViewModel Data { get; set; }
    }
}