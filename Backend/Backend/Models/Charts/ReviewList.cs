using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity;

namespace Backend.Models.Charts
{
    public partial class ReviewList
    {
        public int? ReviewScoresRating { get; set; }
        public int counter { get; internal set; }
    }
}
