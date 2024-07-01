using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Repositories.Implementation
{
	public class ShippingInfoRepo : IShippingInfoRepo
	{
        private readonly PostgresContext _context;
		public ShippingInfoRepo(PostgresContext context)
		{
            _context = context;
		}

        public void Create(Shippinginfo shippinginfo)
        {
            if (shippinginfo != null)
                _context.Shippinginfos.Add(shippinginfo);
        }

        public void Delete(int shippingId)
        {
            var shippingInfo = GetShippinginfoById(shippingId);
            if (shippingInfo != null)
                _context.Shippinginfos.Remove(shippingInfo);
        }

        public IEnumerable<Order> GetOrdersForShippingInfo(int shippingId)
        {
            return _context.Orders.Where(s => s.ShippingId == shippingId).ToList();
        }

        public Shippinginfo GetShippinginfoById(int shippingId)
        {
            var shippingInfo = _context.Shippinginfos.FirstOrDefault(s => s.ShippingId == shippingId);
            if (shippingInfo != null)
                return shippingInfo;
            else
                throw new ArgumentException($"Shipping info with ID {shippingId} not found", nameof(shippingId));
        }

        public IEnumerable<Shippinginfo> GetShippinginfos()
        {
            return _context.Shippinginfos.ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Update(Shippinginfo shippinginfo)
        {
            //not neccessary
        }
    }
}

