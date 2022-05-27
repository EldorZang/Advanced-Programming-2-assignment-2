namespace ApiServer.Services
{
    public interface IUsersDBService
    {
        public bool Login(string id, string password);
        public bool IsUserExists(string id);
        public string? GetNickName(string id);
        public Contact? AddContact(string loggedUserID, string newContact, string newName, string server);
        public Contact? GetOneContact(string loggedUserID, string contactID);
        public bool UpdateContactNameServer(string loggedUser, string contactId, string newName, string newServer);
        public bool DeleteContact(string loggedUser, string contactId);
        public Message[]? GetMessages(string user1, string user2);
        public Message? AddMessage(string user1, string user2, string content);
        public Message? AddMessage(string user1, string user2, string content, bool sent);
        public Message? GetMessageById(string loggedUser, string user2, int msgId);
        public bool UpdateMessageContentById(string loggedUser, string user2, int msgId, string newContent);
        public bool DeleteMessageById(string loggedUser, string user2, int msgId);

    }
    public class UsersDBService: IUsersDBService
    {
        private static UsersDb db = new UsersDb();
        public List<User> GetUsers()
        {
            return db.getUsers();
        }

        public List<Contact>? GetAllContacts(string currUserID)
        {
            var requestedUser = db.getUsers().Find(element => element.id == currUserID);
            if (requestedUser == null) return null;
            return requestedUser.contacts;
        }

        public Contact? AddContact(string loggedUserID, string newContact, string newName, string server)
        {
            var loggedUser = db.getUsers().Find(element => element.id == loggedUserID);
            if (loggedUser == null) return null;
            if (loggedUser.contacts.Any(e => e.id == newContact)) return null;
            var newContactObj = loggedUser.AddContact(newContact, newName, server);
            return newContactObj;
        }

        public bool AddNewUser(string id, string nickName, string password)
        {
            if (db.getUsers().Any(element => element.id == id)) return false;
            User newUser = new User(id, password, new List<Contact>(), nickName);
            db.getUsers().Add(newUser);
            return true;
        }
        public Contact? GetOneContact(string loggedUserID, string contactID)
        {
            User? loggedUser = db.getUsers().Find(element => element.id == loggedUserID);
            if (loggedUser == null) return null;
            Contact? output = (loggedUser.contacts).Find(element => element.id == contactID);
            return output;
        }
        public bool UpdateContactNameServer(string loggedUser, string contactId, string newName, string newServer)
        {
            User? user = db.getUsers().Find(element => element.id == loggedUser);
            if (user == null) return false;
            Contact? contact = user.contacts.Find(element => element.id == contactId);
            if (contact == null) return false;
            contact.name = newName;
            contact.server = newServer;
            return true;

        }
        public bool DeleteContact(string loggedUser, string contactId)
        {
            var user = db.getUsers().Find(element => element.id == loggedUser);
            if (user == null) return false;
            var contact = user.contacts.Find(element => element.id == contactId);
            var userMsgs = user.userMessages.Find(e => e.userId == contactId);
            if (contact == null || userMsgs == null) return false;
            user.contacts.Remove(contact);
            user.userMessages.Remove(userMsgs);
            return true;
        }
        // by using user1 prespective
        public Message[]? GetMessages(string user1, string user2)
        {
            User? user = db.getUsers().Find(element => element.id == user1);
            if (user == null) return null;
            var user2Messages = user.userMessages.Find(e => e.userId == user2);
            if (user2Messages == null) return null;
            return user2Messages.messages.ToArray();
        }
        // by using user1 prespective
        public Message? AddMessage(string user1, string user2, string content)
        {
            User? user = db.getUsers().Find(element => element.id == user1);
            if (user == null) return null;
            var user2Messages = user.userMessages.Find(e => e.userId == user2);
            if (user2Messages == null) return null;
            var output = user2Messages.AddMessage(content, true);
            return output;
        }
        // by using user1 prespective
        public Message? AddMessage(string user1, string user2, string content, bool sent)
        {
            User? user = db.getUsers().Find(element => element.id == user1);
            if (user == null) return null;
            var user2Messages = user.userMessages.Find(e => e.userId == user2);
            if (user2Messages == null) return null;
            var output = user2Messages.AddMessage(content, sent);
            return output;
        }

        public Message? GetMessageById(string loggedUser, string user2, int msgId)
        {
            User? user = db.getUsers().Find(element => element.id == loggedUser);
            if (user == null) return null;
            var user2Messages = user.userMessages.Find(e => e.userId == user2);
            if (user2Messages == null) return null;
            return user2Messages.GetMessage(msgId);
        }
        public bool UpdateMessageContentById(string loggedUser, string user2, int msgId, string newContent)
        {
            var msg = GetMessageById(loggedUser, user2, msgId);
            if (msg == null) return false;
            msg.content = newContent;
            return true;
        }
        public bool DeleteMessageById(string loggedUser, string user2, int msgId)
        {
            User? user = db.getUsers().Find(element => element.id == loggedUser);
            if (user == null) return false;
            var user2Messages = user.userMessages.Find(e => e.userId == user2);
            if (user2Messages == null) return false;
            return user2Messages.DeleteMessage(msgId);
        }
        public bool IsUserExists(string id)
        {
            return db.getUsers().Any(element => element.id == id);
        }
        public bool Login(string id, string password)
        {
            var usr = db.getUsers().Find(element => element.id == id);
            if (usr == null) return false;
            return usr.password == password;
        }
        public string? GetNickName(string id)
        {
            var usr = db.getUsers().Find(element => element.id == id);
            if (usr == null) return null;
            return usr.nickName;
        }
    }
    





}
