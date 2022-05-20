namespace advanced_programmins_2_assignment_2_asp.Models
{
    public class Rating
    {
        public int Id { get; set; } // id of submission
        public int Score { get; set; } // rating given by the user
        public string Title { get; set; } // title of submission
        public User User { get; set; } // user who rated the app
        public DateTime Date { get; set; } // time of rating
        public string Body { get; set; } // text of the submission
        public int Agree { get; set; } // number of people who agree with rating
        public int Disagree { get; set; } // number of people who disagree with rating
        public List<Comment>? Comments { get; set; } // list of comments on rating
    }
}
