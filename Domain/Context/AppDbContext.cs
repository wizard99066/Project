using Domain.Models.Books;
using Domain.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Domain.Context
{
    public class AppDbContext : IdentityDbContext<
        User,
        Role,
        Guid,
        IdentityUserClaim<Guid>,
        UserRole,
        IdentityUserLogin<Guid>,
        IdentityRoleClaim<Guid>,
        IdentityUserToken<Guid>>
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<AuthorBook> AuthorBooks { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Publishing> Publishings { get; set; }
        public DbSet<GenreBook> GenreBooks { get; set; }
        public DbSet<PublishingBook> PublishingBooks { get; set; }

        private readonly ILoggerFactory _loggerFactory;
        public AppDbContext(DbContextOptions options, ILoggerFactory loggerFactory) : base(options)
        {
            _loggerFactory = loggerFactory;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(_loggerFactory);
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<GenreBook>().HasKey(sc => new { sc.GenreId, sc.BookId });
            builder.Entity<PublishingBook>().HasKey(sc => new { sc.PublishingId, sc.BookId });
            builder.Entity<User>()
               .HasMany(e => e.UserRoles)
               .WithOne()
               .HasForeignKey(e => e.UserId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserRole>()
                .HasOne(aur => aur.User)
                .WithMany(aur => aur.UserRoles)
                .HasForeignKey(aur => aur.UserId);

            builder.Entity<UserRole>()
                .HasOne(aur => aur.Role)
                .WithMany(aur => aur.UserRoles)
                .HasForeignKey(aur => aur.RoleId);
        }
    }
}
