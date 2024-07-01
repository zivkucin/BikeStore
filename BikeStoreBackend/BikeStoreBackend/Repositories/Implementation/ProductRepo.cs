 using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Repositories.Implementation
{
	public class ProductRepo: IProductRepo
    {
        private readonly PostgresContext _context;
		public ProductRepo(PostgresContext context)
		{
            _context = context;
		}

        public void Create(Product product)
        {
            if (product != null)
                _context.Products.Add(product);
        }

        public void Delete(int productId)
        {
            var product = GetProductById(productId);
            if (product != null)
                _context.Products.Remove(product);
        }

        public IEnumerable<Orderitem> GetOrderItemsForProduct(int productId)
        {
            return _context.Orderitems.Where(p => p.ProductId == productId).ToList();
        }

        public Product GetProductById(int productId)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductId == productId);
            if (product != null)
                return product;
            else
                throw new ArgumentException($"Product with ID {productId} not found", nameof(productId));
        }

        public IEnumerable<Product> GetProducts(int? categoryId, int? manufacturerId, string? search)
        {
            var query = _context.Products.AsQueryable();

            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId);
            }

            if (manufacturerId.HasValue)
            {
                query = query.Where(p => p.ManufacturerId == manufacturerId);
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p => p.ProductName.Contains(search) || p.Description.Contains(search));
            }


            return query.ToList();

        } 

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Update(Product product)
        {
            //not neccessary
        }
        public IEnumerable<Product> GetProductsByIds(List<int> productIds)
        {
            var products = _context.Products.Where(p => productIds.Contains(p.ProductId)).ToList();
            return products;
        }
    }
}

