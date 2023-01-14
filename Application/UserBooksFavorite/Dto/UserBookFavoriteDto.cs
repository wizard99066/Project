using Domain.Models.Files;

namespace Application.UserBooksFavorite.Dto
{
    public class UserBookFavoriteDto
    {
        public string NameBook { get; set; }
        public string LastNameAuthor { get; set; }
        public File? Avatar { get; set; }
    }
}
