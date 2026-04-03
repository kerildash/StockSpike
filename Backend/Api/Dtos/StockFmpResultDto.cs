using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Dtos;

public class StockFmpResultDto
{
    [JsonPropertyName("symbol")]
    public required string Ticker { get; set; }

    public required string CompanyName { get; set; }

    public decimal Price { get; set; }

    public ulong MarketCap { get; set; }
}
