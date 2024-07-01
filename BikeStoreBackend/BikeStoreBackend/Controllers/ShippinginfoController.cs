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
    public class ShippinginfoController: ControllerBase
	{
        private readonly IMapper _mapper;
        private readonly IShippingInfoRepo _repository;
        public ShippinginfoController(IShippingInfoRepo repository, IMapper mapper)
		{
            _repository = repository;
            _mapper = mapper;
		}

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult<IEnumerable<ShippingInfoReadDto>> GetAll()
        {
            var shippings = _repository.GetShippinginfos();
            if (shippings == null || !shippings.Any())
                return NoContent();
            var shippingDtos = _mapper.Map<IEnumerable<ShippingInfoReadDto>>(shippings);
            foreach (var shippingDto in shippingDtos)
            {
                var shipping = _repository.GetShippinginfoById(shippingDto.ShippingId);
                var orderDto = _mapper.Map<IEnumerable<OrderUpdateDto>>(shipping.Orders);
                shippingDto.Orders = orderDto.ToList();
            }
            return Ok(shippingDtos);
        }

        [Authorize(Roles ="Admin, Customer")]
        [HttpGet("{shippingInfoId}", Name = "GetShippingInfoById")]
        public ActionResult<ShippingInfoReadDto> GetShippingInfoById(int shippingInfoId)
        {
            Shippinginfo shipping = _repository.GetShippinginfoById(shippingInfoId);
            if (shipping != null)
            {
                var order = _mapper.Map<IEnumerable<OrderUpdateDto>>(shipping.Orders);
                var shippingDto = _mapper.Map<ShippingInfoReadDto>(shipping);
                shippingDto.Orders = order.ToList();
                return Ok(shippingDto);
            }
            
            return NotFound();

        }
        
        [Authorize(Roles ="Admin, Customer")]
        [HttpPost]
        public ActionResult<ShippingInfoReadDto> CreateShipping(ShippingInfoDto shippingInfo)
        {
            var shippingModel = _mapper.Map<Shippinginfo>(shippingInfo);
            try
            {
                _repository.Create(shippingModel);
                _repository.SaveChanges();
                var shippingDto = _mapper.Map<ShippingInfoUpdateDto>(shippingModel);
                return CreatedAtRoute(nameof(GetShippingInfoById), new { shippingInfoId = shippingDto.ShippingId }, shippingDto);
            }
            catch (DbUpdateException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the data to the database.");
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public ActionResult<ShippingInfoReadDto> Update(ShippingInfoUpdateDto shipping)
        {
            try
            {
                var oldShipping = _repository.GetShippinginfoById(shipping.ShippingId);
                if (oldShipping == null)
                {
                    return NotFound();
                }
                Shippinginfo shippingEntity = _mapper.Map<Shippinginfo>(shipping);
                _mapper.Map(shippingEntity, oldShipping);
                _repository.SaveChanges();
                return Ok(_mapper.Map<ShippingInfoReadDto>(oldShipping));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }

        [Authorize(Roles ="Admin, Customer")]
        [HttpDelete("{shippingInfoId}")]
        public IActionResult Delete(int shippingInfoId)
        {
            try
            {
                var shipping = _repository.GetShippinginfoById(shippingInfoId);
                if (shipping == null)
                {
                    return NotFound();
                }
                _repository.Delete(shippingInfoId);
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

