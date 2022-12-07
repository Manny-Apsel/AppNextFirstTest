using Microsoft.Data.Sqlite;

namespace AppNextFirstTest.Database;

public interface IDbConnection {
    void ConnectDb(string command);
}