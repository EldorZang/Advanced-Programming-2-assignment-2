using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace advanced_programming_2_backend.Models
{
    public class Shipment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public User[] Workers { get; set; }
        public DateTime Date { get; set; }
        public Path Path { get; set; }
        public Ordering Order { get; set; }
    }
}