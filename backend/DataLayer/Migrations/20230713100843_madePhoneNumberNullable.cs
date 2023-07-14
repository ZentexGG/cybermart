using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class madePhoneNumberNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a3251887-3d59-4a96-96eb-1b27124e4327");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c14e3b6e-4bb0-4450-9e38-3a9dcdfd2b66");

            migrationBuilder.AlterColumn<string>(
                name: "phoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1f3d3d10-3dcb-4039-8bc7-cf5b8a955bc7", "2", "User", "USER" },
                    { "a473f6da-cc6b-42c1-8068-940d19094211", "1", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f3d3d10-3dcb-4039-8bc7-cf5b8a955bc7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a473f6da-cc6b-42c1-8068-940d19094211");

            migrationBuilder.AlterColumn<string>(
                name: "phoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a3251887-3d59-4a96-96eb-1b27124e4327", "1", "Admin", "ADMIN" },
                    { "c14e3b6e-4bb0-4450-9e38-3a9dcdfd2b66", "2", "User", "USER" }
                });
        }
    }
}
