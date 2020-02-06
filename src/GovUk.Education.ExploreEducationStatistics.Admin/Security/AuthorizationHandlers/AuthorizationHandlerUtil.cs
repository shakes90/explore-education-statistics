using System.Collections.Generic;
using System.Linq;
using GovUk.Education.ExploreEducationStatistics.Content.Model;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Security.AuthorizationHandlers
{
    public static class AuthorizationHandlerUtil
    {
        private static readonly List<ReleaseRole> PreReleaseViewerRoles = new List<ReleaseRole>
        {
            ReleaseRole.PrereleaseViewer
        };
        
        private static readonly List<ReleaseRole> UnrestrictedViewerRoles = new List<ReleaseRole>
        {
            ReleaseRole.Viewer,
            ReleaseRole.Contributor,
            ReleaseRole.Approver,
            ReleaseRole.Lead
        };
        
        private static readonly List<ReleaseRole> EditorRoles = new List<ReleaseRole>
        {
            ReleaseRole.Contributor,
            ReleaseRole.Approver,
            ReleaseRole.Lead
        };
        
        private static readonly List<ReleaseRole> ApproverRoles = new List<ReleaseRole>
        {
            ReleaseRole.Approver,
        };

        public static bool ContainsPreReleaseViewerRole(IEnumerable<ReleaseRole> roles)
        {
            return ContainsAtLeastOneCommonRole(PreReleaseViewerRoles, roles);
        }

        public static bool ContainsUnrestrictedViewerRole(IEnumerable<ReleaseRole> roles)
        {
            return ContainsAtLeastOneCommonRole(UnrestrictedViewerRoles, roles);
        }

        public static bool ContainsEditorRole(IEnumerable<ReleaseRole> roles)
        {
            return ContainsAtLeastOneCommonRole(EditorRoles, roles);
        }

        public static bool ContainsApproverRole(IEnumerable<ReleaseRole> roles)
        {
            return ContainsAtLeastOneCommonRole(ApproverRoles, roles);
        }
        
        public static bool ContainsAtLeastOneCommonRole(IEnumerable<ReleaseRole> roles1, IEnumerable<ReleaseRole> roles2)
        {
            return roles1.Intersect(roles2).Any();
        }
    }
}