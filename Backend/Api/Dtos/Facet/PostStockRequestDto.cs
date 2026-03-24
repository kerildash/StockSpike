using Api.Models;
using Facet;

namespace Api.Dtos.Facet;

[Facet(typeof(Stock), exclude: nameof(Stock.Id), GenerateToSource = true)]
public partial class PostStockRequestDto { }
