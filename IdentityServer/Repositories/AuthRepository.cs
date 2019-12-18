using IdentityServer.Models;
using System;
using System.Collections.Generic;
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
            return string.Equals(password, user.Password);
        }
    }
}
