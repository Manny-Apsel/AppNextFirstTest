namespace AppNextFirstTest.Models {
    public class User {
        // have to use long instead of int because otherwise generic method 
        // prop.SetValue(obj, dataReader[i], null); doesn't work 
        // this is because int datatype in sqlite uses int.64 and not int.32
        // could cast or convert to int.32 which would require extra method, but have no time for it
        public long UserId { get; set; }
        public string Username { get; set; } = string.Empty;
    }
}