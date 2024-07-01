using System;
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
    public class ProductController  : ControllerBase
	{
        private readonly IMapper _mapper;
        private readonly IProductRepo _repository;
        private readonly IWebHostEnvironment _env;
        public ProductController(IProductRepo repository, IMapper mapper, IWebHostEnvironment env)
		{
            _repository = repository;
            _mapper = mapper;
            _env = env;
		}
        [AllowAnonymous]
        [HttpGet("{page}")]
        public ActionResult<IEnumerable<ProductReadDto>> GetAll(int? categoryId, int? manufacturerId, int page, string? search )
        {
            var products = _repository.GetProducts(categoryId, manufacturerId, search);
            if (products == null || !products.Any())
                return NoContent();
            var pageResults = 9f;
            var pageCount = Math.Ceiling(products.Count() / pageResults);
            if (page > pageCount)
            {
                return BadRequest($"Invalid page number. The available pages are 1 to {pageCount}");
            }
            products =products.Skip((page - 1) * (int)pageResults).Take((int)pageResults);
            var productDtos = _mapper.Map<IEnumerable<ProductReadDto>>(products);
            
            foreach (var productDto in productDtos)
            {
                var product = _repository.GetProductById(productDto.ProductId);
                var orderDto = _mapper.Map<IEnumerable<OrderItemUpdateDto>>(product.Orderitems);
                productDto.Orderitems = orderDto.ToList();
            }
            var response = new ProductResponse
            {
                Products = productDtos,
                CurrentPage = page,
                Pages = (int)pageCount
            };
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("id/{productId}", Name = "GetProductById")]
        public ActionResult<ProductReadDto> GetProductById(int productId)
        {
            Product product = _repository.GetProductById(productId);
            if (product != null)
            {
                var order = _mapper.Map<IEnumerable<OrderItemUpdateDto>>(product.Orderitems);
                var productDto = _mapper.Map<ProductReadDto>(product);
                productDto.Orderitems = order.ToList();
                return Ok(productDto);
            }
            return NotFound();

        }

        [AllowAnonymous]
        [HttpGet("ids/{productIds}", Name = "GetProductsByIds")]
        public ActionResult<IEnumerable<ProductReadDto>> GetProductsByIds(string productIds)
        {
            var ids = productIds.Split(',').Select(int.Parse).ToList();
            var products = _repository.GetProductsByIds(ids);

            if (products.Any())
            {
                var productDtos = _mapper.Map<IEnumerable<ProductReadDto>>(products);
                return Ok(productDtos);
            }

            return NotFound();
        }
        [Authorize(Roles = "Admin")]
        [HttpPost()]
        public async Task<ActionResult<ProductReadDto>> UploadAndCreateProduct([FromForm] ProductDto product, IFormFile file)
        {
            string? filePath = null;

            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file was uploaded.");
                }

                var uploadsPath = Path.Combine(_env?.WebRootPath ?? string.Empty, "uploads");
                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                filePath = Path.Combine(uploadsPath, fileName); // Assign actual file path to filePath variable

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var productModel = _mapper.Map<Product>(product);
                productModel.Image = $"/uploads/{fileName}";

                _repository.Create(productModel);
                _repository.SaveChanges();
                var productDto = _mapper.Map<ProductUpdateDto>(productModel);
                return CreatedAtRoute(nameof(GetProductById), new { productId = productDto.ProductId }, productDto);
            }
            catch (Exception)
            {
                if (!string.IsNullOrEmpty(filePath) && System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the data to the database.");
            }
        }



        [Authorize(Roles = "Admin")]
        [HttpPut]
        public ActionResult<ProductReadDto> Update(ProductUpdateDto product)
        {
            try
            {
                var oldProduct = _repository.GetProductById(product.ProductId);
                if (oldProduct == null)
                {
                    return NotFound();
                }
                Product productEntity = _mapper.Map<Product>(product);
                _mapper.Map(productEntity, oldProduct);
                _repository.SaveChanges();
                return Ok(_mapper.Map<ProductReadDto>(oldProduct));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{productId}")]
        public IActionResult Delete(int productId)
        {
            try
            {
                var product = _repository.GetProductById(productId);
                if (product == null)
                {
                    return NotFound();
                }
                _repository.Delete(productId);       
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

