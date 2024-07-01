namespace BikeStoreBackend.Repositories.Interface;

public interface IBaseRepository<T, in TKey>
{
    Task<IEnumerable<T>> GetAll();
    Task<int> Create(T entity);
    Task<int> Update(T entity);
    Task<int> Delete(T entity);
    Task<int> SaveChanges();
    Task<T?> GetOne(TKey key);
}