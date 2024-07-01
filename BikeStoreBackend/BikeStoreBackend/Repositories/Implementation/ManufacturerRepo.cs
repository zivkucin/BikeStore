using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Repositories.Implementation
{
	public class ManufacturerRepo:IManufacturerRepo
	{
        private readonly PostgresContext _context;
		public ManufacturerRepo(PostgresContext context)
		{
            _context = context;
		}

        public void Create(Manufacturer manufacturer)
        {
            if (manufacturer == null) throw new ArgumentNullException(nameof(manufacturer));
            _context.Manufacturers.Add(manufacturer);
        }

        public void Delete(int manufacturerId)
        {
            var manufacturer = GetManufacturerById(manufacturerId);
            if (manufacturer != null)
                _context.Manufacturers.Remove(manufacturer);
        }

        public Manufacturer GetManufacturerById(int manufacturerId)
        {
            var man = _context.Manufacturers.FirstOrDefault(m => m.ManufacturerId == manufacturerId);
            if (man != null)
                return man;
            else
                throw new ArgumentException($"Manufacturer with ID {manufacturerId} not found", nameof(manufacturerId));
        }

        public IEnumerable<Manufacturer> GetManufacturers()
        {
            return _context.Manufacturers.ToList();
        }

        public IEnumerable<Product> GetProductsForManufacturer(int manufacturerId)
        {
            return _context.Products.Where(m => m.ManufacturerId == manufacturerId).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Update(Manufacturer manufacturer)
        {
            //not neccessary
        }
    }
}

