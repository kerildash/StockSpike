using System.ComponentModel.DataAnnotations;

namespace Api.Queries;

public class StockQueryObject
{
    public string Ticker { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string SortBy { get; set; } = string.Empty;
    public bool IsAscending { get; set; } = true;

    [Range(1, int.MaxValue)]
    public int PageNumber { get; set; } = 1;

    [Range(1, int.MaxValue)]
    public int PageSize{ get; set; } = 10;
}
