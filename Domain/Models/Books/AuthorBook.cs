namespace Domain.Models.Books
{
    public class AuthorBook
    {
        public long AuthorId { get; set; }
        public Author Author { get; set; }
        public long BookId { get; set; }
        public Book Book { get; set; }
    }
}
