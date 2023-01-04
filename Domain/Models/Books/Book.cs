using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Books
{
    public class Book:IId
    {
        public int Year { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public List<AuthorBook> AuthorBooks { get; set; }
        public List<PublishingBook> Publishings { get; set; }
        public List<GenreBook> GenreBooks { get; set; }

    }
}
