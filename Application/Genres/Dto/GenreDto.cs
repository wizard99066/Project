using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Genres.Dto
{
    public class GenreDto:IId
    {
        public string NameGenre { get; set; }
        public bool isDeleted { get; set; }
    }
}
