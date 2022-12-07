namespace AppNextFirstTest.Database;

public interface IDbConnection {
    void ExecuteQuery(string sql);
    public List<T> ExecuteQuery<T>(string sql) where T : new();
}