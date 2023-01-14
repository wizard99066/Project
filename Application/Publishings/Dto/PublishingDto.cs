using Domain.Models;

namespace Application.Publishings.Dto
{
    public class PublishingDto : IId
    {
        public string Name { get; set; }
        public bool isDeleted { get; set; }
    }
}
