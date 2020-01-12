using Backend.Models.Charts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IChartsCachingService
    {
        bool CachedAvailableReview();
        bool CachedAvailableAvailability();
        void SetCachedReviewChart(IEnumerable<ReviewChart> chart);

        void SetCachedAvailability(IEnumerable<ReviewChart> chart);
        Task<IEnumerable<ReviewChart>> GetCachedReview();
        Task<IEnumerable<ReviewChart>> GetCachedAvailability();
    }
}
