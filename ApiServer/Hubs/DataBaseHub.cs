
using System.Threading.Tasks;
using ApiServer.Hubs.Clients;

using Microsoft.AspNetCore.SignalR;

namespace ApiServer.Hubs
{
    public class DataBaseHub : Hub<IDataBaseClient>
    {
        public async Task SendUpdate(bool value)
        {
            await Clients.All.ReceiveUpdate(value);
        }
    }
}