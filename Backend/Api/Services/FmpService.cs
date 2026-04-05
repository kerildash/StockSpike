using Api.Dtos;
using Api.Dtos.Facet;
using System.Text.Json;

namespace Api.Services;

public class FmpService(HttpClient httpClient, IConfiguration config) : IFinancialApiService
{
    private const string BaseUrl = "https://financialmodelingprep.com/stable";

    private async Task<string?> FetchRawAsync(string endpoint, string paramName, string paramValue)
    {
        try
        {
            var response = await httpClient.GetAsync(
                $"{BaseUrl}/{endpoint}?{paramName}={Uri.EscapeDataString(paramValue)}&apikey={config["FmpKey"]}");

            if (!response.IsSuccessStatusCode)
                return null;

            return await response.Content.ReadAsStringAsync();
        }
        catch
        {
            return null;
        }
    }

    public async Task<StockFmpResultDto?> GetStockAsync(string ticker)
    {
        string? content = await FetchRawAsync("profile", "symbol", ticker);
        if (content is null) return null;

        var results = JsonSerializer.Deserialize<List<StockFmpResultDto>>(
            content, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }) ?? [];
        return results.FirstOrDefault();
    }

    public Task<string?> SearchSymbolAsync(string query)
        => FetchRawAsync("search-symbol", "query", query);

    public Task<string?> GetCompanyProfileAsync(string ticker)
        => FetchRawAsync("profile", "symbol", ticker);

    public Task<string?> GetKeyMetricsTtmAsync(string ticker)
        => FetchRawAsync("key-metrics-ttm", "symbol", ticker);

    public Task<string?> GetIncomeStatementAsync(string ticker)
        => FetchRawAsync("income-statement", "symbol", ticker);

    public Task<string?> GetBalanceSheetStatementAsync(string ticker)
        => FetchRawAsync("balance-sheet-statement", "symbol", ticker);

    public Task<string?> GetCashFlowStatementAsync(string ticker)
        => FetchRawAsync("cash-flow-statement", "symbol", ticker);
}
