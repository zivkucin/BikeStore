using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.Models;
using BikeStoreBackend.DTOs.CreateDto;
using Microsoft.EntityFrameworkCore;
using BikeStoreBackend.DTOs.UpdateDto;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using BikeStoreBackend.Repositories.Interface;

namespace BikeStoreBackend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
    [Produces("application/json", "application/xml")]
    public class ManufacturerController :ControllerBase
	{
		private readonly IManufacturerRepo _repository;
		private readonly IMapper _mapper;
		public ManufacturerController(IManufacturerRepo repo, IMapper mapper)
		{
			_repository = repo;
			_mapper = mapper;
		}
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<ManufacturerReadDto>> GetAll()
        {
            try
            {
                var manufacturers = _repository.GetManufacturers();
                var manufacturerDtos = _mapper.Map<IEnumerable<ManufacturerReadDto>>(manufacturers);
                foreach (var manufacturerDto in manufacturerDtos)
                {
                    manufacturerDto.Products = _mapper.Map<IEnumerable<ProductUpdateDto>>
                        (_repository.GetProductsForManufacturer(manufacturerDto.ManufacturerId)).ToList();
                }
                return Ok(manufacturerDtos);
            }
            catch (Exception)
            {
                return NotFound();
            }
            
        }
        [AllowAnonymous]
        [HttpGet("{manufacturerId}", Name = "GetManufacturerById")]
        public ActionResult<ManufacturerReadDto> GetManufacturerById(int manufacturerId)
        {
            Manufacturer manufacturer = _repository.GetManufacturerById(manufacturerId);
            if (manufacturer != null)
            {
                var manDto = _mapper.Map<ManufacturerReadDto>(manufacturer);
                manDto.Products = _mapper.Map<IEnumerable<ProductUpdateDto>>
                        (_repository.GetProductsForManufacturer(manufacturer.ManufacturerId)).ToList();
                return Ok(manDto);
            }
            return NotFound();

        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public ActionResult<ManufacturerReadDto> CreateManufacturer(ManufacturerDto manufacturer)
        {
            var manufacturerModel = _mapper.Map<Manufacturer>(manufacturer);
            try
            {
                _repository.Create(manufacturerModel);
                _repository.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the data to the database.");
            }
            var manufacturerDto = _mapper.Map<ManufacturerUpdateDto>(manufacturerModel);
            return CreatedAtRoute(nameof(GetManufacturerById), new { manufacturerId = manufacturerDto.ManufacturerId }, manufacturerDto);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public ActionResult<ManufacturerReadDto> Update(ManufacturerUpdateDto man)
        {
            try
            {
                var oldManufacturer = _repository.GetManufacturerById(man.ManufacturerId);
                if (oldManufacturer == null)
                {
                    return NotFound();
                }
                Manufacturer manufacturerEntity = _mapper.Map<Manufacturer>(man);
                _mapper.Map(manufacturerEntity, oldManufacturer);
                _repository.SaveChanges();
                return Ok(_mapper.Map<ManufacturerReadDto>(oldManufacturer));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{manufacturerId}")]
        public IActionResult Delete(int manufacturerId)
        {
            try
            {
                var man = _repository.GetManufacturerById(manufacturerId);
                if (man == null)
                {
                    return NotFound();
                }
                _repository.Delete(manufacturerId);
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

