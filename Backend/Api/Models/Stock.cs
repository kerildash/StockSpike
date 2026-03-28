using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models;

public class Stock
{
    public Guid Id { get; set; }

    // Consider to use Ticker as primary key and get rid of Id. In any case, Ticket could be unique.
    public required string Ticker { get; set; }

    public required string CompanyName { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    public ulong MarketCap { get; set; }

    public List<PortfolioItem> StockUsers { get; set; } = [];
}
