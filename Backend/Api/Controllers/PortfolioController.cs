using Api.Database;
using Api.Dtos.Facet;
using Api.Dtos.MappingExtensions;
using Api.Models;
using Api.Services;
using Facet.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PortfolioController(AppDbContext context, UserManager<User> userManager, IFinancialApiService financeService) : ControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserPortfolioAsync()
    {
        string? username = User.FindFirstValue(ClaimTypes.GivenName);
        if(username is null)
        {
            return StatusCode(500, $"User has no given name claim.");
        }

        User? user = await userManager.FindByNameAsync(username);
        if (user is null)
        {
            return StatusCode(500, $"Can't find user with username {username}.");
        }

        List<StockResponseDto> userStocks = await context.UsersStocks
                                                         .Where(item => item.UserId == user.Id)
                                                         .Select(x => x.Stock!)
                                                         .Select(StockResponseDto.Projection)
                                                         .ToListAsync() ?? [];
        return Ok(userStocks);
    }

    [HttpPost("{ticker}")]
    [Authorize]
    public async Task<IActionResult> AddPortfolioItemAsync([FromRoute] string ticker)
    {
        string? username = User.FindFirstValue(ClaimTypes.GivenName);
        if (username is null)
        {
            return StatusCode(500, $"No nickname claim for user {User}.");
        }

        User? user = await userManager.FindByNameAsync(username);
        if (user is null)
        {
            return StatusCode(500, $"Can't find user with username {username}.");
        }

        Stock? stockFound = await context.Stocks.FirstOrDefaultAsync(stock => stock.Ticker == ticker.ToUpper());
        if (stockFound is null)
        {
            var stockDto = await financeService.GetStockAsync(ticker);
            if (stockDto is null)
            {
                return NotFound($"Stock {ticker.ToUpper()} not found.");
            }

            try
            {
                stockFound = stockDto.ToStock();
                stockFound.Ticker = stockFound.Ticker.ToUpper();
                await context.Stocks.AddAsync(stockFound);
            }
            catch
            {
                return StatusCode(500, $"Failed to add {ticker.ToUpper()} to portfolio.");
            }
        }

        PortfolioItem portfolioItem = new()
        {
            StockId = stockFound.Id,
            UserId = user.Id
        };

        bool isItemAlreadyExists = await context.UsersStocks.ContainsAsync(portfolioItem);
        if (isItemAlreadyExists)
        {
            return BadRequest($"Cannot add {ticker.ToUpper()}: already in portfolio.");
        }

        await context.UsersStocks.AddAsync(portfolioItem);
        await context.SaveChangesAsync();

        if (portfolioItem is null)
        {
            return StatusCode(500, $"Stock {ticker.ToUpper()} was not added to portfolio of user {username}.");
        }

        return Ok();
    }

    [HttpDelete("{ticker}")]
    [Authorize]
    public async Task<IActionResult> DeletePortfolioItem([FromRoute] string ticker)
    {
        string? username = User.FindFirstValue(ClaimTypes.GivenName);
        if (username is null)
        {
            return StatusCode(500, $"No nickname claim for user {User}.");
        }

        User? user = await userManager.FindByNameAsync(username);
        if (user is null)
        {
            return StatusCode(500, $"Can't find user with username {username}.");
        }

        Stock? stockFound = await context.Stocks.FirstOrDefaultAsync(stock => stock.Ticker == ticker.ToUpper());
        if (stockFound is null)
        {
            return NotFound($"Stock {ticker.ToUpper()} not found.");
        }

        PortfolioItem? itemFound = 
            await context.UsersStocks
                         .FirstOrDefaultAsync(item => item.StockId.Equals(stockFound.Id) &&
                                                      item.UserId!.Equals(user.Id));

        if (itemFound is default(PortfolioItem))
        {
            return NotFound($"{ticker.ToUpper()}: no such a stock in the user {username} portfolio.");
        }

        context.Stocks.Remove(stockFound);
        await context.SaveChangesAsync();
        return Ok();
    }
}
