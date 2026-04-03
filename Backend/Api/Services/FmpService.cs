using Api.Dtos;
using Api.Dtos.Facet;
using System.Text.Json;

namespace Api.Services;

public class FmpService(HttpClient httpClient, IConfiguration config) : IFinancialApiService
{
    public async Task<StockFmpResultDto?> GetStockAsync(string ticker)
    {
        try
        {
            HttpResponseMessage response = await httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={ticker}&apikey={config["FmpKey"]}");
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            string content = await response.Content.ReadAsStringAsync();
            var stockDto = JsonSerializer.Deserialize<List<StockFmpResultDto>>(content, options: new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }) ?? [];
            return stockDto.FirstOrDefault();
        }
        catch
        {
            return null;
        }
    }
}
