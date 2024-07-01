namespace BikeStoreBackend.Repositories.Interface;

public interface IUnitOfWork : IDisposable
{
    ICategoryRepo CategoryRepo { get; }
    IManufacturerRepo ManufacturerRepo { get; }
    IOrderItemsRepo OrderItemsRepo { get; }
    IOrderRepo OrderRepo { get; }
    IPaymentRepo PaymentRepo { get; }
    IProductRepo ProductRepo { get; }
    IShippingInfoRepo ShippingInfoRepo { get; }
    IUserRepo UserRepo { get; }
}