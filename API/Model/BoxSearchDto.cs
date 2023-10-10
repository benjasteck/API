using System.ComponentModel.DataAnnotations;

namespace API.Model;

public class BoxSearchDto
{
    [MinLength(1)]
    public string? SearchTerm { get; set; }
}