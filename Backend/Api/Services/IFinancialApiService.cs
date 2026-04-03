using Api.Dtos;
using Api.Dtos.Facet;

namespace Api.Services;

public interface IFinancialApiService
{
    public Task<StockFmpResultDto?> GetStockAsync(string ticker);
}
