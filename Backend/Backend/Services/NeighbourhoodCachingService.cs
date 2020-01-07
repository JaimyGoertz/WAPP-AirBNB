using Backend.Models;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class NeighbourhoodCachingService:INeighbourhoodCachingService
    {
        private readonly IDatabase _cache;
        private const string LISTINGS_KEY_NAME = "neighbourhoods";
        private const int CACHE_EXPIRE_MIN = 5;

        public NeighbourhoodCachingService(IConnectionMultiplexer connectionMultiplexer)
        {
            _cache = connectionMultiplexer.GetDatabase();
        }

        public bool CachedAvailable()
        {
            return _cache.SetLength(LISTINGS_KEY_NAME) > 0;
        }

        public void SetCachedNeighbourhoods(IEnumerable<Neighbourhoods> neighbourhoods)
        {
            var serialisedItems = neighbourhoods.Select(value => (RedisValue)JsonConvert.SerializeObject(value)).ToArray();
            _cache.SetAddAsync(LISTINGS_KEY_NAME, serialisedItems);
            _cache.KeyExpire(LISTINGS_KEY_NAME, DateTime.Now.AddMinutes(CACHE_EXPIRE_MIN));
        }

        public async Task<IEnumerable<Neighbourhoods>> GetCachedNeighbourhoods()
        {
            var cached = await _cache.SetMembersAsync(LISTINGS_KEY_NAME);
            var parsed = cached.Select(value =>
            {
                var deserialized = JsonConvert.DeserializeObject(value, typeof(Neighbourhoods));
                return (Neighbourhoods)deserialized;
            }).ToList();
            return parsed;
        }
    }
}
