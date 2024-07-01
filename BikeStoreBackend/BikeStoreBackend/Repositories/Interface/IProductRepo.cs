using BikeStoreBackend.Models;

namespace BikeStoreBackend.Repositories.Interface
{
	public interface IProductRepo
	{
        IEnumerable<Product> GetProducts(int? categoryId, int? manufacturerId, string? search);
        IEnumerable<Orderitem> GetOrderItemsForProduct(int productId);
        Product GetProductById(int productId);
        void Create(Product product);
        void Update(Product product);
        void Delete(int productId);
        bool SaveChanges();
        IEnumerable<Product> GetProductsByIds(List<int> productIds);
    }
}

