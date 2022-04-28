using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Polnet_api.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    DisplayName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoryCustomers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Sort = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryCustomers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoryProds",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Details = table.Column<string>(nullable: true),
                    Sort = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryProds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Prices",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Sort = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductConfs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Code = table.Column<string>(maxLength: 100, nullable: true),
                    Sort = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductConfs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Description = table.Column<string>(maxLength: 400, nullable: true),
                    Code = table.Column<string>(maxLength: 100, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Vat = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    GidCdn = table.Column<int>(nullable: false),
                    CategoryProdId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_CategoryProds_CategoryProdId",
                        column: x => x.CategoryProdId,
                        principalTable: "CategoryProds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Akronim = table.Column<string>(maxLength: 50, nullable: true),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Phone = table.Column<string>(maxLength: 100, nullable: true),
                    Contact = table.Column<string>(nullable: true),
                    Streed = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Nip = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    GidCdn = table.Column<int>(nullable: false),
                    PriceId = table.Column<Guid>(nullable: false),
                    CategoryCustomerId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_CategoryCustomers_CategoryCustomerId",
                        column: x => x.CategoryCustomerId,
                        principalTable: "CategoryCustomers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Customers_Prices_PriceId",
                        column: x => x.PriceId,
                        principalTable: "Prices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductConfElems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    quantity = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Sort = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    ProductConfId = table.Column<Guid>(nullable: false),
                    ProductId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductConfElems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductConfElems_ProductConfs_ProductConfId",
                        column: x => x.ProductConfId,
                        principalTable: "ProductConfs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductConfElems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductPrices",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(nullable: false),
                    PriceId = table.Column<Guid>(nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18, 4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPrices", x => new { x.ProductId, x.PriceId });
                    table.ForeignKey(
                        name: "FK_ProductPrices_Prices_PriceId",
                        column: x => x.PriceId,
                        principalTable: "Prices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductPrices_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Number = table.Column<int>(nullable: false),
                    NumberYear = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    DateCreation = table.Column<DateTime>(nullable: false),
                    DateLimit = table.Column<DateTime>(nullable: false),
                    DateReali = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    CustomerId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Value = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    ValueBrutto = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18, 4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PriceSpecs",
                columns: table => new
                {
                    CustomerId = table.Column<Guid>(nullable: false),
                    ProductId = table.Column<Guid>(nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceSpecs", x => new { x.CustomerId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_PriceSpecs_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PriceSpecs_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderElemConfs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Sort = table.Column<int>(nullable: false),
                    Lp = table.Column<string>(maxLength: 20, nullable: true),
                    Description = table.Column<string>(maxLength: 400, nullable: true),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Code = table.Column<string>(maxLength: 100, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Vat = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    OrderId = table.Column<Guid>(nullable: false),
                    ProductConfId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderElemConfs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderElemConfs_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderElemConfs_ProductConfs_ProductConfId",
                        column: x => x.ProductConfId,
                        principalTable: "ProductConfs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderElemHands",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Sort = table.Column<int>(nullable: false),
                    Lp = table.Column<string>(maxLength: 20, nullable: true),
                    Description = table.Column<string>(maxLength: 400, nullable: true),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Code = table.Column<string>(maxLength: 100, nullable: true),
                    PricePurchase = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    PriceAfterDiscount = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    PriceBrutto = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Vat = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Active = table.Column<int>(nullable: false),
                    OrderId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderElemHands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderElemHands_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderElems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Sort = table.Column<int>(nullable: false),
                    Lp = table.Column<string>(maxLength: 20, nullable: true),
                    Description = table.Column<string>(maxLength: 400, nullable: true),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Code = table.Column<string>(maxLength: 100, nullable: true),
                    PricePurchase = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    PriceAfterDiscount = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    PriceBrutto = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Vat = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    OrderId = table.Column<Guid>(nullable: false),
                    ProductId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderElems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderElems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderElems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderSElemConfs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Sort = table.Column<int>(nullable: false),
                    Lp = table.Column<string>(maxLength: 20, nullable: true),
                    Description = table.Column<string>(maxLength: 400, nullable: true),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Code = table.Column<string>(maxLength: 100, nullable: true),
                    PricePurchase = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    PriceAfterDiscount = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    PriceBrutto = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18, 4)", nullable: false),
                    Vat = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    OrderElemConfId = table.Column<Guid>(nullable: false),
                    ProductId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderSElemConfs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderSElemConfs_OrderElemConfs_OrderElemConfId",
                        column: x => x.OrderElemConfId,
                        principalTable: "OrderElemConfs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderSElemConfs_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CategoryCustomerId",
                table: "Customers",
                column: "CategoryCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_PriceId",
                table: "Customers",
                column: "PriceId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderElemConfs_OrderId",
                table: "OrderElemConfs",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderElemConfs_ProductConfId",
                table: "OrderElemConfs",
                column: "ProductConfId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderElemHands_OrderId",
                table: "OrderElemHands",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderElems_OrderId",
                table: "OrderElems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderElems_ProductId",
                table: "OrderElems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSElemConfs_OrderElemConfId",
                table: "OrderSElemConfs",
                column: "OrderElemConfId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSElemConfs_ProductId",
                table: "OrderSElemConfs",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PriceSpecs_ProductId",
                table: "PriceSpecs",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductConfElems_ProductConfId",
                table: "ProductConfElems",
                column: "ProductConfId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductConfElems_ProductId",
                table: "ProductConfElems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPrices_PriceId",
                table: "ProductPrices",
                column: "PriceId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryProdId",
                table: "Products",
                column: "CategoryProdId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "OrderElemHands");

            migrationBuilder.DropTable(
                name: "OrderElems");

            migrationBuilder.DropTable(
                name: "OrderSElemConfs");

            migrationBuilder.DropTable(
                name: "PriceSpecs");

            migrationBuilder.DropTable(
                name: "ProductConfElems");

            migrationBuilder.DropTable(
                name: "ProductPrices");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "OrderElemConfs");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "ProductConfs");

            migrationBuilder.DropTable(
                name: "CategoryProds");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "CategoryCustomers");

            migrationBuilder.DropTable(
                name: "Prices");
        }
    }
}
