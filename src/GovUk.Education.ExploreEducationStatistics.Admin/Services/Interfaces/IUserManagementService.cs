using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.ViewModels;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using Microsoft.AspNetCore.Mvc;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces
{
    public interface IUserManagementService
    {
        Task<UserViewModel> GetAsync(string userId);
        
        Task<List<UserViewModel>> ListAsync();


        Task<Either<ActionResult, bool>> AddUserReleaseRole(Guid userId, UserReleaseRoleSubmission userReleaseRole);

        Task<Either<ActionResult, bool>> RemoveUserReleaseRole(Guid userId, Guid userReleaseRoleId);

        Task<List<RoleViewModel>> ListRolesAsync();
        
        Task<List<UserViewModel>> ListPreReleaseUsersAsync();
        
        Task<List<UserViewModel>> ListPendingAsync();

        Task<bool> InviteAsync(string email, string user, string roleId);
        
        Task<bool> CancelInviteAsync(string email);

        Task<bool> UpdateAsync(string userId, string roleId);

    }
}