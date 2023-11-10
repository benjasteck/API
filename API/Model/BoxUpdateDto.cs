using System.ComponentModel.DataAnnotations;
using API.CostumDataAnnotations;


namespace API.Model;

public class BoxUpdateDto
{
    [Required]
    [Range(1, 9, ErrorMessage = "we only got box type ids between 1-9")]
    public long typeid { get; set; }
    
    [Required]
    [ValueIsOneOf(new string[] {"cardboard", "metal", "plastic", "wood"}, "can only be cardboard, metal, plastic or wood")]
    public string material { get; set; }

    [Required]
    [Range(1000, 10000, ErrorMessage = "price has to be between 1000 and 10000(gucci boxes)")]
    public long price { get; set; }
}