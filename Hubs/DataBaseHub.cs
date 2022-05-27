
using System.Threading.Tasks;
using WebApplication3.Hubs.Clients;

using Microsoft.AspNetCore.SignalR;

namespace WebApplication3.Hubs
{
    public class DataBaseHub : Hub<IDataBaseClient>
    {
        public async Task SendUpdate(bool value)
        {
            await Clients.All.ReceiveUpdate(value);
        }
    }
}