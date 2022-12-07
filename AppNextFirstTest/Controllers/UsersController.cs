using AppNextFirstTest.Database;
using AppNextFirstTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppNextFirstTest.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UsersController : ControllerBase
{

    private readonly ILogger<UsersController> _logger;
    private readonly IDbConnection database;
    public UsersController(ILogger<UsersController> logger, IDbConnection db)
    {
        _logger = logger;
        database = db;
    }

    [HttpGet]
    [ActionName("")]
    public IEnumerable<User> Get()
    {
        var users = database.ExecuteQuery<User>(
            "SELECT * FROM USERS"
        );
        return users;
    }
}