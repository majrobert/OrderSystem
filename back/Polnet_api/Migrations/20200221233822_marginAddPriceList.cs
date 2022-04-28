using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class marginAddPriceList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Margin",
                table: "Prices",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Margin",
                table: "Prices");
        }
    }
}
