using BikeStoreBackend.Models;

namespace BikeStoreBackend.Repositories.Interface
{
	public interface IManufacturerRepo
	{
        IEnumerable<Manufacturer> GetManufacturers();
        IEnumerable<Product> GetProductsForManufacturer(int manufacturerId);
        Manufacturer GetManufacturerById(int manufacturerId);
        void Create(Manufacturer manufacturer);
        void Update(Manufacturer manufacturer);
        void Delete(int manufacturerId);
        bool SaveChanges();
    }
}

