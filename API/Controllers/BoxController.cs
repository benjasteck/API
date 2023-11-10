using API.Filter;

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
    [Route("/api/boxes")]
    public IEnumerable<Box> getBoxFeed()
    {
        return _boxService.getBoxFeed();
    }
    
    [HttpGet]
    [Route("/api/boxes/{id}")]
    public Box getFullBox(int id)
    {
        return _boxService.getFullBox(id);
    }
    
    [HttpPut]
    [Route("/api/boxes/{id}")]
    public Box updateBox([FromRoute] int id, [FromBody] BoxUpdateDto dto)
    {
        return _boxService.updateBox(id, dto.typeid, dto.material, dto.price);
    }
    
    [HttpPost]
    [ValidateModel]
    [Route("/api/boxes")]
    public ResponseDto Post([FromBody] BoxCreateDto dto)
    {
        HttpContext.Response.StatusCode = StatusCodes.Status201Created;
        return new ResponseDto()
        {
            MessageToClient = "Successfully created a box",
            ResponseData = _boxService.CreateBox(dto.typeid, dto.material, dto.price)
        };
    }
    
    [HttpDelete]
    [Route("/api/boxes/{id}")]
    public void DeleteBox([FromRoute] int id)
    {
        _boxService.DeleteBox(id);
    }
    
    [HttpGet]
    [Route("/api/boxes")]
    public IEnumerable<Box> Search([FromQuery] BoxSearchDto searchBoxesDto)
    {
        return _boxService.SearchBox(searchBoxesDto.SearchTerm);
    }
}