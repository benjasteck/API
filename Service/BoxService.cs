using Infra.InfModels;
using Infra.Rep;
namespace Service;

public class BoxService
{
    private readonly BoxRep _boxRep;

    public BoxService(BoxRep boxRep)
    {
        _boxRep = boxRep;
    }
    public IEnumerable<Box> getBoxFeed()
    {
        return _boxRep.getBoxFeed();
    }
    
    public Box getFullBox(int id)
    {
        return _boxRep.getFullBox(id);
    }
    
    public Box CreateBox(long typeid, string material, long price)
    {
        return _boxRep.CreateBox(typeid, material, price);
    }
    
    public Box updateBox(int id, long typeid, string material, long price)
    {
        return _boxRep.UpdateBox(id, typeid, material, price);
    }
    
    public void DeleteBox(int id)
    {
        _boxRep.DeleteBox(id);
    }
    
    public IEnumerable<Box> searchBox(Search parameters)
    {
        return _boxRep.searchBox(parameters);
    }
}