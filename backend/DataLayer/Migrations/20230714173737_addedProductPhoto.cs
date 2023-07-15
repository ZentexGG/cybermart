using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class addedProductPhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d1ff7358-d669-48ba-954a-accdd0e50c5b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d471da76-0d34-476b-b57d-1c831490345a");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProductPhotos");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "ProductPhotos");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "ProductPhotos",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "FileExtension",
                table: "ProductPhotos",
                newName: "FileName");

            migrationBuilder.RenameColumn(
                name: "Bytes",
                table: "ProductPhotos",
                newName: "ImageData");

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadDate",
                table: "ProductPhotos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4126021c-1275-4796-a715-30d5e5f38b0c", "2", "User", "USER" },
                    { "e54daf4b-6752-4cda-b40c-08482d74831e", "1", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4126021c-1275-4796-a715-30d5e5f38b0c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e54daf4b-6752-4cda-b40c-08482d74831e");

            migrationBuilder.DropColumn(
                name: "UploadDate",
                table: "ProductPhotos");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductPhotos",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "ImageData",
                table: "ProductPhotos",
                newName: "Bytes");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "ProductPhotos",
                newName: "FileExtension");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProductPhotos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Size",
                table: "ProductPhotos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d1ff7358-d669-48ba-954a-accdd0e50c5b", "1", "Admin", "ADMIN" },
                    { "d471da76-0d34-476b-b57d-1c831490345a", "2", "User", "USER" }
                });
        }
    }
}
