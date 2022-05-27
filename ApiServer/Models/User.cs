namespace ApiServer;

public class User
{
    public string? id { get; set; }
    public string? password { get; set; }
    public List<Contact> contacts = new List<Contact>();
    public List<UserMessages> userMessages = new List<UserMessages>();
    public string? nickName { get; set; }
    public User(string? idArg, string? passwordArg,  List<Contact>? contactsArg, string nickNameArg)
    {
        this.id = idArg;
        this.password = passwordArg;
        if (contactsArg != null)
        {
            this.contacts = contactsArg;
        }

        this.nickName = nickNameArg;
    }

    public Contact? AddContact(string newContactId, string name, string server)
    {
        if (contacts.Any(e => e.id == newContactId)) return null;
        var newContact = new Contact(newContactId, name, server);
        contacts.Add(newContact);
        userMessages.Add(new UserMessages(newContactId));
        return newContact;
    }


    
}