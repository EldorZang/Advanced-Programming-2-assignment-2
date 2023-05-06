using advanced_programming_2_backend.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace advanced_programming_2_backend.Services
{
    public class MongoUserService
    {
        private readonly IMongoCollection<User> _users;
        public MongoUserService()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("EasyCargo");
            _users = database.GetCollection<User>("Users");
        }

        public List<User> Get() => _users.Find(user => true).ToList();

        public User Get(string id) => _users.Find(user => user.Id == id).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, User updatedUser) => _users.ReplaceOne(user => user.Id == id, updatedUser);

        public void Delete(User userForDeletion) => _users.DeleteOne(user => user.Id == userForDeletion.Id);

        public void Delete(string id) => _users.DeleteOne(user => user.Id == id);

    }

    public class MongoShipmentService
    {
        private readonly IMongoCollection<Shipment> _shipments;
        public MongoShipmentService()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("EasyCargo");
            _shipments = database.GetCollection<Shipment>("Shipments");
        }

        public List<Shipment> Get() => _shipments.Find(Shipment => true).ToList();

        public Shipment Get(string id) => _shipments.Find(shipment => shipment.Id == id).FirstOrDefault();

        public Shipment Create(Shipment shipment)
        {
            _shipments.InsertOne(shipment);
            return shipment;
        }

        public void Update(string id, Shipment updatedShipment) => _shipments.ReplaceOne(shipment => shipment.Id == id, updatedShipment);

        public void Delete(Shipment shipmentForDeletion) => _shipments.DeleteOne(shipment => shipment.Id == shipmentForDeletion.Id);

        public void Delete(string id) => _shipments.DeleteOne(shipment => shipment.Id == id);

    }
}