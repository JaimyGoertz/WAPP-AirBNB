using Backend.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class UsersRepository : Repository<Users>, IUsersRepository
    {
        public AirBNBDatabaseContext Context
        {
            get { return _context as AirBNBDatabaseContext; }
        }

        public UsersRepository(AirBNBDatabaseContext context) : base(context)
        {
        }

       public async Task<ActionResult<Users>> PostUser(Users user)
        {
           string hashedPassword =  hash(user.Password);
            user.Password = hashedPassword;
            user.UserId = 0;
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return user;
        }
        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        private string hash(string password)
        { 
        byte[] salt = new byte[128 / 8];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));
            return hashed;
        }

    }
}
