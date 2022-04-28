using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class ordersum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceAfterDiscount",
                table: "OrderHeaders");

            migrationBuilder.DropColumn(
                name: "PriceBrutto",
                table: "OrderHeaders");

            migrationBuilder.DropColumn(
                name: "PricePurchase",
                table: "OrderHeaders");

            migrationBuilder.AddColumn<decimal>(
                name: "PricePurchase",
                table: "Orders",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PricePurchase",
                table: "Orders");

            migrationBuilder.AddColumn<decimal>(
                name: "PriceAfterDiscount",
                table: "OrderHeaders",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceBrutto",
                table: "OrderHeaders",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PricePurchase",
                table: "OrderHeaders",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
