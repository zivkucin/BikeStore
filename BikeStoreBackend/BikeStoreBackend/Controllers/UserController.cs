using System;
using System.Security.Claims;
using AutoMapper;
using BikeStoreBackend.DTOs;
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
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepo _repository;
        private readonly IOrderRepo _orderRepo;
        private readonly IShippingInfoRepo _shippingRepo;
        private readonly IOrderItemsRepo _orderItemsRepo;
        public UserController(IUserRepo repository, IMapper mapper, IOrderRepo orderRepo, IShippingInfoRepo shippingRepo, IOrderItemsRepo orderItems)
        {
            _orderItemsRepo = orderItems;
            _repository = repository;
            _shippingRepo = shippingRepo;
            _orderRepo = orderRepo;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult<IEnumerable<UserReadDto>> GetAll(UserRole? userRole)
        {
            var users = _repository.GetUsers(userRole);
            if (users == null || !users.Any())
                return NoContent();
            var usersDtos = _mapper.Map<IEnumerable<UserReadDto>>(users);
            foreach (var user in usersDtos)
            {
                var u = _repository.GetUserById(user.UserId);
                var orderDto = _mapper.Map<IEnumerable<OrderUpdateDto>>(u.Orders);
                user.Orders = orderDto.ToList();
            }
            return Ok(usersDtos);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("{userId}", Name = "GetUserById")]
        public ActionResult<UserReadDto> GetUserById(int userId)
        {
            User user = _repository.GetUserById(userId);
            if (user != null)
            {
                var order = _mapper.Map<IEnumerable<OrderUpdateDto>>(user.Orders);
                var userDto = _mapper.Map<UserReadDto>(user);
                userDto.Orders = order.ToList();
                return Ok(userDto);
            }
            return NotFound();

        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public ActionResult<UserReadDto> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                var user = _repository.GetUserById(userUpdateDto.UserId);

                if (user == null)
                {
                    return NotFound();
                }

                // Update the user entity with the new data
                user.FirstName = userUpdateDto.FirstName;
                user.LastName = userUpdateDto.LastName;
                //user.Email = userUpdateDto.Email;
                user.PhoneNumber = userUpdateDto.PhoneNumber;
                user.UserRole = (UserRole)userUpdateDto.UserRole;


                _repository.SaveChanges();

                return Ok(_mapper.Map<UserReadDto>(user));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{userId}")]
        public IActionResult Delete(int userId)
        {
            try
            {
                var user = _repository.GetUserById(userId);
                if (user == null)
                {
                    return NotFound();
                }
                _repository.Delete(userId);
                _repository.SaveChanges();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Delete Error");
            }
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPut("my-data")]
        public ActionResult<UserReadDto> Update(UserUpdateDto user)
        {
            try
            {
                //getting an email from a user
                var currentUser = _repository.GetUserByEmail(User?.Identity?.Name);
                var oldUser = _repository.GetUserById(currentUser.UserId);
                if (oldUser == null)
                {
                    return NotFound();
                }

                oldUser.FirstName = user.FirstName;
                oldUser.LastName = user.LastName;
                //oldUser.Email = user.Email;
                oldUser.PhoneNumber = user.PhoneNumber;
                _repository.SaveChanges();
                return Ok(_mapper.Map<UserReadDto>(oldUser));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("my-data")]
        public ActionResult<UserReadDto> GetMyData()
        {
            try
            {
                User user = _repository.GetUserByEmail(User?.Identity?.Name);
                return Ok(_mapper.Map<UserReadDto>(user));

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error loading data");
            }

        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPatch("my-data/password")]
        public ActionResult UpdatePassword([FromBody] PasswordUpdateDto passwordUpdate)
        {
            try
            {
                var oldUser = _repository.GetUserByEmail(User?.Identity?.Name);
                Console.WriteLine(oldUser.Email);
                if (!BCrypt.Net.BCrypt.Verify(passwordUpdate.OldPassword, oldUser.PasswordHash))
                    return BadRequest("Wrong password for user");
                else
                {
                    oldUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordUpdate.NewPassword);
                    _repository.SaveChanges();
                    return Ok("Password successfully changed");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("orders")]
        public ActionResult<IEnumerable<OrderReadDto>> GetMyOrders(int? orderId)
        {
            var user = _repository.GetUserByEmail(User?.Identity?.Name);
            var orders= _repository.GetOrdersForUser(user.UserId).ToList();
            var ordersDtoList = new List<OrderReadDto>();
            
            foreach (var order in orders)
            {
                var orderDto = _mapper.Map<OrderReadDto>(order);
                orderDto.Orderitems = _mapper.Map<IEnumerable<OrderItemUpdateDto>>(
                    _orderRepo.GetOrderItemsForOrder(orderDto.OrderId)).ToList();

                ordersDtoList.Add(orderDto);
            }


            return ordersDtoList;
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPost("last_order")]
        public OrderReadDto GetOrderInProgress()
        {
            var user = _repository.GetUserByEmail(User?.Identity?.Name);
            var existingOrder = _orderRepo.GetOrderInProgressForUser(user.UserId);

            if (existingOrder != null)
            {
                var inprogress=_mapper.Map<OrderReadDto>(existingOrder);
                inprogress.Orderitems = _mapper.Map<IEnumerable<OrderItemUpdateDto>>(
                    _orderRepo.GetOrderItemsForOrder(inprogress.OrderId)).ToList();
                return _mapper.Map<OrderReadDto>(inprogress);
            }
            else
            {
                // Create a new order for the user with status 'u_Procesu'
                var newOrder = new Order
                {
                    UserId = user.UserId,
                    Status = OrderStatus.U_procesu,
                };

                _orderRepo.Create(newOrder);
                _orderRepo.SaveChanges();

                // Return the newly generated order ID
                return _mapper.Map<OrderReadDto>(newOrder);
            }
        }
        [Authorize(Roles = "Admin, Customer")]
        [HttpPut("last_order/{orderId}")]
        public ActionResult<OrderReadDto> UpdateShippingInfo(int orderId, [FromBody] int shippingInfoId)
        {
            var user = _repository.GetUserByEmail(User?.Identity?.Name);
            var existingOrder = _orderRepo.GetOrderInProgressForUser(user.UserId);

            if (existingOrder != null && existingOrder.OrderId == orderId)
            {
                // Update the shipping information ID for the order
                existingOrder.ShippingId = shippingInfoId;
                _orderRepo.SaveChanges();

                // Return the updated order
                var updatedOrder = _mapper.Map<OrderReadDto>(existingOrder);
                updatedOrder.Orderitems = _mapper.Map<IEnumerable<OrderItemUpdateDto>>(
                    _orderRepo.GetOrderItemsForOrder(updatedOrder.OrderId)).ToList();
                return updatedOrder;
            }
            else
            {
                return NotFound("Order not found or does not belong to the user's existing order.");
            }
        }


        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("shipping")]
        public ActionResult<IEnumerable<ShippingInfoReadDto>> GetMyShippingInfo()
        {
            try
            {
                var user = _repository.GetUserByEmail(User?.Identity?.Name);
                var shippingInfoDto = _mapper.Map<IEnumerable<ShippingInfoReadDto>>(_repository.GetShippingInfos(user.UserId)).ToList();
                foreach(var shipping in shippingInfoDto)
                {
                    shipping.Orders = _mapper.Map<IEnumerable<OrderUpdateDto>>(_shippingRepo.GetOrdersForShippingInfo(shipping.ShippingId)).ToList();
                }
                return shippingInfoDto;
            }
            catch (Exception)
            {
               return StatusCode(StatusCodes.Status500InternalServerError, "Error fetching data");
            }
        }
        [Authorize(Roles = "Admin, Customer")]
        [HttpDelete("orderitems/{orderItemId}")]
        public IActionResult DeleteOrderItem(int orderItemId)
        {
            var user = _repository.GetUserByEmail(User?.Identity?.Name);
            var existingOrder = _orderRepo.GetOrderInProgressForUser(user.UserId);

            if (existingOrder == null)
            {
                return NotFound("No existing order found for the user.");
            }

            var existingOrderItem = _orderItemsRepo.GetOrderitemById(orderItemId);

            if (existingOrderItem == null || existingOrderItem.OrderId != existingOrder.OrderId)
            {
                return NotFound("Order item not found or does not belong to the user's existing order.");
            }

            _orderItemsRepo.Delete(existingOrderItem.OrderItemId);
            _orderItemsRepo.SaveChanges();

            return NoContent();
        }



    }
}

