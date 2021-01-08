using System;
using GovUk.Education.ExploreEducationStatistics.Common.Extensions;
using Microsoft.EntityFrameworkCore.Migrations;
using static GovUk.Education.ExploreEducationStatistics.Data.Model.Migrations.MigrationConstants;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Migrations
{
    public partial class EES1795_RemoveObservationFilterItemTable : Migration
    {
        private const string PreviousInsertObservationFilterItemsMigrationId = "20200304145743";
        private const string PreviousObservationFilterItemTypeMigrationId = "20200930085741";

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ObservationFilterItem");

            migrationBuilder.Sql("DROP PROCEDURE dbo.InsertObservationFilterItems");
            migrationBuilder.Sql("DROP TYPE dbo.ObservationFilterItemType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ObservationFilterItem",
                columns: table => new
                {
                    ObservationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilterItemId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObservationFilterItem", x => new { x.ObservationId, x.FilterItemId });
                    table.ForeignKey(
                        name: "FK_ObservationFilterItem_Filter_FilterId",
                        column: x => x.FilterId,
                        principalTable: "Filter",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ObservationFilterItem_FilterItem_FilterItemId",
                        column: x => x.FilterItemId,
                        principalTable: "FilterItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ObservationFilterItem_Observation_ObservationId",
                        column: x => x.ObservationId,
                        principalTable: "Observation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ObservationFilterItem_FilterId",
                table: "ObservationFilterItem",
                column: "FilterId");

            migrationBuilder.CreateIndex(
                name: "IX_ObservationFilterItem_FilterItemId",
                table: "ObservationFilterItem",
                column: "FilterItemId");

            migrationBuilder.SqlFromFile(MigrationsPath,
                $"{PreviousInsertObservationFilterItemsMigrationId}_Routine_InsertObservations.sql");

            migrationBuilder.SqlFromFile(MigrationsPath,
                $"{PreviousObservationFilterItemTypeMigrationId}_Type_ObservationFilterItemType.sql");
        }
    }
}
