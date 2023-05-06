using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace advanced_programming_2_backend.Models
{
    public class Ordering
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public Object[] Objects { get; set; }
    }
}