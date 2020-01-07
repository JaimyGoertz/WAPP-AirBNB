using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class FilterObj
    {
        public int? Review { get; set; }
        public double? Price { get; set; }
        public string Neighbourhood { get; set; }
    }
}
