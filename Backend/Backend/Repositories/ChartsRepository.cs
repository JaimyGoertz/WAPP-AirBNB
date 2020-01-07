using Backend.Models;
using Backend.Models.Charts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public async Task<ReviewChart> GetChart()
        {
            int value = 0;
            List<ReviewList> reviews = new List<ReviewList> { };
            reviews = await Context.Listings.GroupBy(p => p.ReviewScoresRating / 10).Select(x => new ReviewList { ReviewScoresRating = x.Key, counter = x.Count() }).ToListAsync();

            int[] numbers = new int[50];
            int[] count = new int[50];
            for (int intCounter = 0; intCounter < reviews.Count; intCounter++)
                {
                value = reviews[intCounter].ReviewScoresRating.GetValueOrDefault();


                    if (numbers.Contains(value) == false)
                    {
                        //Get position of already exist number
                        numbers[intCounter] = value;
                        count[intCounter] = reviews[intCounter].counter;
                    }
                    else
                    {
                    int index = Array.IndexOf(numbers, value);
                    int indexedNumber = count[index];
                    int newValue = indexedNumber + count[intCounter];
                    count[index] = newValue;
                    }
                }
                
               
            IEnumerable<int> numbersDone = RemoveZeros(numbers, 20);
            IEnumerable<int> countDone = RemoveZeros(count, 20);
            ReviewChart charts = new ReviewChart { Numbers = numbersDone, Count = countDone};
            return charts;
        }

        public IEnumerable<int>RemoveZeros(int[] source, int take)
        {
            int[] array = source.Where(x => x != 0).ToArray();
            int index = Array.IndexOf(array, 0);
            var bar = array.Take(take);
            return bar;
        }

        public async Task<ReviewChart> GetChartAvailability()
        {
            int value = 0;
            List<ReviewList> reviews = new List<ReviewList> { };
            reviews = await Context.Listings.GroupBy(p => p.Availability365).Select(x => new ReviewList { ReviewScoresRating = x.Key, counter = x.Count() }).OrderBy(c => c.ReviewScoresRating).ToListAsync();
            int[] numbers = new int[366];
            int[] count = new int[366];
            for (int intCounter = 0; intCounter < 366; intCounter++)
            {
                value = reviews[intCounter].ReviewScoresRating.GetValueOrDefault();
                //Get position of already exist number
                if (value != 0)
                {
                    numbers[intCounter] = value;
                    count[intCounter] = reviews[intCounter].counter;
                }
            }

            Array.Sort(numbers);
            IEnumerable<int> numbersDone = RemoveZeros(numbers,366);
            IEnumerable<int> countDone = RemoveZeros(count,366);
            ReviewChart charts = new ReviewChart { Numbers = numbersDone, Count = countDone };
            return charts;
        }

    }
}
