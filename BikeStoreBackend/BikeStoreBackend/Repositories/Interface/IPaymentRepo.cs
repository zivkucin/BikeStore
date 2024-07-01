using BikeStoreBackend.Models;

namespace BikeStoreBackend.Repositories.Interface
{
	public interface IPaymentRepo
	{
        IEnumerable<Payment> GetPayments(int? orderId);
        Payment GetPaymentById(int paymentId);
        void Create(Payment payment);
        void Update(Payment payment);
        void Delete(int paymentId);
        bool SaveChanges();
    }
}

