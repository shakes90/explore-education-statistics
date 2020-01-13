using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Admin.Controllers.Utils;
using GovUk.Education.ExploreEducationStatistics.Admin.Mappings;
using GovUk.Education.ExploreEducationStatistics.Admin.Models.Api;
using GovUk.Education.ExploreEducationStatistics.Admin.Security;
using GovUk.Education.ExploreEducationStatistics.Admin.Services;
using GovUk.Education.ExploreEducationStatistics.Admin.Services.Interfaces.Security;
using GovUk.Education.ExploreEducationStatistics.Common.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using static GovUk.Education.ExploreEducationStatistics.Admin.Security.SecurityPolicies;
using static GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services.MapperUtils;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services
{
    public class DataBlockServicePermissionTests
    {
        private readonly Release _release = new Release
        {
            Id = Guid.NewGuid()
        };
        
        private readonly DataBlock _dataBlock = new DataBlock()
        {
            Id = Guid.NewGuid()
        };
        
        [Fact]
        public void CreateAsync()
        {
            AssertSecurityPoliciesChecked(service => 
                service.CreateAsync(_release.Id, new CreateDataBlockViewModel()), CanUpdateSpecificRelease);
        }
        
        [Fact]
        public void UpdateAsync()
        {
            AssertSecurityPoliciesChecked(service => 
                service.UpdateAsync(_dataBlock.Id, new UpdateDataBlockViewModel()), CanUpdateSpecificRelease);
        }
        
        [Fact]
        public void DeleteAsync()
        {
            AssertSecurityPoliciesChecked(service => service.DeleteAsync(_dataBlock.Id), CanUpdateSpecificRelease);
        }
        
        private void AssertSecurityPoliciesChecked<T>(
            Func<DataBlockService, Task<Either<ActionResult, T>>> protectedAction, params SecurityPolicies[] policies)
        {
            var (userService, releaseHelper, dataBlockHelper, contentDbContext) = Mocks();

            var service = new DataBlockService(contentDbContext.Object, MapperForProfile<MappingProfiles>(), 
                releaseHelper.Object, userService.Object, dataBlockHelper.Object);

            PermissionTestUtil.AssertSecurityPoliciesChecked(protectedAction, _release, userService, service, policies);
        }

        private (
            Mock<IUserService>, 
            Mock<IPersistenceHelper<Release,Guid>>, 
            Mock<IPersistenceHelper<DataBlock,Guid>>,
            Mock<ContentDbContext>) Mocks()
        {
            var contentDbContext = new Mock<ContentDbContext>();

            var releaseContentBlocks = new List<ReleaseContentBlock>
            {
                new ReleaseContentBlock
                {
                    Release = _release,
                    ContentBlockId = _dataBlock.Id
                }
            }.AsQueryable();

            contentDbContext
                .Setup(s => s.ReleaseContentBlocks)
                .ReturnsDbSet(releaseContentBlocks);
            
            return (
                new Mock<IUserService>(), 
                MockUtils.MockPersistenceHelper(_release.Id, _release), 
                MockUtils.MockPersistenceHelper(_dataBlock.Id, _dataBlock), 
                contentDbContext);
        }
    }
}