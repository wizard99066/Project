using Domain.Context;

namespace Domain.Services
{
    public class BaseService
    {
        public readonly AppDbContext _db;

        public BaseService()
        {

        }

        public BaseService(AppDbContext db)
        {
            _db = db;
        }
    }
}
