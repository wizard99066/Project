using Domain.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace UnitTest
{
    public class Context : IDisposable
    {
        private readonly AppDbContext _context;

        public AppDbContext AppDbContext => _context;
        public readonly ServiceProvider ServiceProvider;

        public Context()
        {
            var configuration = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.Development.json", optional: false, reloadOnChange: true)
                   .Build();

            var serviceCollection = new ServiceCollection();
            serviceCollection.AddSingleton(configuration);

            ServiceProvider = serviceCollection.BuildServiceProvider();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            _context = new AppDbContext(new DbContextOptionsBuilder<AppDbContext>().UseNpgsql(connectionString).Options);
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
