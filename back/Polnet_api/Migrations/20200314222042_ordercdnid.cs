using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class ordercdnid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GidCdn",
                table: "Orders",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GidCdn",
                table: "Orders");
        }
    }
}
