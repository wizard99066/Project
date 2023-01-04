using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Books
{
    public class AuthorBook : IId
    {
        public long AuthorId { get; set; }
        public Author Author { get; set; }
        public long BookId { get; set; }
        public Book Book { get; set; }
    }
}
