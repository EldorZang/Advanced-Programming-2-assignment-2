using System.Linq.Expressions;

namespace WebApplication3;

public class UsersDb
{
    private static List<User> _users = new List<User>();
    private static bool firstInitialize = false;

    public UsersDb()
    {
        if (firstInitialize == false)
        {
            AddSampleUsers();
        }

        firstInitialize = true;
    }
    public void AddSampleUsers()
    {
       _users.Add(new User("alice123", "alice_pass",
            new  List<Contact> {new Contact("bob123","bob","https://localhost:7030") },"alice"));
     _users.Add(new User("bob123", "bob_pass",
            new  List<Contact> { new Contact("alice123","alice","https://localhost:7030")},"bob"));
     var bob = _users.Find(e => e.id == "bob123");
     var alice = _users.Find(e => e.id == "alice123");
     
     bob.userMessages.Add(new UserMessages("alice123"));
     alice.userMessages.Add(new UserMessages("bob123"));
     
     var bobToAliceMsgs = bob.userMessages.Find(e => e.userId == "alice123");
     var aliceToBobMsgs = alice.userMessages.Find(e => e.userId == "bob123");
     
     bobToAliceMsgs.AddMessage("hi1", true);
     aliceToBobMsgs.AddMessage("hi1", false);
     bobToAliceMsgs.AddMessage("hi2", false);
     aliceToBobMsgs.AddMessage("hi2", true);
     bobToAliceMsgs.AddMessage("hi3", true);
     aliceToBobMsgs.AddMessage("hi3", false);
    }
    public List<User> GetUsers()
    {
        return _users;
    }
    
    public  List<Contact>? GetAllContacts(string currUserID)
    {
        var requestedUser = _users.Find( element => element.id == currUserID);
        if (requestedUser == null) return null;
        return requestedUser.contacts;
    }
    
    public Contact? AddContact(string loggedUserID, string newContact, string newName, string server)
    {
        var loggedUser = _users.Find( element => element.id == loggedUserID);
        if (loggedUser == null) return null;
        if (loggedUser.contacts.Any(e => e.id == newContact)) return null;
        var newContactObj = loggedUser.AddContact(newContact, newName, server);
        return newContactObj;
    }

    public bool AddNewUser(string id, string nickName, string password)
    {
        if (_users.Any(element => element.id == id)) return false;
        User newUser = new User(id, password, new List<Contact>(), nickName);
        _users.Add(newUser);
        return true;
    }
    public Contact? GetOneContact(string loggedUserID, string contactID)
    {
        User? loggedUser = _users.Find( element => element.id == loggedUserID);
        if (loggedUser == null) return null;
        Contact? output = (loggedUser.contacts).Find( element => element.id == contactID);
        return output;
    }




    public bool UpdateContactNameServer(string loggedUser, string contactId, string newName, string newServer)
    {
        User? user = _users.Find(element => element.id == loggedUser);
        if (user == null) return false;
        Contact? contact = user.contacts.Find(element => element.id == contactId);
        if (contact == null) return false;
        contact.name = newName;
        contact.server = newServer;
        return true;

    }

    public bool DeleteContact(string loggedUser, string contactId)
    {
        var user = _users.Find(element => element.id == loggedUser);
        if (user == null) return false;
        var contact = user.contacts.Find(element => element.id == contactId);
        var userMsgs = user.userMessages.Find(e => e.userId == contactId);
        if (contact == null || userMsgs==null) return false;
        user.contacts.Remove(contact);
        user.userMessages.Remove(userMsgs);
        return true;
    }
// by using user1 prespective
    public Message[]? GetMessages(string user1, string user2)
    {
        User? user = _users.Find(element => element.id == user1);
        if (user == null) return null;
        var user2Messages = user.userMessages.Find(e => e.userId == user2);
        if (user2Messages == null) return null;
        return user2Messages.messages.ToArray();
    }

    public Message? AddMessage(string user1, string user2, string content)
    {
        User? user = _users.Find(element => element.id == user1);
        if (user == null) return null;
        var user2Messages = user.userMessages.Find(e => e.userId == user2);
        if (user2Messages == null) return null;
        var output = user2Messages.AddMessage(content, true);
        return output;
    }
    public Message? AddMessage(string user1, string user2,string content, bool sent)
    {
        User? user = _users.Find(element => element.id == user1);
        if (user == null) return null;
        var user2Messages = user.userMessages.Find(e => e.userId == user2);
        if (user2Messages == null) return null;
        var output = user2Messages.AddMessage(content, sent);
        return output;
    }

    public Message? GetMessageById(string loggedUser, string user2,int msgId)
    {
        User? user = _users.Find(element => element.id == loggedUser);
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
        User? user = _users.Find(element => element.id == loggedUser);
        if (user == null) return false;
        var user2Messages = user.userMessages.Find(e => e.userId == user2);
        if (user2Messages == null) return false;
        return user2Messages.DeleteMessage(msgId);
    }

    public bool IsUserExists(string id)
    {
        return _users.Any(element => element.id == id);
    }

    public bool Login(string id, string password)
    {
        var usr = _users.Find(element => element.id == id);
        if (usr == null) return false;
        return usr.password == password;
    }
    public string? GetNickName(string id)
    {
        var usr = _users.Find(element => element.id == id);
        if (usr == null) return null;
        return usr.nickName;
    }
}