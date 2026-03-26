using Facet.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using Api.Database;
using Api.Dtos.Facet;
using Api.Models;
using Api.Queries;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StocksController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetStockByIdAsync([FromRoute] Guid id)
    {
        Stock? stockFound = await dbContext.Stocks.FindAsync(id);
        if (stockFound is null)
        {
            return NotFound();
        }

        StockResponseDto stockDto = stockFound.ToFacet<Stock, StockResponseDto>();
        return Ok(stockDto);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAllStocksAsync([FromQuery] StockQueryObject query)
    {
        var stocks = dbContext.Stocks.AsQueryable();
        if (!string.IsNullOrWhiteSpace(query.Ticker))
        {
            // Tickers in DB are all stored in uppercase.
            stocks = stocks.Where(stock => stock.Ticker.Contains(query.Ticker.ToUpper()));
        }

        if (!string.IsNullOrWhiteSpace(query.CompanyName))
        {
            stocks = stocks.Where(stock => stock.CompanyName.ToLower().Contains(query.CompanyName.ToLower()));
        }

        if (!string.IsNullOrWhiteSpace(query.SortBy))
        {
            var sortExpressions = new Dictionary<string, dynamic>(StringComparer.OrdinalIgnoreCase)
            {
                [nameof(Stock.Ticker)] = (Expression<Func<Stock, string>>) (s => s.Ticker),
                [nameof(Stock.CompanyName)] = (Expression<Func<Stock, string>>) (s => s.CompanyName),
                [nameof(Stock.MarketCap)] = (Expression<Func<Stock, decimal>>) (s => s.MarketCap),
                [nameof(Stock.Price)] = (Expression<Func<Stock, decimal>>) (s => s.Price)
            };

            if (sortExpressions.TryGetValue(query.SortBy, out var expr))
            {
                stocks = query.IsAscending
                    ? Queryable.OrderBy(stocks, expr)
                    : Queryable.OrderByDescending(stocks, expr);
            }
        }

        var skip = (query.PageNumber - 1) * query.PageSize;

        var stocksResult = stocks.Skip(skip).Take(query.PageSize).Select(StockResponseDto.Projection).ToList();
        return Ok(stocksResult);
    }

    [HttpPost]
    public async Task<IActionResult> TryPostStockAsync([FromBody] PostStockRequestDto stockDto)
    {
        try
        {
            Stock stock = stockDto.ToSource<PostStockRequestDto, Stock>();
            stock.Ticker = stock.Ticker.ToUpper();
            await dbContext.Stocks.AddAsync(stock);
            await dbContext.SaveChangesAsync();

            var resultDto = stock.ToFacet<Stock, StockResponseDto>();
            return Ok(resultDto);
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateStockAsync([FromRoute] Guid id, [FromBody] PostStockRequestDto stockDto)
    {
        Stock? stockInDb = await dbContext.Stocks.FindAsync(id);
        if (stockInDb is null)
        {
            return NotFound();
        }

        stockInDb.MarketCap = stockDto.MarketCap;
        stockInDb.Price = stockDto.Price;
        stockInDb.CompanyName = stockDto.CompanyName;
        stockInDb.Ticker = stockDto.Ticker.ToUpper();

        await dbContext.SaveChangesAsync();

        var resultDto = stockInDb.ToFacet<Stock, StockResponseDto>();
        return Ok(resultDto);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteStockAsync([FromRoute] Guid id)
    {
        Stock? stockInDb = await dbContext.Stocks.FindAsync(id);
        if (stockInDb is null)
        {
            return NotFound();
        }

        dbContext.Remove(stockInDb);
        await dbContext.SaveChangesAsync();

        return NoContent();
    }
}
