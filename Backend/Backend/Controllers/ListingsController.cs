using Backend.Models;
using Backend.Repositories;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly IListingsRepository _listingsRepository;
        private readonly IListingsCachingService _listingsCachingService;
        private readonly INeighbourhoodCachingService _neighbourhoodCachingService;

        public ListingsController(IListingsRepository listingsRepository, IListingsCachingService listingsCachingService,INeighbourhoodCachingService neighbourhoodCachingService)
        {
            _listingsRepository = listingsRepository;
            _listingsCachingService = listingsCachingService;
            _neighbourhoodCachingService = neighbourhoodCachingService;
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

        [HttpGet("Neighbourhoods")]
        public async Task<IEnumerable<Neighbourhoods>> Getneighbourhoods()
        {


            return await _listingsRepository.GetNeighbourhoods();
        }

        [HttpPost("filter")]
        public async Task<string> Filter(FilterObj filter)
        {
            return await _listingsRepository.Filter(filter);
        }
    }
}
