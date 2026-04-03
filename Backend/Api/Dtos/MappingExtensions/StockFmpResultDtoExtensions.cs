using Api.Models;

namespace Api.Dtos.MappingExtensions;

public static class StockFmpResultDtoExtensions
{
    public static Stock ToStock(this StockFmpResultDto stockFmpDto)
    {
        Stock stock = new()
        {
            Ticker = stockFmpDto.Ticker,
            CompanyName = stockFmpDto.CompanyName,
            Price = stockFmpDto.Price,
            MarketCap = stockFmpDto.MarketCap
        };

        return stock;
    }
}
