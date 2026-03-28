using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Api.Models;
using Microsoft.AspNetCore.Identity;

namespace Api.Database;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Stock> Stocks { get; set; }

    public DbSet<PortfolioItem> UsersStocks { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<PortfolioItem>(item => item.HasKey(item => new { item.UserId, item.StockId }));

        builder.Entity<PortfolioItem>()
               .HasOne(item => item.User)
               .WithMany(user => user.Portfolio)
               .HasForeignKey(item => item.UserId);

        builder.Entity<PortfolioItem>()
               .HasOne(item => item.Stock)
               .WithMany(stock => stock.StockUsers)
               .HasForeignKey(item => item.StockId);
    }

}
