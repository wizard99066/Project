using Domain.Context;
using Domain.Errors;
using System.Net;

namespace Domain.Services
{
    public class CRUDService<TEntity> : BaseService, ICRUD<TEntity>
            where TEntity : class, new()
    {
        public CRUDService()
        {

        }

        public CRUDService(AppDbContext db) : base(db)
        {

        }

        public bool Add(TEntity entity)
        {
            try
            {
                _db.Set<TEntity>().Add(entity);

                return SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public TEntity Read(long id)
        {
            try
            {
                var entity = _db.Set<TEntity>().Find(id);

                if (entity == null)
                    throw new RestException(HttpStatusCode.NotFound, "Записи не существует.");

                return entity;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(long id)
        {
            try
            {
                var entity = Read(id);

                _db.Set<TEntity>().Remove(entity);

                return SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }


        public bool SaveChanges()
        {
            try
            {
                return _db.SaveChanges() > 0;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Update(TEntity entity)
        {
            try
            {
                _db.Set<TEntity>().Update(entity);

                return SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
