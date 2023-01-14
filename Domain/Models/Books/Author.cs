namespace Domain.Models.Books
{
    public class Author : IId
    {
        public string? FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public bool IsDeleted { get; set; }
        public List<AuthorBook> AuthorBooks { get; set; }
    }
}
