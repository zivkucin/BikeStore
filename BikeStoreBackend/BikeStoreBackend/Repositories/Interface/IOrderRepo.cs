using BikeStoreBackend.Models;

namespace BikeStoreBackend.Repositories.Interface
{
	public interface IOrderRepo
	{
        IEnumerable<Order> GetOrders();
        IEnumerable<Orderitem> GetOrderItemsForOrder(int orderId);
        IEnumerable<Payment> GetPaymentsForOrder(int orderId);
        Order GetOrderById(int orderId);
        void Create(Order order);
        void Update(Order order);
        Order GetOrderInProgressForUser(int userId);
        void Delete(int orderId);
        bool SaveChanges();
    }
}

