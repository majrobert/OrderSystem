using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class orderHeader : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OrderHeaderId",
                table: "OrderElemHands",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "OrderHeaderId",
                table: "OrderElemConfs",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "OrderHeaders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Sort = table.Column<int>(maxLength: 200, nullable: false),
                    Name = table.Column<string>(nullable: true),
                    PricePurchase = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    PriceAfterDiscount = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    PriceBrutto = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    OrderId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderHeaders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderHeaders_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderHeaders_OrderId",
                table: "OrderHeaders",
                column: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderHeaders");

            migrationBuilder.DropColumn(
                name: "OrderHeaderId",
                table: "OrderElemHands");

            migrationBuilder.DropColumn(
                name: "OrderHeaderId",
                table: "OrderElemConfs");
        }
    }
}
