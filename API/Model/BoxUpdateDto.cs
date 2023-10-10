using System.ComponentModel.DataAnnotations;

namespace API.Model;

public class BoxUpdateDto
{
    
    public long typeid { get; set; }
    
    [MinLength(3)]
    public string material { get; set; }

    
    public long price { get; set; }
}