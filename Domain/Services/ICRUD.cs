namespace Domain.Services
{
    public interface ICRUD<TEntity> where TEntity : class, new()
    {
        abstract bool Add(TEntity entity);
        abstract bool SaveChanges();
        abstract TEntity Read(long id);
        abstract bool Delete(long id);
        abstract bool Update(TEntity entity);
    }
}
