using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeStoreBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProductsAddedImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "products",
                type: "bytea",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "products");
        }
    }
}
