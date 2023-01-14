using Domain.Models.Files;

namespace Application.UserBooksRead.Dto
{
    public class UserBookReadDto
    {
        public string NameBook { get; set; }
        public string LastNameAuthor { get; set; }
        public File? Avatar { get; set; }
    }
}

