using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
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
using Microsoft.IdentityModel.Tokens;

namespace BikeStoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepo _repository;
        private readonly IConfiguration _configuration;
        public AuthController(IMapper mapper, IUserRepo repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
            _mapper = mapper;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public ActionResult<UserReadDto> Register(UserDto user)
        {
            //check if there is already a user with that email in the database
            if (_repository.GetUserByEmail(user.Email) != null)
                return BadRequest("User already registered!");
            var userModel = _mapper.Map<User>(user);
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
            userModel.PasswordHash = passwordHash;
            try
            {
                _repository.Create(userModel);
                _repository.SaveChanges();
                return Ok();
            }
            catch (DbUpdateException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the data to the database.");
            }
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<UserReadDto> Login(UserLoginDto request)
        {
            var user = _repository.GetUserByEmail(request.Email);
            if (user == null || user.Email != request.Email)
                return BadRequest("User not found.");
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return BadRequest("Wrong password");
            var token = CreateToken(user);
            return Ok(token);
            
        }

        private string CreateToken(User user)
        { 
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(UserRole), user.UserRole))
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));
            var cred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);
            var token =new  JwtSecurityToken(
                    claims:claims,
                    expires:DateTime.Now.AddDays(1),
                    signingCredentials:cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

    }
}

