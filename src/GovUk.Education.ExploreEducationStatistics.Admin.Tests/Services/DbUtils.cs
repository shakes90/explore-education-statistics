using System;
using GovUk.Education.ExploreEducationStatistics.Admin.Areas.Identity.Data;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace GovUk.Education.ExploreEducationStatistics.Admin.Tests.Services
{
    public static class DbUtils
    {
        public static ContentDbContext InMemoryApplicationDbContext(string dbName)
        {
            var builder = new DbContextOptionsBuilder<ContentDbContext>();
            builder.UseInMemoryDatabase(databaseName: dbName);
            return new ContentDbContext(builder.Options);
        }

        public static ContentDbContext InMemoryApplicationDbContext()
        {
            return InMemoryApplicationDbContext(Guid.NewGuid().ToString());
        }

        public static UsersAndRolesDbContext InMemoryUserAndRolesDbContext(string dbName)
        {
            var builder = new DbContextOptionsBuilder<UsersAndRolesDbContext>();
            builder.UseInMemoryDatabase(databaseName: dbName);

            var operationalStoreOptions = Options.Create(new OperationalStoreOptions());
            return new UsersAndRolesDbContext(builder.Options, operationalStoreOptions);
        }

        public static UsersAndRolesDbContext InMemoryUserAndRolesDbContext()
        {
            return InMemoryUserAndRolesDbContext(Guid.NewGuid().ToString());
        }
    }
}