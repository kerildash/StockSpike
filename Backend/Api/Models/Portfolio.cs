using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class PortfolioItem
{
    [Required]
    public string? UserId { get; set; }
    [Required]
    public Guid StockId { get; set; }
    [Required]
    public User? User { get; set; }
    [Required]
    public Stock? Stock { get; set; }
}
