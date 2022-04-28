using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class orderElem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "OrderElemHands");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "OrderElemHands",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceAfterDiscount",
                table: "OrderElemConfs",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceBrutto",
                table: "OrderElemConfs",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PricePurchase",
                table: "OrderElemConfs",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "OrderElemConfs",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "OrderElemHands");

            migrationBuilder.DropColumn(
                name: "PriceAfterDiscount",
                table: "OrderElemConfs");

            migrationBuilder.DropColumn(
                name: "PriceBrutto",
                table: "OrderElemConfs");

            migrationBuilder.DropColumn(
                name: "PricePurchase",
                table: "OrderElemConfs");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "OrderElemConfs");

            migrationBuilder.AddColumn<int>(
                name: "Active",
                table: "OrderElemHands",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
