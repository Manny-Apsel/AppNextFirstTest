namespace AppNextFirstTest.Models {
    public class Task {
        public long TaskId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public long UserId { get; set; }
    }
}