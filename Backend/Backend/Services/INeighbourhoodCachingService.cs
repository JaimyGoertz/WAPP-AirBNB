using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface INeighbourhoodCachingService
    {
        bool CachedAvailable();
        void SetCachedNeighbourhoods(IEnumerable<Neighbourhoods> neighbourhoods);
        Task<IEnumerable<Neighbourhoods>> GetCachedNeighbourhoods();
    }
}
