using Domain.Context;
using Domain.Helpers.JWT;
using Domain.Middleware;
using Domain.Models.Users;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.Globalization;
using System.Text;
using System.Threading.Tasks;

namespace Project
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
#if DEBUG
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
                    //.AllowCredentials();
                });
            });
#endif

            var assembly = AppDomain.CurrentDomain.Load("Application");
            services
                .AddMvc(setup =>
                {
                    setup.EnableEndpointRouting = false;
                    setup.Filters.Add<ValidationMiddleware>();
                })
                .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssembly(assembly));

            services.AddMediatR(assembly);
            services.AddAutoMapper(assembly);
            services.AddDbContext<AppDbContext>(opt =>
            {
                opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped<PasswordHasher<User>>();

            #region Authorization and tokens settings

            services.AddDataProtection().SetDefaultKeyLifetime(TimeSpan.FromDays(365));

            var builder = services.AddIdentityCore<User>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddRoles<Role>();
            identityBuilder.AddEntityFrameworkStores<AppDbContext>()
                            .AddDefaultTokenProviders();

            identityBuilder.AddSignInManager<SignInManager<User>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Tokens")["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddScoped<JwtGenerator>();
            services.AddScoped<UserAccessor>();
            services.AddLogging();

            services.Configure<DataProtectionTokenProviderOptions>(options =>
                options.TokenLifespan = TimeSpan.FromMinutes(short.Parse(Configuration.GetSection("Tokens")["TokenLifespan"])));

            #endregion

            services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = int.MaxValue;
            });

            services.Configure<RequestLocalizationOptions>(options =>
            {
                options.RequestCultureProviders.Insert(0, new CustomRequestCultureProvider(context =>
                {
                    var language = context.Request.Headers["Accept-Language"].ToString();
                    var defaultLang = string.IsNullOrEmpty(language) ? "ru" : language;
                    return Task.FromResult(new ProviderCultureResult(defaultLang, defaultLang));
                }));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            var supportedCultures = new[]
{
                new CultureInfo("ru"),
                new CultureInfo("be")
            };
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("ru"),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures
            });
#if DEBUG
            app.UseCors("CorsPolicy");
#endif
            app.UseMiddleware<ErrorHandlingMiddleware>();
            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMvc();
            loggerFactory.AddSerilog();
        }
    }
}
