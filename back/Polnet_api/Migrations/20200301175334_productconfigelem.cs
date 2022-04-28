using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class productconfigelem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "ProductConfElems",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProductConfElems",
                maxLength: 400,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ProductConfElems",
                maxLength: 200,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "ProductConfElems");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProductConfElems");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ProductConfElems");
        }
    }
}
