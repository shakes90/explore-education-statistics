using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using Microsoft.AspNetCore.Authorization;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Security.AuthorizationHandlers
{
    public class MarkReleaseAsDraftRequirement : IAuthorizationRequirement
    {}
    
    public class MarkSpecificReleaseAsDraftCanMarkAllReleasesAsDraftAuthorizationHandler : HasClaimAuthorizationHandler<
        MarkReleaseAsDraftRequirement>
    {
        public MarkSpecificReleaseAsDraftCanMarkAllReleasesAsDraftAuthorizationHandler() 
            : base(SecurityClaimTypes.MarkAllReleasesAsDraft) {}
    }

    public class MarkSpecificReleaseAsDraftHasRoleOnReleaseAuthorizationHandler
        : HasRoleOnReleaseAuthorizationHandler<MarkReleaseAsDraftRequirement>
    {
        public MarkSpecificReleaseAsDraftHasRoleOnReleaseAuthorizationHandler(ContentDbContext context) : base(context)
        {}
    }
}