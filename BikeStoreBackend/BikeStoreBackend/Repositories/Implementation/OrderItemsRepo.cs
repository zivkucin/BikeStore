using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Repositories.Implementation
{
	public class OrderItemsRepo: IOrderItemsRepo
	{
        private readonly PostgresContext _context;
        private readonly IProductRepo _repo;
		public OrderItemsRepo(PostgresContext context, IProductRepo productRepo)
		{
            _context = context;
            _repo = productRepo;
		}

        public void Create(Orderitem item)
        {
            if (item == null)
                return;
            if (item.Quantity > _repo.GetProductById((int)item.ProductId).StockLevel)
                return;
            _context.Orderitems.Add(item);
        }

        public void Delete(int orderItemId)
        {
            var orderItem = GetOrderitemById(orderItemId);
            if (orderItem != null)
                _context.Orderitems.Remove(orderItem);
        }

        public Orderitem GetOrderitemById(int orderItemId)
        {
            var item = _context.Orderitems.FirstOrDefault(o => o.OrderItemId == orderItemId);
            if (item != null)
                return item;
            else
                throw new ArgumentException($"Order item with ID {orderItemId} not found", nameof(orderItemId));
        }

        public IEnumerable<Orderitem> GetOrderitems(int? orderId)
        {
            return _context.Orderitems.Where(o => (orderId == null || o.OrderId == orderId)).ToList();
        }

        public bool SaveChanges()
        {
            return(_context.SaveChanges() >= 0);
        }

        public void Update(Orderitem item)
        {
            //not neccessary
        }
    }
}

