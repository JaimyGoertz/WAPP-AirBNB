using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public partial class Calendar
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ListingId { get; set; }

        public DateTime Date { get; set; }
        public string Available { get; set; }
        public string Price { get; set; }

        public virtual Listings Listing { get; set; }
    }
}
