﻿using GovUk.Education.ExploreEducationStatistics.Common.Extensions;
using Microsoft.EntityFrameworkCore.Migrations;
using static GovUk.Education.ExploreEducationStatistics.Data.Model.Migrations.MigrationConstants;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Migrations
{
    public partial class EES1385QueryOptimisation : Migration
    {
        private const string MigrationId = "20201029084030";

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.SqlFromFile(MigrationsPath, $"{MigrationId}_Routine_GetFiltereredObservations.sql");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
