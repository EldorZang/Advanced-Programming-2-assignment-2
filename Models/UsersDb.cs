using System.Linq.Expressions;

namespace WebApplication3;

public class UsersDb
{
    private static List<User> _users = new List<User>();

    public UsersDb()
    {
        AddSampleUsers();
    }
    public void AddSampleUsers()
    {
       _users.Add(new User("alice123", "alice_pass",
            new  List<Contact> { },"alice"));
     _users.Add(new User("bob123", "bob_pass",
            new  List<Contact> { },"bob")); 
        
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
    
    public bool AddContact(string loggedUserID, string newContact, string newName, string server)
    {
        var loggedUser = _users.Find( element => element.id == loggedUserID);
        if (loggedUser == null) return false;
        if (loggedUser.contacts.Any(e => e.id == newContact)) return false;
        loggedUser.AddContact(newContact, newName, server);
        return true;
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

    public bool AddMessage(string user1, string user2, string content)
    {
        User? user = _users.Find(element => element.id == user1);
        if (user == null) return false;
        var user2Messages = user.userMessages.Find(e => e.userId == user2);
        if (user2Messages == null) return false;
        user2Messages.AddMessage(content, true);
        return true;
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
}