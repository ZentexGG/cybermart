using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class UsersAndIdentityRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "21e1028e-110e-43ae-9960-b839452dac29");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9591ba7e-917a-462f-87db-52885b46c460");

            migrationBuilder.AddColumn<string>(
                name: "IdentityUserId",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "89bcbe60-c6c2-4dac-b7c3-12ebcc2de610", "1", "Admin", "ADMIN" },
                    { "c1c27203-ccaf-45a4-baf9-d8b8534afa48", "2", "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_IdentityUserId",
                table: "Users",
                column: "IdentityUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_AspNetUsers_IdentityUserId",
                table: "Users",
                column: "IdentityUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_AspNetUsers_IdentityUserId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_IdentityUserId",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "89bcbe60-c6c2-4dac-b7c3-12ebcc2de610");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c1c27203-ccaf-45a4-baf9-d8b8534afa48");

            migrationBuilder.DropColumn(
                name: "IdentityUserId",
                table: "Users");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "21e1028e-110e-43ae-9960-b839452dac29", "1", "Admin", "ADMIN" },
                    { "9591ba7e-917a-462f-87db-52885b46c460", "2", "User", "USER" }
                });
        }
    }
}
