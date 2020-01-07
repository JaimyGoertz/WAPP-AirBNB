using Backend.Models;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class ListingsChachingService: IListingsCachingService
    {
        private readonly IDatabase _cache;
        private const string LISTINGS_KEY_NAME = "listings";
        private const int CACHE_EXPIRE_MIN = 5;

        public ListingsChachingService(IConnectionMultiplexer connectionMultiplexer)
        {
            _cache = connectionMultiplexer.GetDatabase();
        }

        public bool CachedAvailable()
        {
            return _cache.KeyExists(LISTINGS_KEY_NAME);
        }

        public void SetCachedLocations(string locations)
        {
            var joe = _cache.StringSet(LISTINGS_KEY_NAME, locations);
            _cache.KeyExpire(LISTINGS_KEY_NAME, DateTime.Now.AddMinutes(CACHE_EXPIRE_MIN));
        }

        public string GetCachedLocations()
        {
            RedisValue cached = _cache.StringGet(LISTINGS_KEY_NAME);
            return cached;
        }
    }
}
