using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Dtos;
using Api.Models;
using Api.Services;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountsController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAccountASync([FromBody] RegisterUserDto registerUserDto)
    {
        try
        {
            User user = new()
            {
                UserName = registerUserDto.Username,
                Email = registerUserDto.EmailAddress
            };

            var createUserResult = await userManager.CreateAsync(user, registerUserDto.Password!);

            if (createUserResult.Succeeded)
            {
                var roleResult = await userManager.AddToRoleAsync(user, "User");
                if (roleResult.Succeeded)
                {
                    string token = tokenService.CreateToken(user);
                    UserResponseDto userCreatedDto = new(user.UserName!, user.Email!, token);
                    return Ok(userCreatedDto);
                }
                else
                {
                    return StatusCode(500, roleResult.Errors);
                }
            }
            else
            {
                return StatusCode(500, createUserResult.Errors);
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginDto loginDto)
    {
        User? user = await userManager.Users.FirstOrDefaultAsync(user => user.UserName == loginDto.Username);
        if (user is null)
        {
            return Ok($"User {loginDto.Username} not found.");
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password!, false);
        if (!result.Succeeded)
        {
            return Ok($"Wrong password for {loginDto.Username}.");
        }

        string token = tokenService.CreateToken(user);
        UserResponseDto loggedUserResponseDto = new(user.UserName!, user.Email!, token);
        return Ok(loggedUserResponseDto);
    }
}
