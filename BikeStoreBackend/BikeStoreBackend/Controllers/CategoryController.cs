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
    public class CategoryController : ControllerBase
	{
        private readonly ICategoryRepo _repository;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryRepo repository, IMapper mapper)
		{
            _repository = repository;
            _mapper = mapper;
		}
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryReadDto>>> GetAll()
        {
            var categories = await _repository.GetAll();
            var catDtos = _mapper.Map<IEnumerable<CategoryReadDto>>(categories);
            
            foreach (var catDto in catDtos)
            {
                catDto.Products = _mapper.Map<IEnumerable<ProductUpdateDto>>(await _repository.GetProductsForCategory(catDto.CategoryId)).ToList();
            }
            return Ok(catDtos);
        }
        [AllowAnonymous]
        [HttpGet("{categoryId}", Name = "GetCategoryById")]
        public async Task<ActionResult<CategoryReadDto>> GetCategoryById(int categoryId)
        {
            Category cat = await _repository.GetOne(categoryId);
            if (cat != null)
            {
                var catDto = _mapper.Map<CategoryReadDto>(cat);
                catDto.Products = _mapper.Map<IEnumerable<ProductUpdateDto>>(await _repository.GetProductsForCategory(catDto.CategoryId)).ToList();
                return Ok(catDto);
            }
            return NotFound();

        }
        [Authorize(Roles ="Admin")]
        [HttpPost]
        public ActionResult<CategoryReadDto> CreateCategory(CategoryDto cat)
        {
            var catModel = _mapper.Map<Category>(cat);
            try
            {
                _repository.Create(catModel);
                _repository.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the data to the database.");
            }
            var catDto = _mapper.Map<CategoryUpdateDto>(catModel);
            return CreatedAtRoute(nameof(GetCategoryById), new { categoryId = catDto.CategoryId }, catDto);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut()]
        public ActionResult<CategoryReadDto> Update( CategoryUpdateDto cat)
        {
            try
            {
                var oldCategory = _repository.GetOne(cat.CategoryId);
                if (oldCategory == null)
                {
                    return NotFound();
                }
                Category catEntity = _mapper.Map<Category>(cat);
                _mapper.Map(catEntity, oldCategory);
                _repository.SaveChanges();
                return Ok(_mapper.Map<CategoryReadDto>(oldCategory));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> Delete(int categoryId)
        {
            try
            {
                var cat = await _repository.GetOne(categoryId);
                if (cat == null)
                {
                    return NotFound();
                }
                await _repository.Delete(cat);
                await _repository.SaveChanges();
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Delete Error");
            }
        }
    }
}

