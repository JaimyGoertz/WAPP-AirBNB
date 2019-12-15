using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Locations
    {
        public int Id { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
