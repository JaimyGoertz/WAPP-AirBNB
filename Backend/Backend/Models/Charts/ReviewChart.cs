using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Charts
{
    public class ReviewChart
    {
        public IEnumerable<int> Numbers { get; set; }
        public IEnumerable<int> Count { get; set; }
    }
}
