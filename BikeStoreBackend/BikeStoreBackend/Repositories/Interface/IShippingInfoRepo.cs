using BikeStoreBackend.Models;

namespace BikeStoreBackend.Repositories.Interface
{
	public interface IShippingInfoRepo
	{
        IEnumerable<Shippinginfo> GetShippinginfos();
        IEnumerable<Order> GetOrdersForShippingInfo(int shippingId);
        Shippinginfo GetShippinginfoById(int shippingId);
        void Create(Shippinginfo shippinginfo);
        void Update(Shippinginfo shippinginfo);
        void Delete(int shippingId);
        bool SaveChanges();
    }
}

