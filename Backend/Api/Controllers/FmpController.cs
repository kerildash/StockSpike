using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FmpController(IFinancialApiService financialService) : ControllerBase
{
    [HttpGet("search")]
    public async Task<IActionResult> SearchSymbol([FromQuery] string query)
    {
        var json = await financialService.SearchSymbolAsync(query);
        if (json is null)
        {
            return StatusCode(502, "Failed to fetch data from financial API.");
        }

        return Content(json, "application/json");
    }

    [HttpGet("profile/{ticker}")]
    public async Task<IActionResult> GetCompanyProfile([FromRoute] string ticker)
    {
        var json = await financialService.GetCompanyProfileAsync(ticker);
        if (json is null)
        {
            return StatusCode(502, "Failed to fetch data from financial API.");
        }

        return Content(json, "application/json");
    }

    [HttpGet("key-metrics-ttm/{ticker}")]
    public async Task<IActionResult> GetKeyMetricsTtm([FromRoute] string ticker)
    {
        var json = await financialService.GetKeyMetricsTtmAsync(ticker);
        if (json is null)
        {
            return StatusCode(502, "Failed to fetch data from financial API.");
        }

        return Content(json, "application/json");
    }

    [HttpGet("income-statement/{ticker}")]
    public async Task<IActionResult> GetIncomeStatement([FromRoute] string ticker)
    {
        var json = await financialService.GetIncomeStatementAsync(ticker);
        if (json is null)
        {
            return StatusCode(502, "Failed to fetch data from financial API.");
        }

        return Content(json, "application/json");
    }

    [HttpGet("balance-sheet/{ticker}")]
    public async Task<IActionResult> GetBalanceSheet([FromRoute] string ticker)
    {
        var json = await financialService.GetBalanceSheetStatementAsync(ticker);
        if (json is null)
        {
            return StatusCode(502, "Failed to fetch data from financial API.");
        }

        return Content(json, "application/json");
    }

    [HttpGet("cash-flow-statement/{ticker}")]
    public async Task<IActionResult> GetCashFlowStatement([FromRoute] string ticker)
    {
        var json = await financialService.GetCashFlowStatementAsync(ticker);
        if (json is null)
        {
            return StatusCode(502, "Failed to fetch data from financial API.");
        }
        
        return Content(json, "application/json");
    }
}
