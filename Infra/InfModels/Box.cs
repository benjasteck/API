namespace Infra.InfModels;

public class Box
{
    public int id { get; set; }
    public int typeid { get; set; }
    public string material { get; set; }
    public long price { get; set; } 
    //to get accurate prices, float wont do. therefor ill save it as long and then add in a . later, essentially saving it as cents
}