﻿using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Application.Books.Dto
{
    public class BookDto:IId
    {
        public string NameBook { get; set; }
        public string LastNameAuthor { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public bool isDeleted { get; set; }
        public string? Publishing { get; set; }
        public bool IsRead { get; set; } //прочитано
        public bool IsToFavorite { get; set; }
        public bool IsWantToRead { get; set; } //хояу прочитать
        public long? AvatarId { get; set; }

    }
}
