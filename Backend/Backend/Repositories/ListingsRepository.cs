﻿using Backend.Models;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class ListingsRepository : Repository<Listings>, IListingsRepository
    {

        public AirBNBDatabaseContext Context
        {
            get { return _context as AirBNBDatabaseContext; }
        }

        public ListingsRepository(AirBNBDatabaseContext context) : base(context)
        {
        }

        public async Task<string> GetLocations()
        {
            var model = new FeatureCollection();
            var loc = await Context.Listings.Select(x => new Locations { Id = x.Id, Latitude = x.Latitude, Longitude = x.Longitude }).ToListAsync();
            foreach (Locations item in loc)
            {
                item.Latitude = Double.Parse(item.Latitude.ToString().Insert(2, "."), CultureInfo.InvariantCulture);
                item.Longitude = Double.Parse(item.Longitude.ToString().Insert(1, "."), CultureInfo.InvariantCulture);
                var geom = new Point(new Position(item.Latitude, item.Longitude));
                var props = new Dictionary<string, object>
                {
                    { "id", item.Id }
                };
                var feature = new Feature(geom, props);
                model.Features.Add(feature);
            }
            string json = JsonConvert.SerializeObject(model);
            return json;
        }

        public async Task<IEnumerable<LocationDetails>> GetLocationDetails(int id)
        {
            return await Context.Listings.Where(x => x.Id == id).Select(x => new LocationDetails { Id = x.Id, Name = x.Name, Hostname = x.HostName, RoomType = x.RoomType }).ToListAsync();
        }
    }
}
