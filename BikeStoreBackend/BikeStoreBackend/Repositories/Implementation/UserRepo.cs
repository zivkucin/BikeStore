using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Repositories.Implementation
{
	public class UserRepo: IUserRepo
	{
        private readonly PostgresContext _context;
        private readonly IShippingInfoRepo _repo;
		public UserRepo(PostgresContext context, IShippingInfoRepo shippingInfoRepo)
        {
            _context = context;
            _repo = shippingInfoRepo;
        }

        public void Create(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            _context.Users.Add(user);
        }

        public void Delete(int userId)
        {
            var user = GetUserById(userId);
            _context.Users.Remove(user);
        }

        public User GetUserById(int userId)
        {
            var user= _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user != null)
                return user;
            else
                throw new ArgumentException($"User with ID {userId} not found", nameof(userId));
        }

        public IEnumerable<User> GetUsers(UserRole? userRole)
        {
            return _context.Users.Where(u => (u.UserRole == userRole || userRole==null)).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Update(User user)
        {
            //Not neccessary implementation
        }

        public IEnumerable<Order> GetOrdersForUser(int userId)
        {
            var orders = _context.Orders
        .Where(u => u.UserId == userId && u.Status != OrderStatus.U_procesu)
        .ToList();

            return orders;
        }

        public User GetUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            
            return user;
        }

        public IEnumerable<Shippinginfo> GetShippingInfos(int userId)
        {
            var userOrders = GetOrdersForUser(userId);
            var shippingInfos = new List<Shippinginfo>();
            foreach(var userOrder in userOrders)
            {
                shippingInfos.Add(_repo.GetShippinginfoById((int)userOrder.ShippingId));     
            }
            return shippingInfos;
        }

    }
}

