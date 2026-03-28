using Api.Models;
using Facet;

namespace Api.Dtos.Facet;

[Facet(typeof(Stock), exclude: nameof(Stock.StockUsers))]
public partial class StockResponseDto { }
