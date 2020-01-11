using Backend.Models;
using Backend.Models.Charts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class ChartsRepository : Repository<Listings>, IChartsRepository
    {

        public AirBNBDatabaseContext Context
        {
            get { return _context as AirBNBDatabaseContext; }
        }

        public ChartsRepository(AirBNBDatabaseContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ReviewChart>> GetChart()
        {
            List<ReviewChart> charts = await Task.Run(() => Context.Listings
          .GroupBy(x => x.ReviewScoresRating / 10)
          .Select(l => new ReviewChart
          {
              Numbers = l.Key,
              Count = l.Count()
          })
          .ToList()
      );
            var ratings = charts.Where(x => x.Numbers != null).ToArray();
            return ratings;
        }

        public IEnumerable<int>RemoveZeros(int[] source, int take)
        {
            int[] array = source.Where(x => x != 0).ToArray();
            int index = Array.IndexOf(array, 0);
            var bar = array.Take(take);
            return bar;
        }

        public async Task<IEnumerable<ReviewChart>> GetChartAvailability()
        {
            List<ReviewChart> chart = await Task.Run(() => Context.Listings
            .GroupBy(x => x.Availability365)
            .Select(l => new ReviewChart
             {
             Numbers = l.Key,
            Count = l.Count()
             })
            .OrderBy(c => c.Numbers)
               .ToList()
 );

            return chart;
        }

    }
}
