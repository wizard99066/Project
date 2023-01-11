using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Publishings.Dto
{
    public class PublishingDto : IId
    {
        public string Name { get; set; }
        public bool isDeleted { get; set; }
    }
}
