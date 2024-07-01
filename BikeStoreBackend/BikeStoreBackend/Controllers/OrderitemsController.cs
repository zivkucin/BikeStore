using System;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using AutoMapper;
using BikeStoreBackend.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;

namespace BikeStoreBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json", "application/xml")]
    public class OrderitemsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IOrderItemsRepo _repository;
        private readonly IOrderRepo _orderRepo;
        private readonly IProductRepo _productRepo;

        public OrderitemsController(IOrderItemsRepo repository,
            IMapper mapper, IOrderRepo orderRepo, IProductRepo productRepo)
        {
            _repository = repository;
            _mapper = mapper;
            _orderRepo = orderRepo;
            _productRepo = productRepo;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult<IEnumerable<OrderItemReadDto>> GetAll(int? orderId)
        {
            var items = _repository.GetOrderitems(orderId);
            if (items == null || !items.Any())
                return NoContent();
            return Ok(_mapper.Map<IEnumerable<OrderItemReadDto>>(items));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{orderItemId}", Name = "GetOrderItemById")]
        public ActionResult<OrderItemReadDto> GetOrderItemById(int orderItemId)
        {
            Orderitem item = _repository.GetOrderitemById(orderItemId);
            if (item != null)
                return Ok(_mapper.Map<OrderItemReadDto>(item));
            return NotFound();

        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPost]
        public ActionResult<OrderItemReadDto> CreateOrderItem(OrderItemDto item)
        {
            var itemModel = _mapper.Map<Orderitem>(item);
            try
            {
                _repository.Create(itemModel);
                _repository.SaveChanges();
                var order = _orderRepo.GetOrderById(item.OrderId!.Value);
                var product = _productRepo.GetProductById(item.ProductId!.Value);
                if (order.TotalAmount is null) order.TotalAmount = 0;
                order.TotalAmount += item.Quantity * product.Price;
                _repository.SaveChanges();
                var itemDto = _mapper.Map<OrderItemUpdateDto>(itemModel);
                return _mapper.Map<OrderItemReadDto>(itemModel);
            }
            catch (DbUpdateException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the data to the database.");
            }

        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public ActionResult<OrderItemReadDto> Update(OrderItemUpdateDto order)
        {
            try
            {
                var oldOrder = _repository.GetOrderitemById(order.OrderItemId);
                if (oldOrder == null)
                {
                    return NotFound();
                }
                Orderitem orderEntity = _mapper.Map<Orderitem>(order);
                _mapper.Map(orderEntity, oldOrder);
                _repository.SaveChanges();
                return Ok(_mapper.Map<OrderItemReadDto>(oldOrder));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }
        [Authorize(Roles ="Admin")]
        [HttpDelete("{orderItemId}")]
        public IActionResult Delete(int orderItemId)
        {
            try
            {
                var item = _repository.GetOrderitemById(orderItemId);
                if (item == null)
                {
                    return NotFound();
                }
                _repository.Delete(orderItemId);
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

