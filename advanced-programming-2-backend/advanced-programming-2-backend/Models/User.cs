using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace advanced_programming_2_backend.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
    }
}
