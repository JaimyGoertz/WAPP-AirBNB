using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Repositories;
using GeoJSON.Net.Feature;

namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly IListingsRepository _listingsRepository;

        public ListingsController(IListingsRepository listingsRepository)
        {
            _listingsRepository = listingsRepository;
        }

        // GET: locations
        [HttpGet("locations")]
        public async Task<string> GetLocations()
        {
            return await _listingsRepository.GetLocations();
        }

        [HttpGet("details/{id}")]
        public async Task<IEnumerable<LocationDetails>> GetLocationDetails(int id)
        {

            return await _listingsRepository.GetLocationDetails(id);
        }

        // GET: Listings/5
        [HttpGet("{id}")]
        public async Task<Listings> GetListings(int id)
        {
            return await _listingsRepository.GetAsync(id);
        }
    }
}
