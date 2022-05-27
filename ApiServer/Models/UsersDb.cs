using System.Linq.Expressions;

namespace ApiServer;

public class UsersDb
{
    private static List<User> _users = new List<User>();
    private static bool firstInitialize = false;

    public UsersDb()
    {
        if (firstInitialize == false)
        {
            _users = new List<User>();
            AddSampleUsers();
        }

        firstInitialize = true;
    }
    public void AddSampleUsers()
    {
        string serverPath = "https://localhost:7127";
       _users.Add(new User("bob123", "bob_pass",
            new  List<Contact> {new Contact("alice123","Alice", serverPath),
                                new Contact("oliver123","Oliver", serverPath),
                                new Contact("olivia123","Olivia", serverPath)}, "Bob"));

     _users.Add(new User("alice123", "alice_pass",
            new  List<Contact> { new Contact("bob123", "Bob", serverPath) }, "Alice"));

        _users.Add(new User("oliver123", "oliver_pass",
           new List<Contact> { new Contact("bob123", "Bob", serverPath) }, "Oliver"));

        _users.Add(new User("olivia123", "olivia_pass",
           new List<Contact> { new Contact("bob123", "Bob", serverPath) }, "Olivia"));


     var bob = _users.Find(e => e.id == "bob123");
     var alice = _users.Find(e => e.id == "alice123");
     var oliver = _users.Find(e => e.id == "oliver123");
     var olivia = _users.Find(e => e.id == "olivia123");

     bob.userMessages.Add(new UserMessages("alice123"));
     bob.userMessages.Add(new UserMessages("oliver123"));
     bob.userMessages.Add(new UserMessages("olivia123"));

     alice.userMessages.Add(new UserMessages("bob123"));
     oliver.userMessages.Add(new UserMessages("bob123"));
     olivia.userMessages.Add(new UserMessages("bob123"));



     var bobToAliceMsgs = bob.userMessages.Find(e => e.userId == "alice123");
     var aliceToBobMsgs = alice.userMessages.Find(e => e.userId == "bob123");
     
     bobToAliceMsgs.AddMessage("How's France?", true);
     aliceToBobMsgs.AddMessage("How's France?", false);
     bobToAliceMsgs.AddMessage("It's great! We've already been at the Eiffel", false);
     aliceToBobMsgs.AddMessage("It's great! We've already been at the Eiffel", true);
     bobToAliceMsgs.AddMessage("Enjoy your trip!", true);
     aliceToBobMsgs.AddMessage("Enjoy your trip!", false);

     var bobToOliverMsgs = bob.userMessages.Find(e => e.userId == "oliver123");
     var oliverToBobMsgs = oliver.userMessages.Find(e => e.userId == "bob123");

        bobToOliverMsgs.AddMessage("Hi, I would like to apply for the job", true);
        oliverToBobMsgs.AddMessage("Hi, I would like to apply for the job", false);
        bobToOliverMsgs.AddMessage("No problem, we can schedule an interview for next Monday at 3:00PM.", false);
        oliverToBobMsgs.AddMessage("No problem, we can schedule an interview for next Monday at 3:00PM.", true);
        bobToOliverMsgs.AddMessage("Sounds great.", true);
        oliverToBobMsgs.AddMessage("Sounds great.", false);

        var bobToOliviaMsgs = bob.userMessages.Find(e => e.userId == "olivia123");
        var oliviaToBobMsgs = olivia.userMessages.Find(e => e.userId == "bob123");

        bobToOliviaMsgs.AddMessage("The package will be shipped out in 5-8 bussiness days.", true);
        oliviaToBobMsgs.AddMessage("The package will be shipped out in 5-8 bussiness days.", false);
        bobToOliviaMsgs.AddMessage("Thanks.", false);
        oliviaToBobMsgs.AddMessage("Thanks.", true);


    }
    public List<User> getUsers()
    {
        return _users;
    }

 }