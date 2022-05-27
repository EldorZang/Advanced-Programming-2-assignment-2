namespace ApiServer;

public class UserMessages
{
    public string userId { get; set; }
    public List<Message> messages  { get; set; }
    public int msgLength  { get; set; }

    public UserMessages(string newId)
    {
        this.userId = newId;
        this.msgLength = 0;
        this.messages = new List<Message>();
    }

    public Message AddMessage(string msgContent, bool msgSent)
    {
        this.msgLength++;
        var msg = new Message(msgContent, msgLength, msgSent);
        messages.Add(msg);
        return msg;
    }
    public bool DeleteMessage(int msgId)
    {
        Message? msg = messages.Find(e => e.id == msgId);
        if (msg == null) return false;
        messages.Remove(msg);
        return true;
    }

    public Message? GetMessage(int msgId)
    {
        Message? msg = messages.Find(e => e.id == msgId);
        if (msg == null) return null;
        return msg;
    }
}