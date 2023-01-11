using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddFile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "City",
                table: "Publishings",
                newName: "Address");

            migrationBuilder.AddColumn<long>(
                name: "AvatarId",
                table: "Books",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FileName = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<byte[]>(type: "bytea", nullable: false),
                    ContentType = table.Column<string>(type: "text", nullable: false),
                    FileExtension = table.Column<string>(type: "text", nullable: false),
                    FileLength = table.Column<long>(type: "bigint", nullable: false),
                    UploadDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserBookFavorites",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BookId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBookFavorites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBookFavorites_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBookFavorites_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBookReads",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BookId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBookReads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBookReads_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBookReads_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBookWantToReads",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BookId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBookWantToReads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBookWantToReads_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBookWantToReads_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_AvatarId",
                table: "Books",
                column: "AvatarId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookFavorites_BookId",
                table: "UserBookFavorites",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookFavorites_UserId",
                table: "UserBookFavorites",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookReads_BookId",
                table: "UserBookReads",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookReads_UserId",
                table: "UserBookReads",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookWantToReads_BookId",
                table: "UserBookWantToReads",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookWantToReads_UserId",
                table: "UserBookWantToReads",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Files_AvatarId",
                table: "Books",
                column: "AvatarId",
                principalTable: "Files",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Files_AvatarId",
                table: "Books");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "UserBookFavorites");

            migrationBuilder.DropTable(
                name: "UserBookReads");

            migrationBuilder.DropTable(
                name: "UserBookWantToReads");

            migrationBuilder.DropIndex(
                name: "IX_Books_AvatarId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "Books");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Publishings",
                newName: "City");
        }
    }
}
