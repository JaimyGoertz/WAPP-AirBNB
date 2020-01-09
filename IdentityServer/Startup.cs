// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Reflection;

using System.Linq;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using IdentityServer.Models;
using IdentityServer4.AspNetIdentity;
using IdentityServer;
using IdentityServer.Repositories;
using IdentityServer.Services;

namespace Identityserver
{
    public class Startup
    {
        public IWebHostEnvironment Environment { get; }

        public Startup(IWebHostEnvironment environment)
        {
            Environment = environment;
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

                var context = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
                context.Database.Migrate();
                if (!context.Clients.Any())
                {
                    foreach (var client in Config.Clients)
                    {
                        context.Clients.Add(client.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.IdentityResources.Any())
                {
                    foreach (var resource in Config.Ids)
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.ApiResources.Any())
                {
                    foreach (var resource in Config.Apis)
                    {
                        context.ApiResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
            }
        }

        public void ConfigureServices(IServiceCollection services)
        {
            const string connectionStringIdentity = "Server=localhost;Database=IdentityServer4; Trusted_Connection=True;";
            var migrationsAssemblyIdentity = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;


            var connectionString = "Server=localhost;Database=AirBNB3; Trusted_Connection=True;";
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddCors(o => o.AddPolicy("MyPolicy", builder => {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddDbContext<AirBNBContext>(options => {
                options.UseSqlServer(connectionString);
            });

            services.AddTransient<IResourceOwnerPasswordValidator, PasswordValidatorService>()
            .AddTransient<IProfileService, ProfileService>()
            .AddTransient<IAuthRepository, AuthRepository>();


            services.AddIdentityServer()
            //.AddInMemoryApiResources(Config.Apis)
            //.AddInMemoryClients(Config.Clients)
            // this adds the config data from DB (clients, resources)
            .AddConfigurationStore(options => {
                options.ConfigureDbContext = builder =>
                   builder.UseSqlServer(connectionStringIdentity, sql => sql.MigrationsAssembly(migrationsAssemblyIdentity));
            })

            // this adds the operational data from DB (codes, tokens, consents)
            .AddOperationalStore(options => {
                options.ConfigureDbContext = builder =>
                    builder.UseSqlServer(connectionStringIdentity, sql => sql.MigrationsAssembly(migrationsAssemblyIdentity));

                // this enables automatic token cleanup. this is optional.
                options.EnableTokenCleanup = true;
                options.TokenCleanupInterval = 30;
            })

            // not recommended for production - you need to store your key material somewhere secure
            .AddDeveloperSigningCredential();
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //InitializeDatabase(app);
            app.UseCors("MyPolicy");

            app.UseIdentityServer();
        }
    }
}
