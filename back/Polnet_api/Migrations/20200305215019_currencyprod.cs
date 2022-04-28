using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class currencyprod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Prices_PriceId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_PriceId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "Orders");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PriceId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PriceId",
                table: "Orders",
                column: "PriceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Prices_PriceId",
                table: "Orders",
                column: "PriceId",
                principalTable: "Prices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
