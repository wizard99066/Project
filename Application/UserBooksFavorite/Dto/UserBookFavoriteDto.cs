using Domain.Models.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserBooksFavorite.Dto
{
    public class UserBookFavoriteDto
    {
        public string NameBook { get; set; }
        public string LastNameAuthor { get; set; }
        public File? Avatar { get; set; }
    }
}
