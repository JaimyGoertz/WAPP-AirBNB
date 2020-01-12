using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Repositories;
using Backend.Models.Charts;
using Backend.Services;
using System.Diagnostics;

namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        private readonly IChartsRepository _chartsRepository;
        private readonly IChartsCachingService _chartsCachingService;

        public ChartsController(IChartsRepository chartsRepository, IChartsCachingService chartsCachingService)
        {
            _chartsRepository = chartsRepository;
            _chartsCachingService = chartsCachingService;
        }

        [HttpGet("review")]
        public async Task<IEnumerable<ReviewChart>> GetChart()
        {
            var stopwatch = Stopwatch.StartNew();
            if (_chartsCachingService.CachedAvailableReview())
            {
                var result = await _chartsCachingService.GetCachedReview();

                stopwatch.Stop();
                Debug.WriteLine("Chart (review) time elapsed CACHE: " + stopwatch.Elapsed);

                return result.OrderBy(c => c.Numbers);
            }
            var chart = await _chartsRepository.GetChart();
            _chartsCachingService.SetCachedReviewChart(chart);

            stopwatch.Stop();
            Debug.WriteLine("Chart (review) time elapsed DB: " + stopwatch.Elapsed);

            return chart.OrderBy(c => c.Numbers);
        }

       [HttpGet("availability")]
        public async Task<IEnumerable<ReviewChart>> GetChartAvailability()
        {
            var stopwatch = Stopwatch.StartNew();
            if (_chartsCachingService.CachedAvailableAvailability())
            {
                var result = await _chartsCachingService.GetCachedAvailability();

                stopwatch.Stop();
                Debug.WriteLine("Chart (Availability) time elapsed CACHE: " + stopwatch.Elapsed);

                return result.OrderBy(c => c.Numbers);
            }
            var chart = await _chartsRepository.GetChartAvailability();
            _chartsCachingService.SetCachedAvailability(chart);

            stopwatch.Stop();
            Debug.WriteLine("Chart (Availability) time elapsed DB: " + stopwatch.Elapsed);

            return chart.OrderBy(c => c.Numbers);
        }
    }
}
