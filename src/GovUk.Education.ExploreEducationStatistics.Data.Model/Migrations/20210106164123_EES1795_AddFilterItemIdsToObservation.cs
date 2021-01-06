using GovUk.Education.ExploreEducationStatistics.Common.Extensions;
using Microsoft.EntityFrameworkCore.Migrations;
using static GovUk.Education.ExploreEducationStatistics.Data.Model.Migrations.MigrationConstants;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Migrations
{
    public partial class EES1795_AddFilterItemIdsToObservation : Migration
    {
        private const string MigrationId = "20210106164123";
        
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilterItemIds",
                table: "Observation",
                nullable: true);
            
            migrationBuilder.SqlFromFile(MigrationsPath, $"{MigrationId}_EnableFullTextSupport.sql", true);
            migrationBuilder.SqlFromFile(MigrationsPath, $"{MigrationId}_MigrateFilterItemIds.sql");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.SqlFromFile(MigrationsPath, $"{MigrationId}_DisableFullTextSupport.sql", true);
            
            migrationBuilder.DropColumn(
                name: "FilterItemIds",
                table: "Observation");
        }
    }
}
