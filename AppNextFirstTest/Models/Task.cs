namespace AppNextFirstTest.Models {
    public class Tasks {
        public int TaskId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}