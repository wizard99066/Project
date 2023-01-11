using Domain.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Books
{
    public class UserBookFavorites : IId
    {
        public Book Book { get; set; }
        public long BookId { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
