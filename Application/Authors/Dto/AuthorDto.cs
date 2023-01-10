using Domain.Models;

namespace Application.Authors.Dto
{
    public class AuthorDto : IId
    {
        public string LastName { get; set; }
        public string? FirstName { get; set; }
        public string? Birthday { get; set; }
        public bool isDeleted { get; set; }
    }
}
