namespace advanced_programmins_2_assignment_2_asp.Models
{
    public class Comment
    {
        public int Id { get; set; } // id of comment
        public User User { get; set; } // user who commented
        public DateTime Date { get; set; } // time of rating
        public string Body { get; set; } // comment text
        public Rating Rating { get; set; } // the rating on which the comment was given
    }
}
