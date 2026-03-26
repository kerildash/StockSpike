using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Api.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class Roles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "103f9690-9460-4a86-84ba-3cc33c862465", "f6cebd76-87ce-4de6-9d18-0cf93f72cfff", "User", "USER" },
                    { "73da189c-a716-4df7-a236-fda02f0b180b", "b6496fa3-5f28-4277-babe-3eaeb879595d", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "103f9690-9460-4a86-84ba-3cc33c862465");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "73da189c-a716-4df7-a236-fda02f0b180b");
        }
    }
}
