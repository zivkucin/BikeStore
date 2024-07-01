using BikeStoreBackend.Models;

namespace BikeStoreBackend.Repositories.Interface
{
	public interface IOrderItemsRepo
	{
        IEnumerable<Orderitem> GetOrderitems(int? orderId);
        Orderitem GetOrderitemById(int orderItemId);
        void Create(Orderitem item);
        void Update(Orderitem item);
        void Delete(int orderItemId);
        bool SaveChanges();
    }
}

