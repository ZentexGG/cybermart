using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class addedAmountToOrderProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1efe2b7d-5b7c-4565-ba0c-26e4fd2503aa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "97ce52c4-c2a2-446b-b5c5-6307dd1fbe6b");

            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "OrderProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "21e1028e-110e-43ae-9960-b839452dac29", "1", "Admin", "ADMIN" },
                    { "9591ba7e-917a-462f-87db-52885b46c460", "2", "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "21e1028e-110e-43ae-9960-b839452dac29");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9591ba7e-917a-462f-87db-52885b46c460");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "OrderProducts");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1efe2b7d-5b7c-4565-ba0c-26e4fd2503aa", "2", "User", "USER" },
                    { "97ce52c4-c2a2-446b-b5c5-6307dd1fbe6b", "1", "Admin", "ADMIN" }
                });
        }
    }
}
