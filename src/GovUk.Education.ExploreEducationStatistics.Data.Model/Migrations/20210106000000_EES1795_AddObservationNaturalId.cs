using Microsoft.EntityFrameworkCore.Migrations;

namespace GovUk.Education.ExploreEducationStatistics.Data.Model.Migrations
{
    public partial class EES1795_AddObservationNaturalId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "NaturalId",
                table: "Observation",
                nullable: false,
                defaultValue: 0L)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.Sql("ALTER TABLE ObservationFilterItem DROP CONSTRAINT FK_ObservationFilterItem_Observation_ObservationId");
            migrationBuilder.Sql("ALTER TABLE Observation DROP CONSTRAINT PK_Observation");
            migrationBuilder.Sql("ALTER TABLE Observation ADD CONSTRAINT PK_Observation PRIMARY KEY (NaturalId)");
            migrationBuilder.Sql("ALTER TABLE Observation ADD CONSTRAINT UQ_Observation_Id UNIQUE (Id)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NaturalId",
                table: "Observation");

            migrationBuilder.Sql("ALTER TABLE Observation ADD CONSTRAINT PK_Observation PRIMARY KEY (Id)");
        }
    }
}
