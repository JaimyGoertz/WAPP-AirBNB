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
            var stopwatch = Stopwatch.StartNew();
            if (_listingsCachingService.CachedAvailable())
            {
                var result = _listingsCachingService.GetCachedLocations();

                stopwatch.Stop();
                Debug.WriteLine("Listings time elapsed CACHE: " + stopwatch.Elapsed);

                return result;
            }
            var locations = await _listingsRepository.GetLocations();
            _listingsCachingService.SetCachedLocations(locations);

            stopwatch.Stop();
            Debug.WriteLine("Listings time elapsed DB: " + stopwatch.Elapsed);
            return locations;
        }

        [HttpGet("details/{id}")]
        public async Task<IEnumerable<LocationDetails>> GetLocationDetails(int id)
        {

            return await _listingsRepository.GetLocationDetails(id);
        }

        [HttpGet("Neighbourhoods")]
        public async Task<IEnumerable<Neighbourhoods>> Getneighbourhoods()
        {

            var stopwatch = Stopwatch.StartNew();
            if (_neighbourhoodCachingService.CachedAvailable())
            {
                var result = await _neighbourhoodCachingService.GetCachedNeighbourhoods();

                stopwatch.Stop();
                Debug.WriteLine("Neighbourhoods time elapsed CACHE: " + stopwatch.Elapsed);

                return result;
            }
            var neighbourhoods = await _listingsRepository.GetNeighbourhoods();
            _neighbourhoodCachingService.SetCachedNeighbourhoods(neighbourhoods);

            stopwatch.Stop();
            Debug.WriteLine("Neighbourhoods time elapsed DB: " + stopwatch.Elapsed);

            return neighbourhoods;
        }

        [HttpPost("filter")]
        public async Task<string> Filter(FilterObj filter)
        {
            return await _listingsRepository.Filter(filter);
        }
    }
}
