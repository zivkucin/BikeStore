using BikeStoreBackend.Models;

namespace BikeStoreBackend.Repositories.Interface
{
	public interface ICategoryRepo : IBaseRepository<Category, int>
	{
		Task<IEnumerable<Product>> GetProductsForCategory(int catId);
    }
}

