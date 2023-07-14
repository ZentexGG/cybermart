using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class addedUserPhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ddbedb88-5309-4c0a-82dd-a64b85f79fbf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ffb82d8f-9ea4-47df-ab35-e48a88528de1");

            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "UserPhoto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageData = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    UploadDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPhoto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPhoto_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a3251887-3d59-4a96-96eb-1b27124e4327", "1", "Admin", "ADMIN" },
                    { "c14e3b6e-4bb0-4450-9e38-3a9dcdfd2b66", "2", "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPhoto_UserID",
                table: "UserPhoto",
                column: "UserID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPhoto");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a3251887-3d59-4a96-96eb-1b27124e4327");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c14e3b6e-4bb0-4450-9e38-3a9dcdfd2b66");

            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "Users");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ddbedb88-5309-4c0a-82dd-a64b85f79fbf", "2", "User", "USER" },
                    { "ffb82d8f-9ea4-47df-ab35-e48a88528de1", "1", "Admin", "ADMIN" }
                });
        }
    }
}
