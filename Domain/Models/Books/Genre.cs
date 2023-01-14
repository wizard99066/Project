namespace Domain.Models.Books
{
    public class Genre : IId
    {
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
    }
}
