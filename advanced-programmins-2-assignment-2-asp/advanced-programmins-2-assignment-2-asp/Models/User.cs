namespace advanced_programmins_2_assignment_2_asp.Models
{
    public class User
    {

        public int Id { get; set; } // user id
        public string Username { get; set; } // username
        public List<Rating>? Ratings { get; set; } // list of all ratings user posted
        public List<Comment>? Comments { get; set; } // list of all comments user posted on ratings
    }
}
