using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Books.Dto
{
    public class UserBookDto
    {
        public long Id { get; set; }
        public string NameBook { get; set; }
        public string Authors { get; set; }
        public string Genres { get; set; }       
        public string Description { get; set; }       
        public bool IsRead { get; set; } //прочитано
        public bool IsToFavorite { get; set; }
        public bool IsWantToRead { get; set; } //хояу прочитать
        public long? AvatarId { get; set; }
    }
}
