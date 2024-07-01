using System;
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
    public class OrderController :ControllerBase
	{
        private readonly IOrderRepo _repository;
        private readonly IMapper _mapper;
        private readonly IUserRepo _user;
        public OrderController(IOrderRepo repository, IMapper mapper, IUserRepo user)
		{
            _user = user;
            _repository = repository;
            _mapper = mapper;
		}

        [Authorize(Roles ="Admin")]
        [HttpGet]
        public ActionResult<IEnumerable<OrderReadDto>> GetAll()
        {
            var orderDtos = _mapper.Map<IEnumerable<OrderReadDto>>(_repository.GetOrders());
            foreach (var orderDto in orderDtos)
            {
                orderDto.Orderitems = _mapper.Map<IEnumerable<OrderItemUpdateDto>>
                     (_repository.GetOrderItemsForOrder(orderDto.OrderId)).ToList();
                orderDto.Payments = _mapper.Map<IEnumerable<PaymentUpdateDto>>
                     (_repository.GetPaymentsForOrder(orderDto.OrderId)).ToList();
            }
            return Ok(orderDtos);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("{orderId}", Name = "GetOrderById")]
        public ActionResult<OrderReadDto> GetOrderById(int orderId)
        {

            Order order = _repository.GetOrderById(orderId);
            if (order != null)
            {
                var orderDto = _mapper.Map<OrderReadDto>(order);
                orderDto.Orderitems = _mapper.Map<IEnumerable<OrderItemUpdateDto>>
                    (_repository.GetOrderItemsForOrder(order.OrderId)).ToList();
                orderDto.Payments = _mapper.Map<IEnumerable<PaymentUpdateDto>>
                     (_repository.GetPaymentsForOrder(orderDto.OrderId)).ToList();
                return Ok(orderDto);
            }
            return NotFound();

        }

        /*[Authorize(Roles = "Customer")]
        [HttpGet("/orders", Name = "GetOrderById")]
        public ActionResult<OrderReadDto> GetMyOrders()
        {
            var user=_repo
            Order order = _repository.GetOrderById(orderId);
            if (order != null)
            {
                var orderDto = _mapper.Map<OrderReadDto>(order);
                orderDto.Orderitems = _mapper.Map<IEnumerable<OrderItemUpdateDto>>
                    (_repository.GetOrderItemsForOrder(order.OrderId)).ToList();
                orderDto.Payments = _mapper.Map<IEnumerable<PaymentUpdateDto>>
                     (_repository.GetPaymentsForOrder(orderDto.OrderId)).ToList();
                return Ok(orderDto);
            }
            return NotFound();

        }*/



        [Authorize(Roles = "Admin, Customer")]
        [HttpPost]
        public ActionResult<OrderReadDto> CreateOrder(OrderDto order)
        {
            var user = _user.GetUserByEmail(User?.Identity?.Name);
            order.UserId = user.UserId;
            try
            {
                var orderModel = _mapper.Map<Order>(order);
                _repository.Create(orderModel);
                _repository.SaveChanges();
                var orderDto = _mapper.Map<OrderUpdateDto>(orderModel);

                int orderId = orderDto.OrderId;

                Order orderFromDb = _repository.GetOrderById(orderId);

                if (orderFromDb != null)
                {
                    var completeOrderDto = _mapper.Map<OrderReadDto>(orderFromDb);
                    completeOrderDto.Orderitems = _mapper.Map<IEnumerable<OrderItemUpdateDto>>(
                        _repository.GetOrderItemsForOrder(orderFromDb.OrderId)).ToList();
                    completeOrderDto.Payments = _mapper.Map<IEnumerable<PaymentUpdateDto>>(
                        _repository.GetPaymentsForOrder(orderFromDb.OrderId)).ToList();

                    return Ok(completeOrderDto);
                }

                return NotFound();
            }
            catch (DbUpdateException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the data to the database.");
            }
            
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public ActionResult<OrderReadDto> Update(OrderUpdateDto order)
        {
            try
            {
                var oldOrder = _repository.GetOrderById(order.OrderId);
                if (oldOrder == null)
                {
                    return NotFound();
                }
                Order orderEntity = _mapper.Map<Order>(order);
                _mapper.Map(orderEntity, oldOrder);
                _repository.SaveChanges();
                return Ok(_mapper.Map<OrderReadDto>(oldOrder));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{orderId}")]
        public IActionResult Delete(int orderId)
        {
            try
            {
                var order = _repository.GetOrderById(orderId);
                if (order == null)
                {
                    return NotFound();
                }
                _repository.Delete(orderId);
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

