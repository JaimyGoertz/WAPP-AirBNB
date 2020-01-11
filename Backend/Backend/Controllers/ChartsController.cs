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

namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        private readonly IChartsRepository _chartsRepository;

        public ChartsController(IChartsRepository chartsRepository)
        {
            _chartsRepository = chartsRepository;
        }

        [HttpGet("review")]
        public async Task<IEnumerable<ReviewChart>> GetChart()
        {
            return await _chartsRepository.GetChart();
        }

       [HttpGet("availability")]
        public async Task<IEnumerable<ReviewChart>> GetChartAvailability()
        {
            return await _chartsRepository.GetChartAvailability();
        }

        //[HttpGet("price")]
        //public async Task<Charts> GetChartPrice()
        //{
        //    return await _chartsRepository.GetCharts();
        //}
    }
}
