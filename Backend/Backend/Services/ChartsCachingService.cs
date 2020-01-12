using Backend.Models.Charts;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class ChartsCachingService: IChartsCachingService
    {
        private readonly IDatabase _cache;
        private const string LISTINGS_KEY_NAME_REVIEW = "review";
        private const string LISTINGS_KEY_NAME_AVAILABILITY = "availability";
        private const int CACHE_EXPIRE_MIN = 5;

        public ChartsCachingService(IConnectionMultiplexer connectionMultiplexer)
        {
            _cache = connectionMultiplexer.GetDatabase();
        }

        public bool CachedAvailableReview()
        {
            return _cache.KeyExists(LISTINGS_KEY_NAME_REVIEW);
        }
        public bool CachedAvailableAvailability()
        {
            return _cache.KeyExists(LISTINGS_KEY_NAME_AVAILABILITY);
        }
        public void SetCachedReviewChart(IEnumerable<ReviewChart> chart)
        {
            var serialisedItems = chart.Select(value => (RedisValue)JsonConvert.SerializeObject(value)).ToArray();
            _cache.SetAddAsync(LISTINGS_KEY_NAME_REVIEW, serialisedItems);
            _cache.KeyExpire(LISTINGS_KEY_NAME_REVIEW, DateTime.Now.AddMinutes(CACHE_EXPIRE_MIN));
        }

        public void SetCachedAvailability(IEnumerable<ReviewChart> chart)
        {
            var serialisedItems = chart.Select(value => (RedisValue)JsonConvert.SerializeObject(value)).ToArray();
            _cache.SetAddAsync(LISTINGS_KEY_NAME_AVAILABILITY, serialisedItems);
            _cache.KeyExpire(LISTINGS_KEY_NAME_AVAILABILITY, DateTime.Now.AddMinutes(CACHE_EXPIRE_MIN));
        }
        public async Task<IEnumerable<ReviewChart>> GetCachedReview()
        {
            var cached = await _cache.SetMembersAsync(LISTINGS_KEY_NAME_REVIEW);
            var parsed = cached.Select(value =>
            {
                var deserialized = JsonConvert.DeserializeObject(value, typeof(ReviewChart));
                return (ReviewChart)deserialized;
            }).ToList();
            return parsed;
        }
        public async Task<IEnumerable<ReviewChart>> GetCachedAvailability()
        {
            var cached = await _cache.SetMembersAsync(LISTINGS_KEY_NAME_AVAILABILITY);
            var parsed = cached.Select(value =>
            {
                var deserialized = JsonConvert.DeserializeObject(value, typeof(ReviewChart));
                return (ReviewChart)deserialized;
            }).ToList();
            return parsed;
        }
    }
}
