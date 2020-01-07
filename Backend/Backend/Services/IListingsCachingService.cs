using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IListingsCachingService
    {
        bool CachedAvailable();
        void SetCachedLocations(string locations);
        string GetCachedLocations();
    }
}
