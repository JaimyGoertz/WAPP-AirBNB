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
        private bool UsersExists(string username)
        {
            return _context.Users.Any(e => e.Username == username);
        }

        private string hash(string password)
        {
            var salt = GenerateSalt(16);

            var bytes = KeyDerivation.Pbkdf2(password, salt, KeyDerivationPrf.HMACSHA512, 10000, 16);

            return $"{ Convert.ToBase64String(salt) }:{ Convert.ToBase64String(bytes) }";
        }

        private static byte[] GenerateSalt(int length)
        {
            var salt = new byte[length];

            using (var random = RandomNumberGenerator.Create())
            {
                random.GetBytes(salt);
            }

            return salt;
        }

    }
}
