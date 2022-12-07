using System.ComponentModel.DataAnnotations;
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
    [ActionName("user")]
    public IEnumerable<Models.Task> Get([Required] long UserId)
    {
        // naming convention not right with tasks, should be called tickets
        var tasks = database.ExecuteQuery<Models.Task>(
            $"SELECT * FROM Tasks WHERE UserId = {UserId}"
        );
        return tasks;
    }

    [HttpPost]
    [ActionName("Task")]
    public void Post(Models.Task task)
    {
        var latestTask = database.ExecuteQuery<Models.Task>("SELECT * FROM Tasks WHERE TaskId IN ( SELECT max( TaskId ) FROM Tasks );")[0];
        var newId = latestTask != null ? latestTask.TaskId + 1 : 1;
        var query = $"INSERT INTO Tasks VALUES({newId}, '{task.Title}', '{task.Description}', {task.UserId})";
        database.ExecuteQuery(query);
    }

    [HttpPut]
    [ActionName("Task")]
    public void Put(Models.Task task)
    {
        var query =
            $@"UPDATE Tasks 
                Set Title = '{task.Title}',
                Description = '{task.Description}',
                UserId = {task.UserId}
                WHERE TaskId = {task.TaskId};";
        database.ExecuteQuery(query);

    }

    [HttpDelete]
    [ActionName("Task")]
    public void Delete([Required] long TaskId)
    {
        var query = $"DELETE FROM Tasks WHERE TaskId = {TaskId};";
        database.ExecuteQuery(query);

    }
}