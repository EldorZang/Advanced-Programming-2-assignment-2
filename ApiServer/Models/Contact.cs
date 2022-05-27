namespace ApiServer;

public class Contact
{
    public string? id { get; set; }
    public string? name { get; set; }
    public string? server { get; set; }
    public string? last { get; set; }
    public string? lastdate { get; set; }
    public Contact(string? idArg, string? nameArg, string? serverArg, string? lastArg, string? lastdateArg)
    {
        this.id = idArg;
        this.name = nameArg;
        this.server = serverArg;
        this.last = lastArg;
        this.lastdate = lastdateArg;
    }
    public Contact(string? idArg, string? nameArg, string? serverArg)
    {
        this.id = idArg;
        this.name = nameArg;
        this.server = serverArg;
        this.last = null;
        this.lastdate = null;
    }
    
}