using System;
using System.Data;
using System.Threading.Tasks;
using GovUk.Education.ExploreEducationStatistics.Common.Functions;
using GovUk.Education.ExploreEducationStatistics.Content.Model.Database;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using Microsoft.EntityFrameworkCore;

namespace GovUk.Education.ExploreEducationStatistics.Data.Importer.Utils
{
    public class DbUtils
    {
        public static StatisticsDbContext CreateStatisticsDbContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<StatisticsDbContext>();
            optionsBuilder.UseSqlServer(ConnectionUtils.GetAzureSqlConnectionString("StatisticsDb"),
                providerOptions => providerOptions.EnableRetryOnFailure());

            return new StatisticsDbContext(optionsBuilder.Options);
        }
        
        public static ContentDbContext CreateContentDbContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ContentDbContext>();
            optionsBuilder.UseSqlServer(ConnectionUtils.GetAzureSqlConnectionString("ContentDb"),
                providerOptions => providerOptions.EnableRetryOnFailure());

            return new ContentDbContext(optionsBuilder.Options);
        }

        /**
         * Obtains an exclusive lock within a new transaction and stops other transactions needing to acquire the
         * same lock to run until they can obtain the lock.  The lock is released upon a transaction being committed.
         */
        public static Task<TResult> ExecuteWithExclusiveLock<TDbContext, TResult>(
            TDbContext dbContext,
            string lockName,
            Func<TDbContext, Task<TResult>> action) 
            where TDbContext : DbContext
        {
            return dbContext.Database.CreateExecutionStrategy().ExecuteAsync(async () =>
            {
                using (var transaction = await dbContext.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted))
                {
                    await dbContext.Database.ExecuteSqlRawAsync($"exec sp_getapplock '{lockName}', 'exclusive'");

                    try
                    {
                        var result = await action(dbContext);
                        await transaction.CommitAsync();
                        return result;
                    }
                    catch (Exception)
                    {
                        await transaction.RollbackAsync();
                        return default;
                    }
                }
            });
        }
    }
}