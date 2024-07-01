using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace BikeStoreBackend.Repositories.Implementation;

public class BaseRepository<T, TKey> : IBaseRepository<T, TKey> where T : class
{
    private readonly PostgresContext _context;
    protected BaseRepository(PostgresContext context)
    {
        _context = context;
    }     
    public async Task<IEnumerable<T>> GetAll()
    {
        return await _context.Set<T>().ToListAsync();
    }

    private void Add(T entity)
    {
        _context.Set<T>().Add(entity);
    }

    public async Task<int> Create(T entity)
    {
        Add(entity);
        return await SaveChanges();
    }

    private void Modify(T entity)
    {
        _context.ChangeTracker.Clear();
        _context.Set<T>().Update(entity);

    }
    public async Task<int> Update(T entity)
    {
        Modify(entity);
        return await SaveChanges();
    }

    private void Remove(T entity)
    {
        _context.Set<T>().Remove(entity);
    }

    public async Task<int> Delete(T entity)
    {
        Remove(entity);
        return await SaveChanges();
    }

    public async Task<int> SaveChanges()
    {
        return await _context.SaveChangesAsync();
    }

    public async Task<T?> GetOne(TKey key)
    {
        return await _context.Set<T>().FindAsync(key);
    }
}