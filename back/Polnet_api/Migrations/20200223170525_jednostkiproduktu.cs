using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class jednostkiproduktu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Jm",
                table: "Products",
                maxLength: 50,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Jm",
                table: "Products");
        }
    }
}
