using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ListingsController : Controller
    {
        private readonly AirBNBDatabaseContext _context;

        public ListingsController(AirBNBDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Listings


        // GET: Listings
        [HttpGet("locations")]
        public IEnumerable<Locations> index()
        {
            var listings = _context.Listings.Select(x => new Locations{ Id = x.Id, Latitude = x.Latitude, Longitude = x.Longitude} ).ToArray();

            return listings;
        }

        // GET: api/Listings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Listings>> GetListings(int id)
        {
            var listings = await _context.Listings.FindAsync(id);

            if (listings == null)
            {
                return NotFound();
            }

            return listings;
        }

        // PUT: api/Listings/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListings(int id, Listings listings)
        {
            if (id != listings.Id)
            {
                return BadRequest();
            }

            _context.Entry(listings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Listings
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Listings>> PostListings(Listings listings)
        {
            _context.Listings.Add(listings);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ListingsExists(listings.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetListings", new { id = listings.Id }, listings);
        }

        // DELETE: api/Listings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Listings>> DeleteListings(int id)
        {
            var listings = await _context.Listings.FindAsync(id);
            if (listings == null)
            {
                return NotFound();
            }

            _context.Listings.Remove(listings);
            await _context.SaveChangesAsync();

            return listings;
        }

        private bool ListingsExists(int id)
        {
            return _context.Listings.Any(e => e.Id == id);
        }
    }
}
