namespace Domain.Models.Books
{
    public class PublishingBook
    {
        public long PublishingId { get; set; }
        public Publishing Publishing { get; set; }
        public long BookId { get; set; }
        public Book Book { get; set; }
    }
}
