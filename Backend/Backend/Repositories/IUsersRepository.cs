using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface IUsersRepository : IRepository<Users>
    {
        Task<ActionResult<Users>> PostUser(Users user);
    }
}
