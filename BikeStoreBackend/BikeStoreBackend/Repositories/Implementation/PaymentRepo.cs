using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Repositories.Implementation
{
	public class PaymentRepo: IPaymentRepo
	{
        private readonly PostgresContext _context;
		public PaymentRepo(PostgresContext context)
		{
            _context = context;
		}

        public void Create(Payment payment)
        {
            if (payment != null)
                _context.Payments.Add(payment);
        }

        public void Delete(int paymentId)
        {
            var payment = GetPaymentById(paymentId);
            if (payment != null)
                _context.Payments.Remove(payment);
        }

        public Payment GetPaymentById(int paymentId)
        {
            var payment = _context.Payments.FirstOrDefault(p => p.PaymentId == paymentId);
            if (payment != null)
                return payment;
            else
                throw new ArgumentException($"Payment with ID {paymentId} not found", nameof(paymentId));
        }

        public IEnumerable<Payment> GetPayments(int? orderId)
        {
            return _context.Payments.Where(p => (orderId == null || p.OrderId == orderId)).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Update(Payment payment)
        {
            //not neccessary
        }
    }
}

