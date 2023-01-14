using Domain.Models.Users;

namespace Domain.Models.Books
{
    public class UserBookWantToRead : IId
    {
        public Book Book { get; set; }
        public long BookId { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }

    }
}
