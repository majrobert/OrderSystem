using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class currencyseries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "OrderSElemConfs",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CurrencyId",
                table: "Orders",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<decimal>(
                name: "Exchange",
                table: "Orders",
                type: "decimal(18, 4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<Guid>(
                name: "PriceId",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Series",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "OrderElems",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "OrderElemHands",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "OrderElemConfs",
                maxLength: 10,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Currency",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 10, nullable: true),
                    Exchange = table.Column<decimal>(type: "decimal(18, 4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currency", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CurrencyId",
                table: "Orders",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PriceId",
                table: "Orders",
                column: "PriceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Currency_CurrencyId",
                table: "Orders",
                column: "CurrencyId",
                principalTable: "Currency",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Prices_PriceId",
                table: "Orders",
                column: "PriceId",
                principalTable: "Prices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Currency_CurrencyId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Prices_PriceId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "Currency");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CurrencyId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_PriceId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "OrderSElemConfs");

            migrationBuilder.DropColumn(
                name: "CurrencyId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Exchange",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Series",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "OrderElems");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "OrderElemHands");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "OrderElemConfs");
        }
    }
}
