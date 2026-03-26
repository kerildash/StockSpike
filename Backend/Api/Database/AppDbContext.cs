using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Api.Models;
using Microsoft.AspNetCore.Identity;

namespace Api.Database;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Stock> Stocks { get; set; }

}
