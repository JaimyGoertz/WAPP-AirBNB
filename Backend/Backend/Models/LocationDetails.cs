using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class LocationDetails
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Hostname { get; set; }

        public string RoomType { get; set; }

    }
}
