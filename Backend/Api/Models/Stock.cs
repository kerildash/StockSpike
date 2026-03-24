using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models;

public class Stock
{
    public Guid Id { get; set; }

    public required string Ticker { get; set; }

    public required string CompanyName { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    public ulong MarketCap { get; set; }
}
