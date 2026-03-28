using Microsoft.AspNetCore.Identity;

namespace Api.Models;

public class User : IdentityUser
{
    public List<PortfolioItem> Portfolio { get; set; } = [];
}
