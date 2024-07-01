using BikeStoreBackend.Models;

namespace BikeStoreBackend.Repositories.Interface
{
	public interface IUserRepo
	{
		IEnumerable<User> GetUsers(UserRole? userRole);
		IEnumerable<Order> GetOrdersForUser(int userId);
		IEnumerable<Shippinginfo> GetShippingInfos(int userId);
        User GetUserByEmail(string email);
        User GetUserById(int userId);
		void Create(User user);
		void Update(User user);
		void Delete(int userId);
        bool SaveChanges();
	}

}

