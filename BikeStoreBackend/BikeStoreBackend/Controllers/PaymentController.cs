using System;
using System.Data;
using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;
using BikeStoreBackend.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeStoreBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json", "application/xml")]
    public class PaymentController: ControllerBase
	{
        private readonly IMapper _mapper;
        private readonly IPaymentRepo _repository;

        public PaymentController(IPaymentRepo repository, IMapper mapper)
		{
            _repository = repository;
            _mapper = mapper;
		}
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult<IEnumerable<PaymentReadDto>> GetAll(int? orderId)
        {
            var payments = _repository.GetPayments(orderId);
            if (payments == null || !payments.Any())
                return NoContent();
            return Ok(_mapper.Map<IEnumerable<PaymentReadDto>>(payments));
        }
        [Authorize(Roles ="Admin")]
        [HttpGet("{paymentId}", Name = "GetPaymentById")]
        public ActionResult<PaymentReadDto> GetPaymentById(int paymentId)
        {
            Payment payment = _repository.GetPaymentById(paymentId);
            if (payment != null)
                return Ok(_mapper.Map<PaymentReadDto>(payment));
            return NotFound();

        }
        [Authorize(Roles = "Admin, Customer")]
        [HttpPost]
        public ActionResult<PaymentReadDto> CreatePayment(PaymentDto payment)
        {
            var paymentModel = _mapper.Map<Payment>(payment);
            try
            {
                _repository.Create(paymentModel);
                _repository.SaveChanges();
                var paymentDto = _mapper.Map<PaymentUpdateDto>(paymentModel);
                return CreatedAtRoute(nameof(GetPaymentById), new { paymentId = paymentDto.PaymentId }, paymentDto);
            }
            catch (DbUpdateException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the data to the database.");
            }

        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public ActionResult<PaymentReadDto> Update(PaymentUpdateDto payment)
        {
            try
            {
                var oldPayment = _repository.GetPaymentById(payment.PaymentId);
                if (oldPayment == null)
                {
                    return NotFound();
                }
                Payment paymentEntity = _mapper.Map<Payment>(payment);
                _mapper.Map(paymentEntity, oldPayment);
                _repository.SaveChanges();
                return Ok(_mapper.Map<OrderItemReadDto>(oldPayment));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{paymentId}")]
        public IActionResult Delete(int paymentId)
        {
            try
            {
                var payment = _repository.GetPaymentById(paymentId);
                if (payment == null)
                {
                    return NotFound();
                }
                _repository.Delete(paymentId);
                _repository.SaveChanges();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Delete Error");
            }
        }
    }
}

