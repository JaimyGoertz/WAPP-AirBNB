using IdentityServer.Repositories;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Services
{
    public class PasswordValidatorService : IResourceOwnerPasswordValidator
    {

        IAuthRepository _repository;

        public PasswordValidatorService(IAuthRepository repository)
        {
            this._repository = repository;
        }

        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            if (this._repository.ValidatePassword(context.UserName, context.Password))
            {
                context.Result = new GrantValidationResult(this._repository.GetUserByUsername(context.UserName).UserId.ToString(), "password", null, "local", null);
                return Task.FromResult(context.Result);
            }
            context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "The username and password do not match", null);
            return Task.FromResult(context.Result);
        }
    }
}
