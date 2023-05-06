using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace advanced_programming_2_backend.Models
{
    public class Object
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
        public float Z { get; set; }
        public float Width { get; set; }
        public float Height { get; set; }
        public float Length { get; set; }
        public float Weight { get; set; }
        public Boolean Fragile { get; set; }
        public Boolean TopSide { get; set; }
    }
}