using System.Threading.Tasks;
using ApiServer;

namespace ApiServer.Hubs.Clients
{
    public interface IDataBaseClient
    {
        Task ReceiveUpdate(bool value);
    }
}