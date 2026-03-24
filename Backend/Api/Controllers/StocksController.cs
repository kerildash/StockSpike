using Api.Database;
using Api.Dtos.Facet;
using Api.Models;
using Api.Queries;
using Facet.Extensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq.Expressions;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StocksController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<Results<Ok<StockResponseDto>, NotFound>> GetStockByIdAsync([FromRoute] Guid id)
    {
        Stock? stockFound = await dbContext.Stocks.FindAsync(id);
        if (stockFound is null)
        {
            return TypedResults.NotFound();
        }

        StockResponseDto stockDto = stockFound.ToFacet<Stock, StockResponseDto>();
        return TypedResults.Ok(stockDto);
    }

    [HttpGet]
    public async Task<Results<Ok<List<StockResponseDto>>, BadRequest<ModelStateDictionary>>> GetAllStocksAsync([FromQuery] StockQueryObject query)
    {
        if (!ModelState.IsValid)
        {
            return TypedResults.BadRequest(ModelState);
        }

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
        return TypedResults.Ok(stocksResult);
    }

    [HttpPost]
    public async Task<Results<Ok<StockResponseDto>, BadRequest<ModelStateDictionary>, BadRequest>> TryPostStockAsync([FromBody] PostStockRequestDto stockDto)
    {
        if (!ModelState.IsValid)
        {
            return TypedResults.BadRequest(ModelState);
        }

        try
        {
            Stock stock = stockDto.ToSource<PostStockRequestDto, Stock>();
            stock.Ticker = stock.Ticker.ToUpper();
            await dbContext.Stocks.AddAsync(stock);
            await dbContext.SaveChangesAsync();

            var resultDto = stock.ToFacet<Stock, StockResponseDto>();
            return TypedResults.Ok(resultDto);
        }
        catch
        {
            return TypedResults.BadRequest();
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<Results<Ok<StockResponseDto>, BadRequest<ModelStateDictionary>, NotFound>> UpdateStockAsync([FromRoute] Guid id, [FromBody] PostStockRequestDto stockDto)
    {
        if (!ModelState.IsValid)
        {
            return TypedResults.BadRequest(ModelState);
        }

        Stock? stockInDb = await dbContext.Stocks.FindAsync(id);
        if (stockInDb is null)
        {
            return TypedResults.NotFound();
        }

        stockInDb.MarketCap = stockDto.MarketCap;
        stockInDb.Price = stockDto.Price;
        stockInDb.CompanyName = stockDto.CompanyName;
        stockInDb.Ticker = stockDto.Ticker.ToUpper();

        await dbContext.SaveChangesAsync();

        var resultDto = stockInDb.ToFacet<Stock, StockResponseDto>();
        return TypedResults.Ok(resultDto);
    }

    [HttpDelete("{id:guid}")]
    public async Task<Results<NoContent, NotFound>> DeleteStockAsync([FromRoute] Guid id)
    {
        Stock? stockInDb = await dbContext.Stocks.FindAsync(id);
        if (stockInDb is null)
        {
            return TypedResults.NotFound();
        }

        dbContext.Remove(stockInDb);
        await dbContext.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
