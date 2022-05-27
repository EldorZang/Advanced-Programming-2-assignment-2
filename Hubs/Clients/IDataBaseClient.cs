using System.Threading.Tasks;
using WebApplication3;

namespace WebApplication3.Hubs.Clients
{
    public interface IDataBaseClient
    {
        Task ReceiveUpdate(bool value);
    }
}