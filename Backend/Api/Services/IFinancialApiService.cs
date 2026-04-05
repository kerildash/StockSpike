using Api.Dtos;
using Api.Dtos.Facet;

namespace Api.Services;

public interface IFinancialApiService
{
    Task<StockFmpResultDto?> GetStockAsync(string ticker);
    Task<string?> SearchSymbolAsync(string query);
    Task<string?> GetCompanyProfileAsync(string ticker);
    Task<string?> GetKeyMetricsTtmAsync(string ticker);
    Task<string?> GetIncomeStatementAsync(string ticker);
    Task<string?> GetBalanceSheetStatementAsync(string ticker);
    Task<string?> GetCashFlowStatementAsync(string ticker);
}
