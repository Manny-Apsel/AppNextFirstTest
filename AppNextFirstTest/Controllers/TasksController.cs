using AppNextFirstTest.Database;
using AppNextFirstTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppNextFirstTest.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class TasksController : ControllerBase
{

    private readonly ILogger<TasksController> _logger;
    private readonly IDbConnection database;
    public TasksController(ILogger<TasksController> logger, IDbConnection db)
    {
        _logger = logger;
        database = db;
    }

    [HttpGet]
    [ActionName("")]
    public IEnumerable<Task> Get()
    {
        
    }

    [HttpPost]
    [ActionName("Task")]
    public void Post(Task task){
        
    }

    [HttpPut]
    [ActionName("Task")]
    public void Put(Task task){
        
    }

    [HttpDelete]
    [ActionName("Task")]
    public void Delete(Task task){
    }
}