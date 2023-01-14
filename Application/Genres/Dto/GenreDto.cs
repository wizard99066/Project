using Domain.Models;

namespace Application.Genres.Dto
{
    public class GenreDto : IId
    {
        public string NameGenre { get; set; }
        public bool isDeleted { get; set; }
    }
}
