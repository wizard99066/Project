namespace Domain.Models.Books
{
    public class Book : IId
    {
        public int? Year { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public List<AuthorBook> AuthorBooks { get; set; }
        public List<PublishingBook> Publishings { get; set; }
        public List<GenreBook> GenreBooks { get; set; }
        public bool IsDeleted { get; set; }
        public Files.File Avatar { get; set; }
        public long? AvatarId { get; set; }
        public List<UserBookFavorites> UsersBookFavorites { get; set; }
        public List<UserBookRead> UsersBookReads { get; set; }
        public List<UserBookWantToRead> UsersBookWantToReads { get; set; }

    }
}
