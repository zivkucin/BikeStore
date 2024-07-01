using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Repositories.Implementation
{
	public class OrderRepo:IOrderRepo
	{
        private readonly PostgresContext _context;
		public OrderRepo(PostgresContext context)
		{
            _context = context;
		}

        public void Create(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            _context.Orders.Add(order);
        }

        public void Delete(int orderId)
        {
            var order = GetOrderById(orderId);
            if (order != null)
                _context.Orders.Remove(order);
        }

        public Order GetOrderById(int orderId)
        {
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == orderId);
            if (order != null)
                return order;
            else
                throw new ArgumentException($"Order with ID {orderId} not found", nameof(orderId));
        }

        public IEnumerable<Orderitem> GetOrderItemsForOrder(int orderId)
        {
            return _context.Orderitems.Where(o => o.OrderId == orderId).ToList();
        }

        public IEnumerable<Order> GetOrders()
        {
            return _context.Orders.ToList();
        }

        public IEnumerable<Payment> GetPaymentsForOrder(int orderId)
        {
            return _context.Payments.Where(o => o.OrderId == orderId).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Update(Order order)
        {
           //not neccessary
        }

        public Order GetOrderInProgressForUser(int userId)
        {
              return _context.Orders
                    .FirstOrDefault(o => o.UserId == userId &&
                                         o.Status == OrderStatus.U_procesu);
          

        }
    }
}

