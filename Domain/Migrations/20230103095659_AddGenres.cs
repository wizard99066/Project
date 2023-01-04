using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddGenres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Genre_Books_BookId",
                table: "Genre");

            migrationBuilder.DropForeignKey(
                name: "FK_Publishing_Books_BookId",
                table: "Publishing");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Publishing",
                table: "Publishing");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Genre",
                table: "Genre");

            migrationBuilder.RenameTable(
                name: "Publishing",
                newName: "Publishings");

            migrationBuilder.RenameTable(
                name: "Genre",
                newName: "Genres");

            migrationBuilder.RenameIndex(
                name: "IX_Publishing_BookId",
                table: "Publishings",
                newName: "IX_Publishings_BookId");

            migrationBuilder.RenameIndex(
                name: "IX_Genre_BookId",
                table: "Genres",
                newName: "IX_Genres_BookId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Publishings",
                table: "Publishings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Genres",
                table: "Genres",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "GenreBooks",
                columns: table => new
                {
                    GenreId = table.Column<long>(type: "bigint", nullable: false),
                    BookId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenreBooks", x => new { x.GenreId, x.BookId });
                    table.ForeignKey(
                        name: "FK_GenreBooks_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenreBooks_Genres_GenreId",
                        column: x => x.GenreId,
                        principalTable: "Genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PublishingBooks",
                columns: table => new
                {
                    PublishingId = table.Column<long>(type: "bigint", nullable: false),
                    BookId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublishingBooks", x => new { x.PublishingId, x.BookId });
                    table.ForeignKey(
                        name: "FK_PublishingBooks_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PublishingBooks_Publishings_PublishingId",
                        column: x => x.PublishingId,
                        principalTable: "Publishings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GenreBooks_BookId",
                table: "GenreBooks",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_PublishingBooks_BookId",
                table: "PublishingBooks",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Genres_Books_BookId",
                table: "Genres",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Publishings_Books_BookId",
                table: "Publishings",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Genres_Books_BookId",
                table: "Genres");

            migrationBuilder.DropForeignKey(
                name: "FK_Publishings_Books_BookId",
                table: "Publishings");

            migrationBuilder.DropTable(
                name: "GenreBooks");

            migrationBuilder.DropTable(
                name: "PublishingBooks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Publishings",
                table: "Publishings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Genres",
                table: "Genres");

            migrationBuilder.RenameTable(
                name: "Publishings",
                newName: "Publishing");

            migrationBuilder.RenameTable(
                name: "Genres",
                newName: "Genre");

            migrationBuilder.RenameIndex(
                name: "IX_Publishings_BookId",
                table: "Publishing",
                newName: "IX_Publishing_BookId");

            migrationBuilder.RenameIndex(
                name: "IX_Genres_BookId",
                table: "Genre",
                newName: "IX_Genre_BookId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Publishing",
                table: "Publishing",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Genre",
                table: "Genre",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Genre_Books_BookId",
                table: "Genre",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Publishing_Books_BookId",
                table: "Publishing",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id");
        }
    }
}
