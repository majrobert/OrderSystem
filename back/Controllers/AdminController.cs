using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Polnet_api.Data;
using Polnet_api.Dtos;
using Polnet_api.Models;

namespace Polnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AdminController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
   
        private readonly RoleManager<Role> _roleManager;


        public AdminController(IMapper mapper,
        UserManager<AppUser> userManager, RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
            _mapper = mapper;
            _userManager = userManager;

        }
        [HttpGet]

        public async Task<IActionResult> Users()
        {
            var users = await _userManager.Users.Include(u => u.UserRoles).ToListAsync();
            return Ok(_mapper.Map<List<AppUser>, List<UserForListDto>>(users));
        }
        [HttpGet("roles", Name = "GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            return Ok(_mapper.Map<RoleDto[]>(await _roleManager.Roles.ToListAsync()));
        }

        [HttpPost("role")]
        public async Task<IActionResult> AddRole([FromBody] RoleToInsertDto roleAdd)
        {
            var varRoleEgsist = await _roleManager.FindByNameAsync(roleAdd.Name);

            if (varRoleEgsist == null)
            {
                var role = new Role();
                role.Name = roleAdd.Name;
                await _roleManager.CreateAsync(role);
                return Ok(await _roleManager.Roles.ToListAsync());
            }
            return BadRequest("role name exist");
        }
        [HttpDelete("role/{id}")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            Role roleExist = await _roleManager.FindByIdAsync(id);
            if (roleExist != null)
            {
                await _roleManager.DeleteAsync(roleExist);
                return Ok(await _roleManager.Roles.ToListAsync());
            }
            return BadRequest();
        }
        [HttpPut("role/{id}")]
        public async Task<IActionResult> UpdateRole([FromBody] RoleToInsertDto role, string id)
        {
            Role roleExist = await _roleManager.FindByIdAsync(id);
            if (roleExist != null)
            {
                roleExist.Name = role.Name;
                await _roleManager.UpdateAsync(roleExist);
                return Ok(await _roleManager.Roles.ToListAsync());
            }
            return BadRequest();
        }

        [HttpPost("userrole/{userId}/{roleId}")]
        public async Task<IActionResult> AssignRoleToUser(string userId, string roleId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            var role = await _roleManager.Roles.Where(r => r.Id == roleId).FirstOrDefaultAsync();

            if (role == null)
            {
                return NotFound();
            }
            await _userManager.AddToRoleAsync(user, role.Name);
            return Ok(await _userManager.GetRolesAsync(user));
        }
        [HttpPost("userroledel/{userId}/{roleId}")]
        public async Task<IActionResult> DeleteRoleToUser(string userId, string roleId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            var role = await _roleManager.Roles.Where(r => r.Id == roleId).FirstOrDefaultAsync();

            if (role == null)
            {
                return NotFound();
            }
            await _userManager.RemoveFromRoleAsync(user, role.Name);
            return Ok(await _userManager.GetRolesAsync(user));
        }

        [HttpGet("userrole/{userId}")]
        public async Task<IActionResult> GetuserRoles(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(await _userManager.GetRolesAsync(user));
        }
        [HttpPost("password/{userId}")]
        public async Task<IActionResult> ResetUserPassword([FromBody] UserForLoginDto password, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, resetToken, password.Password);
            if (result.Succeeded == true)
            {
                return Ok();
            }
            return BadRequest("password not change");
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded == true)
            {
                var users = await _userManager.Users.Include(u => u.UserRoles).ToListAsync();
                return Ok(_mapper.Map<List<AppUser>, List<UserForListDto>>(users));
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserForInsertDto user)
        {

            var userToAdd = new AppUser
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Email = user.Email
            };
            var resurls = await _userManager.CreateAsync(userToAdd, user.Password);
            if (resurls.Succeeded == true)
            {
                var users = await _userManager.Users.Include(u => u.UserRoles).ToListAsync();
                return Ok(_mapper.Map<List<AppUser>, List<UserForListDto>>(users));
            }
            return BadRequest("Nie dodano pozycji");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromBody] UserForUpdateDto user)
        {
            var userToUpdate = await _userManager.FindByIdAsync(user.Id);
            if (userToUpdate == null)
            {
                return BadRequest("Nie znaliziono uzytkownika");
            }
            userToUpdate.DisplayName = user.DisplayName;
            userToUpdate.UserName = user.UserName;
            userToUpdate.Email = user.Email;
    
            var resurls = await _userManager.UpdateAsync(userToUpdate);
            if (resurls.Succeeded == true)
            {
                var users = await _userManager.Users.Include(u => u.UserRoles).ToListAsync();
                return Ok(_mapper.Map<List<AppUser>, List<UserForListDto>>(users));
            }
            return BadRequest("Nie dodano pozycji");
        }
    }
}