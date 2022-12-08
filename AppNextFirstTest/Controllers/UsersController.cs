using System.ComponentModel.DataAnnotations;
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
            "SELECT * FROM USERS;"
        );
        return users;
    }

    [HttpPost]
    [ActionName("User")]
    public void Post(User user){
        // can't use auto increment in sqlite for pk in table 
        var latestUser = database.ExecuteQuery<User>("SELECT * FROM Users WHERE UserId IN ( SELECT max( UserId ) FROM Users );")[0];
        var newId = latestUser != null ? latestUser.UserId + 1 : 1;
        var query = $"INSERT INTO Users VALUES({newId}, '{user.Username}')";
        database.ExecuteQuery(query);
    }

    [HttpPut]
    [ActionName("User")]
    public void Put(User user){
        // var query = $"INSERT OR REPLACE INTO Users (UserId, Username) VALUES ({user.UserId}, '{user.Username}')";
        var query = $"UPDATE Users Set Username = '{user.Username}' WHERE UserId = {user.UserId};";
        database.ExecuteQuery(query);
    }

    // could be improved by only using id
    [HttpDelete]
    [ActionName("User")]
    public void Delete([Required] long userId){
        var query = $"DELETE FROM Users WHERE UserId = {userId};";
        database.ExecuteQuery(query);
    }
}