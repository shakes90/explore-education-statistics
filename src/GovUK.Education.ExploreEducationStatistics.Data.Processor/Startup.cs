﻿using System;
using GovUk.Education.ExploreEducationStatistics.Data.Importer.Services;
using GovUk.Education.ExploreEducationStatistics.Data.Model.Database;
using GovUK.Education.ExploreEducationStatistics.Data.Processor;
using GovUk.Education.ExploreEducationStatistics.Data.Processor.Services;
using GovUK.Education.ExploreEducationStatistics.Data.Processor.Services;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Azure.WebJobs.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Willezone.Azure.WebJobs.Extensions.DependencyInjection;

[assembly: WebJobsStartup(typeof(Startup))]
namespace GovUK.Education.ExploreEducationStatistics.Data.Processor
{
    internal class Startup : IWebJobsStartup
    {
        public void Configure(IWebJobsBuilder builder) =>
            builder.AddDependencyInjection<ServiceProviderBuilder>();
    }

    internal class ServiceProviderBuilder : IServiceProviderBuilder
    {
        private readonly ILoggerFactory _loggerFactory;

        public ServiceProviderBuilder(ILoggerFactory loggerFactory) =>
            _loggerFactory = loggerFactory;

        public IServiceProvider Build()
        {
            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(Environment.CurrentDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = config.GetConnectionString("ContentDb");
            var services = new ServiceCollection();

            services.AddMemoryCache();

            return services.AddDbContext<ApplicationDbContext>(options =>
                options
                    .UseSqlServer(connectionString)
                    .EnableSensitiveDataLogging())

            .AddTransient<IBlobService, BlobService>()
            .AddTransient<ISeedService, SeedService>()
            .AddTransient<IProcessorService, ProcessorService>()
            .AddTransient<IImporterService, ImporterService>()
            .AddTransient<ImporterFilterService>()
            .AddTransient<ImporterLocationService>()
            .AddTransient<ImporterMetaService>()
            // Important: We need to call CreateFunctionUserCategory, otherwise our log entries might be filtered out.
            .AddSingleton<ILogger>(_ => _loggerFactory.CreateLogger(LogCategories.CreateFunctionUserCategory("Common")))
            .BuildServiceProvider();
        }
    }
}
