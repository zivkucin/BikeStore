using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace BikeStoreBackend.Repositories.Implementation
{
	public class CategoryRepo: BaseRepository<Category, int>, ICategoryRepo
	{
        private readonly PostgresContext _context;
        public CategoryRepo(PostgresContext context) : base(context)
        {
            _context = context;
		}

        public async Task<IEnumerable<Product>> GetProductsForCategory(int catId)
        {
	        return await _context.Products.Where(c=> c.CategoryId == catId).ToListAsync();
        }

        
    }
}

