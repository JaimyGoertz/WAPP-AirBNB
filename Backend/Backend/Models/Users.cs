using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public partial class Users
    {
        public Users() { }

        public Users(string username, string password)
        {
            Username = username;
            Password = password;

        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Username { get; set; }
    }
}
