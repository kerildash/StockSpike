using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Database;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Stock> Stocks { get; set; }
}
