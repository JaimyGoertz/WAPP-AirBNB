using Backend.Models;
using GeoJSON.Net.Feature;
using Microsoft.AspNetCore.Mvc;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface IListingsRepository : IRepository<Listings>
    {
        Task<string> GetLocations();
        Task<IEnumerable<LocationDetails>> GetLocationDetails(int id);

        Task<IEnumerable<Neighbourhoods>> GetNeighbourhoods();

        Task<string> Filter(FilterObj filter);
    }
}
