namespace advanced_programming_2_backend.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
