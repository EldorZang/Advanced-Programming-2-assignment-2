namespace ApiServer;

public class ContactPostInput {
    public string id { get; set; }
    public string name { get; set; }
    public string server { get; set; }
    
}
public class ContactPutInput {
    public string name { get; set; }
    public string server { get; set; }
}

public class MessageInput
{
    public string content { get; set; }
}
public class InvitationInput
{
    public string from { get; set; }
    public string to { get; set; }
    public string server { get; set; }
}
public class TransferInput
{
    public string from { get; set; }
    public string to { get; set; }
    public string content { get; set; }
}
public class RegisterInput
{
    public string id { get; set; }
    public string nickName { get; set; }
    public string password { get; set; }
}
public class LoginInput
{
    public string id { get; set; }
    public string password { get; set; }
}