namespace WebApplication3;

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

    public bool AddContact(string newContactId, string name, string server)
    {
        if (contacts.Any(e => e.id == newContactId)) return false;
        contacts.Add(new Contact(newContactId,name,server));
        userMessages.Add(new UserMessages(newContactId));
        return true;
    }


    
}