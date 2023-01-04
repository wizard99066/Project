using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Books
{
    public class Author:IId
    {
        public string? FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public List<AuthorBook> AuthorBooks { get; set; }
        public object Author { get; set; }
    }
}
