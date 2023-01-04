namespace Domain.Models.Books
{
    public class GenreBook
    {
        public long GenreId { get; set; }
        public Genre Genre { get; set; }
        public long BookId { get; set; }
        public Book Book { get; set; }
    }
}
