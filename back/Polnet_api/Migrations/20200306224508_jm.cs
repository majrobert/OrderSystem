using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class jm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Jm",
                table: "OrderSElemConfs",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Jm",
                table: "OrderElems",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Jm",
                table: "OrderElemHands",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Jm",
                table: "OrderElemConfs",
                maxLength: 50,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Jm",
                table: "OrderSElemConfs");

            migrationBuilder.DropColumn(
                name: "Jm",
                table: "OrderElems");

            migrationBuilder.DropColumn(
                name: "Jm",
                table: "OrderElemHands");

            migrationBuilder.DropColumn(
                name: "Jm",
                table: "OrderElemConfs");
        }
    }
}
