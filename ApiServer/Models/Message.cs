namespace ApiServer;

public class Message
{
    public int id { get; set; }
    public string content { get; set; }
    public string created { get; set; }
    public bool sent { get; set; }
    public Message(string msgContent, int msgId, bool msgSent)
    {
        this.created =  DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fffffff");

        Console.WriteLine(this.created);
        this.id = msgId;
        this.content = msgContent;
        this.sent = msgSent;
    }


    
}