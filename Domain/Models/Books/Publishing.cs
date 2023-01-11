using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Books
{
    public class Publishing:IId
    {
        public string Name { get; set; }        
        public string? Address { get; set; }
        public bool IsDeleted { get; set; }
    }
}
