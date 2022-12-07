using Microsoft.Data.Sqlite;

namespace AppNextFirstTest.Database;

public class DbConnection : IDbConnection
{
    private ILogger<DbConnection> _logger;
    public DbConnection(ILogger<DbConnection> logger)
    {
        _logger = logger;
    }

    public void ConnectDb(string sql)
    {
        using (var connection = new SqliteConnection("Data Source=Database/data.db"))
        {
            connection.Open();

            var command = connection.CreateCommand();
            command.CommandText = sql;

            // do a foreach where all values match sql command
            // or add values on some other way 
            
            // command.Parameters.AddWithValue("$id", id);

            /* if select use code underneth
            
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    var name = reader.GetString(0);

                    Console.WriteLine($"Hello, {name}!");
                }
            } */

            /* if to execute a query where you add edit or delete 
            command.ExecuteNonQuery();
            */                  
            // see more examples https://github.com/dotnet/docs/blob/main/samples/snippets/standard/data/sqlite/HelloWorldSample/Program.cs
        }
    }
}