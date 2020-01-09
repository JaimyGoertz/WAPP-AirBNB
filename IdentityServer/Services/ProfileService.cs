using IdentityModel;
using IdentityServer.Models;
using IdentityServer.Repositories;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityServer.Services
{
    public class ProfileService : IProfileService
    {

        IAuthRepository _repository;

        public ProfileService(IAuthRepository repository)
        {
            this._repository = repository;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                var user = _repository.GetUserById(context.Subject.GetSubjectId());

                var claims = new List<Claim>
                {
                new Claim(JwtClaimTypes.Subject, user.UserId.ToString()),
                new Claim(JwtClaimTypes.PreferredUserName, user.Username),
                new Claim(JwtClaimTypes.Role, user.Role),

				//add as many claims as you want!new Claim(JwtClaimTypes.Email, user.Email),new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean)
			};

                context.IssuedClaims = claims;
                return Task.FromResult(0);
            }
            catch (Exception x)
            {
                return Task.FromResult(0);
            }
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            User user = this._repository.GetUserById(context.Subject.GetSubjectId());
            //context.IsActive = (user != null) && user.Active;
            context.IsActive = user != null;
            return Task.FromResult(0);
        }
    }
}
