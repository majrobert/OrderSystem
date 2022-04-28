using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class productconfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CategoryProdId",
                table: "ProductConfs",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProductConfs",
                maxLength: 400,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Jm",
                table: "ProductConfs",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "ProductConfs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Vat",
                table: "ProductConfs",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryProdId",
                table: "ProductConfs");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProductConfs");

            migrationBuilder.DropColumn(
                name: "Jm",
                table: "ProductConfs");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ProductConfs");

            migrationBuilder.DropColumn(
                name: "Vat",
                table: "ProductConfs");
        }
    }
}
