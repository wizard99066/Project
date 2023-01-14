using Domain.Models.Files;

namespace Application.UserBooksWantToRead.Dto
{
    public class UserBookWantToReadDto
    {
        public string NameBook { get; set; }
        public string LastNameAuthor { get; set; }
        public File? Avatar { get; set; }
    }
}
