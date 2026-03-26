using System.ComponentModel.DataAnnotations;

namespace Api.Dtos;

public class RegisterUserDto
{
    [Required]
    [MinLength(5)]
    public string? Username { get; set; }

    [Required]
    [EmailAddress]
    public string? EmailAddress { get; set; }

    [Required]
    public string? Password { get; set; }
}
