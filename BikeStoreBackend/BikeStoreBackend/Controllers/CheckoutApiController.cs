using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using BikeStoreBackend.Models;
using BikeStoreBackend.DTOs;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Controllers
{
	
	[ApiController]
    public class CheckoutApiController : ControllerBase
    {

        private readonly IOrderRepo _orderRepo;
        private readonly IConfiguration _config;
        private readonly IShippingInfoRepo _shippingInfo;
        private readonly IPaymentRepo _paymentRepo;
        public CheckoutApiController(IConfiguration config, IOrderRepo orderRepo, IShippingInfoRepo infoRepo, IPaymentRepo payment)
		{
            _config = config;
            _shippingInfo = infoRepo;
            _orderRepo = orderRepo;
            _paymentRepo = payment;
			StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];

        }

		[HttpPost]
        [Route("api/create-checkout-session")]
        public ActionResult CreateCheckoutSession([FromBody] CreateCheckoutSessionRequest request)
		{
            List<LineItemsDto> orderItems = request.OrderItems;
            var orderId = request.OrderId;
            var address = request.Address;
            var city = request.City;
            var zipCode = request.ZipCode;
            var country = request.Country;

            var service = new SessionService();
            
            var options = new SessionCreateOptions
            {
                LineItems = orderItems.Select(item => new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = item.UnitAmount,
                        Currency ="rsd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.Name,
                        },
                    },
                    Quantity = item.Quantity,
                }).ToList(),

                Mode = "payment",
                SuccessUrl = _config["frontend_url"]+"/success",
                CancelUrl = _config["frontend_url"] + "/cart",
                Metadata = new Dictionary<string, string> // Add metadata here
                {
                    { "OrderId", orderId.ToString() },
                    { "Address", address },
                    { "City", city },
                    { "ZipCode", zipCode },
                    { "Country", country }
                }

            };

           
            var session = service.Create(options);

            //Response.Headers.Add("Location", session.Url);
            return Ok(session.Url);

        }

        const string endpointSecret = "whsec_a07de9d8a4c1f1f76780450e4f305562fda5ce4374e2a21a42d3cb4398770e26";

        [HttpPost]
        [Route("webhook")]
        public async Task<IActionResult> Index()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], endpointSecret, throwOnApiVersionMismatch:false);

                Console.WriteLine("webhook verified");
                // Handle the event
                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = (Stripe.Checkout.Session)stripeEvent.Data.Object;

                    // Access metadata
                    int orderId = int.Parse(session.Metadata["OrderId"]);

                    Shippinginfo shippingModel = new Shippinginfo();

                    shippingModel.Address = session.Metadata["Address"];
                    shippingModel.City = session.Metadata["City"];
                    shippingModel.Country = session.Metadata["Country"];
                    shippingModel.ZipCode = session.Metadata["ZipCode"];
                    var shippingInfoId = 0;
                    try
                    {
                        _shippingInfo.Create(shippingModel);
                        _shippingInfo.SaveChanges();

                        shippingInfoId = shippingModel.ShippingId;

                    }catch(Exception ex)
                    {
                        Console.WriteLine(ex);
                    }

                    var oldOrder = _orderRepo.GetOrderById(orderId);
                    if (oldOrder == null)
                    {
                        return NotFound();
                    }
                    oldOrder.Status = OrderStatus.Obrada;
                    oldOrder.ShippingId = shippingInfoId;
                    _orderRepo.SaveChanges();

                    try {

                        Payment uplata = new Payment();
                        uplata.OrderId = orderId;
                        uplata.StripeTransactionId = session.PaymentIntentId;
                        uplata.Amount = session.AmountTotal / 100;

                        _paymentRepo.Create(uplata);
                        _paymentRepo.SaveChanges();
                    }
                    catch(Exception ex)
                    {
                        Console.WriteLine(ex);
                    }



                    return Ok();

                }
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                Console.WriteLine("webhook not working");
                return BadRequest();
            }
        }
    }
    public class CreateCheckoutSessionRequest
    {
        public List<LineItemsDto> OrderItems { get; set; }
        public int OrderId { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Country  { get; set; }

    }
}

