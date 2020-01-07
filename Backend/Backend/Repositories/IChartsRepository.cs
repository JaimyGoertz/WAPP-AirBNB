using Backend.Models;
using Backend.Models.Charts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface IChartsRepository : IRepository<Listings>
    {
        Task<ReviewChart> GetChart();
        Task<ReviewChart> GetChartAvailability();

    }
}
