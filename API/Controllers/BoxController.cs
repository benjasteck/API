using API.Model;
using Infra.InfModels;

using Microsoft.AspNetCore.Mvc;
using Service;

namespace API.Controllers;

public class BoxController : ControllerBase
{
    private readonly ILogger<BoxController> _logger;
    private readonly BoxService _boxService;

    public BoxController(ILogger<BoxController> logger,
        BoxService boxService)
    {
        _logger = logger;
        _boxService = boxService;
    }
    
    
    
    [HttpGet]
    [Route("/boxes")]
    public IEnumerable<Box> getBoxFeed()
    {
        return _boxService.getBoxFeed();
    }
    
    [HttpGet]
    [Route("/boxes/{id}")]
    public Box getFullBox(int id)
    {
        return _boxService.getFullBox(id);
    }
    
    [HttpPut]
    [Route("/boxes/{id}")]
    public Box updateBox([FromRoute] int id, [FromBody] BoxUpdateDto dto)
    {
        return _boxService.updateBox(id, dto.typeid, dto.material, dto.price);
    }
    
    [HttpPost]
    [Route("/boxes")]
    public Box PostBox([FromBody] BoxCreateDto dto)
    {
        return _boxService.CreateBox(dto.typeid, dto.material, dto.price); 
    }
    
    [HttpDelete]
    [Route("/boxes/{id}")]
    public void DeleteBox([FromRoute] int id)
    {
        _boxService.DeleteBox(id);
    }
    
    [HttpGet]
    [Route("/searchBoxes")]
    public IEnumerable<Box> searchBox([FromQuery] Search parameters)
    {
        return _boxService.searchBox(parameters);
    }
}