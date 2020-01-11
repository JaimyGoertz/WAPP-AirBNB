using IdentityServer.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Repositories
{
    public class AuthRepository : IAuthRepository
    {

        private AirBNBContext dbContext;

        public AuthRepository(AirBNBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public User GetUserById(string userId)
        {
            return this.dbContext.Users.Where(user => user.UserId.ToString() == userId).FirstOrDefault();
        }

        public User GetUserByUsername(string username)
        {
            return this.dbContext.Users.Where(user => string.Equals(user.Username, username)).FirstOrDefault();
        }

        public bool ValidatePassword(string username, string password)
        {
            User user = GetUserByUsername(username);
            if (user == null) return false;
            return CheckMatch(user.Password,password);
        }

        public bool CheckMatch(string hash, string input)
        {
            Debug.WriteLine(hash, input);
            try
            {
                var parts = hash.Split(':');

                var salt = Convert.FromBase64String(parts[0]);

                var bytes = KeyDerivation.Pbkdf2(input, salt, KeyDerivationPrf.HMACSHA512, 10000, 16);

                return parts[1].Equals(Convert.ToBase64String(bytes));
            }
            catch
            {
                return false;
            }
        }

    }
}
