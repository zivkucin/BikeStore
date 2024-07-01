using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Repositories.Implementation;

public class UnitOfWork : IUnitOfWork
{
    private readonly PostgresContext _context;
    private ICategoryRepo _categoryRepo;
    private IManufacturerRepo _manufacturerRepo;
    private IOrderItemsRepo _orderItemsRepo;
    private IOrderRepo _orderRepo;
    private IPaymentRepo _paymentRepo;
    private IProductRepo _productRepo;
    private IShippingInfoRepo _shippingInfoRepo;
    private IUserRepo _userRepo;

    public UnitOfWork(PostgresContext context, ICategoryRepo categoryRepo, IManufacturerRepo manufacturerRepo, IOrderItemsRepo orderItemsRepo, IOrderRepo orderRepo, IPaymentRepo paymentRepo, IProductRepo productRepo, IShippingInfoRepo shippingInfoRepo, IUserRepo userRepo)
    {
        _context = context;
        _categoryRepo = categoryRepo;
        _manufacturerRepo = manufacturerRepo;
        _orderItemsRepo = orderItemsRepo;
        _orderRepo = orderRepo;
        _paymentRepo = paymentRepo;
        _productRepo = productRepo;
        _shippingInfoRepo = shippingInfoRepo;
        _userRepo = userRepo;
    }

    public ICategoryRepo CategoryRepo => _categoryRepo??=new CategoryRepo(_context);
    public IManufacturerRepo ManufacturerRepo => _manufacturerRepo ??= new ManufacturerRepo(_context);
    public IOrderItemsRepo OrderItemsRepo => _orderItemsRepo ??= new OrderItemsRepo(_context, _productRepo);
    public IOrderRepo OrderRepo => _orderRepo ??= new OrderRepo(_context);
    public IPaymentRepo PaymentRepo => _paymentRepo ??= new PaymentRepo(_context);
    public IProductRepo ProductRepo => _productRepo ??= new ProductRepo(_context);
    public IShippingInfoRepo ShippingInfoRepo => _shippingInfoRepo ??= new ShippingInfoRepo(_context);
    public IUserRepo UserRepo => _userRepo ??= new UserRepo(_context, _shippingInfoRepo);
    
    public void Dispose()
    {
        _context.Dispose();
    }
}