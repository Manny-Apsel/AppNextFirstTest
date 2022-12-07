using Microsoft.Data.Sqlite;

namespace AppNextFirstTest.Database;

public class DbConnection : IDbConnection
{
    private ILogger<DbConnection> _logger;
    public DbConnection(ILogger<DbConnection> logger)
    {
        _logger = logger;
    }

    public void ExecuteQuery(string sql, object obj)
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

    public List<T> ExecuteQuery<T>(string sql) where T : new()
    {
        List<T> output = new List<T>();
        var type = typeof(T);
        // var props = getPropertiesObject<T>();
        var props = type.GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);

        using (var connection = new SqliteConnection("Data Source=Database/data.db"))
        {
            connection.Open();

            var command = connection.CreateCommand();
            command.CommandText = sql;

            SqliteDataReader dataReader = command.ExecuteReader();
            while (dataReader.Read())
            {
                var obj = new T();
                for (int i = 0; i < dataReader.FieldCount; i++)
                {
                    string fieldName = dataReader.GetName(i);
                    var prop = props.FirstOrDefault(x => x.Name.ToLower() == fieldName.ToLower());

                    if (prop != null)
                    {
                        if (dataReader[i] != DBNull.Value)
                        {
                            prop.SetValue(obj, dataReader[i], null);
                        }
                    }
                }
                output.Add(obj);
            }
            connection.Close();
        }

        return output;
    }

    /*
        tried to get properties manually trough switch, but found better method

        private Dictionary<string, string> getPropertiesObject<T>()
        {
            var output = new Dictionary<string, string>();

            var props = typeof(T).GetProperties();
            foreach (var item in props)
            {
                output.Add(item.Name, item.PropertyType.ToString());
            }

            return output;
        }

        private string readData(string type, int column, SqliteDataReader dr)
        {
            var output = string.Empty;
            switch (type){
                case "Int32":
                    output = dr.GetInt32(column); 
                    break;
                case "String":
                    output = dr.GetString(column);
                    break;
            }
            return output;
        } 
    */
}