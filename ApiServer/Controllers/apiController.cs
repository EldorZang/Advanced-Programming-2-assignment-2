using System;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;
using ApiServer.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics.CodeAnalysis;
using ApiServer.Hubs.Clients;
using ApiServer.Services;

namespace ApiServer.Controllers;

[ApiController]
[Route("[controller]")]
public class apiController : ControllerBase
{
    private string serverPath = "https://localhost:7127";
    private readonly UsersDBService usersDbService = new UsersDBService();
    private readonly IHubContext<DataBaseHub,IDataBaseClient> _messageHub;
    public apiController(IHubContext<DataBaseHub, IDataBaseClient> messageHub)
    {
        _messageHub = messageHub;
    }
    [HttpGet("contacts")]
    public IActionResult GetContacts(string? loggedUserId)
    {
        if (loggedUserId == null)
        {
            return BadRequest();
        }
        var contacts = usersDbService.GetAllContacts(loggedUserId);
        if (contacts == null)
        {
            return NotFound();
        }
        return Ok(JsonSerializer.Serialize(contacts));
    }
    [HttpPost("register")]
    public IActionResult RegisterNewUser([FromBody] RegisterInput? bodyRequest)
    {
        if (bodyRequest == null)
        {
            return BadRequest();
        }
        if (!usersDbService.AddNewUser(bodyRequest.id,bodyRequest.nickName,bodyRequest.password)){
            return BadRequest();
        }
        return Ok();
    }
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginInput? bodyRequest)
    {
        if (bodyRequest == null)
        {
            return BadRequest();
        }
        if (!usersDbService.Login(bodyRequest.id,bodyRequest.password)){
            return BadRequest();
        }
        return Ok();
    }
    [HttpGet("register/{id}")]
    public IActionResult RegisterNewUser(string id)
    {
        bool result = usersDbService.IsUserExists(id);
        if (result)
        {
            return BadRequest();
        }
        return Ok();
    }
    [HttpGet("nickName/{id}")]
    public IActionResult getNickName(string id)
    {
        var result = usersDbService.GetNickName(id);
        if (result == null)
        {
            return BadRequest();
        }
        return Ok(JsonSerializer.Serialize(result));
    }
    [HttpPost("contacts")]
    public async Task<IActionResult> AddContact(string? loggedUserId, [FromBody] ContactPostInput? bodyRequest)
    {
        if (loggedUserId == null || bodyRequest == null)
        {
            return BadRequest();
        }

        var newContactObj = usersDbService.AddContact(loggedUserId, bodyRequest.id, bodyRequest.name, bodyRequest.server);
        if (newContactObj == null){
            return NotFound();
        }
        await _messageHub.Clients.All.ReceiveUpdate(true);
        return Created(serverPath +"/api/contacts/"+bodyRequest.id+"/?loggedUserId="+loggedUserId,newContactObj);
    }

    [HttpGet("contacts/{id}")]
    public IActionResult GetContactById(string id, string? loggedUserId)
    {
        if (loggedUserId == null)
        {
            return BadRequest();
        }
        Contact? output = usersDbService.GetOneContact(loggedUserId, id);
        if (output == null)
        {
            return NotFound();
        }
        return Ok(JsonSerializer.Serialize(output));
    }
    [HttpPut("contacts/{id}")]
    public async Task<IActionResult> UpdateContact(string id, string? loggedUserId,[FromBody] ContactPutInput? input)
    {
        if (loggedUserId == null || input == null)
        {
            return BadRequest();
        }
        if (!usersDbService.UpdateContactNameServer(loggedUserId,id,input.name,input.server))
        {
            return NotFound();
        }
        await _messageHub.Clients.All.ReceiveUpdate(true);
        return NoContent();
    }
    [HttpDelete("contacts/{id}")]
    public async Task<IActionResult> DeleteContact(string id, string? loggedUserId)
    {
        if (loggedUserId == null)
        {
            return BadRequest();
        }
        if (!usersDbService.DeleteContact(loggedUserId,id))
        {
            return NotFound();
        }
        await _messageHub.Clients.All.ReceiveUpdate(true);
        return NoContent();
    }

    [HttpGet("contacts/{id}/messages")]
    public IActionResult GetMessages(string id, string? loggedUserId)
    {
        if (loggedUserId == null)
        {
            return BadRequest();
        }
        var output = usersDbService.GetMessages(loggedUserId,id);
        if (output == null)
        {
            return NotFound();
        }
        return Ok(JsonSerializer.Serialize(output));
    }
    [HttpPost("contacts/{id}/messages")]
    public async Task<IActionResult> PostMessage(string id, string? loggedUserId,[FromBody] MessageInput? input)
    {
        if (loggedUserId == null || input == null)
        {
            return BadRequest();
        }
        var output = usersDbService.GetMessages(loggedUserId,id);
        var newMsgObj = usersDbService.AddMessage(loggedUserId, id, input.content);
        if (newMsgObj == null)
        {
            return NotFound();
        }
        await _messageHub.Clients.All.ReceiveUpdate(true);
        return Created(serverPath+"/api/contacts/" +id+"/messages/"+newMsgObj.id+"?loggedUserId="+loggedUserId,newMsgObj);
    }

    [HttpGet("contacts/{id}/messages/{id2}")]
    public IActionResult GetMessageById(string id, string id2, string? loggedUserId)
    {
        int msgId;
        if (loggedUserId == null || !int.TryParse(id2, out msgId))
        {
            return BadRequest();
        }

        var output = usersDbService.GetMessageById(loggedUserId, id, msgId);
        if (output == null)
        {
            return NotFound();
        }
        return Ok(JsonSerializer.Serialize(output));
    }
    [HttpPut("contacts/{id}/messages/{id2}")]
    public async Task<IActionResult> UpdateMessageById(string id, string id2, string? loggedUserId, [FromBody] MessageInput? requestBody)
    {
        int msgId;
        if (loggedUserId == null ||requestBody==null|| !int.TryParse(id2, out msgId))
        {
            return BadRequest();
        }
        string content = requestBody.content;
        if (!usersDbService.UpdateMessageContentById(loggedUserId,id,msgId,content))
        {
            return NotFound();
        }
        await _messageHub.Clients.All.ReceiveUpdate(true);
        return NoContent();
    }
    [HttpDelete("contacts/{id}/messages/{id2}")]
    public async Task<IActionResult> DeleteMessageById(string id, string id2, string? loggedUserId)
    {
        int msgId;
        if (loggedUserId == null ||!int.TryParse(id2, out msgId))
        {
            return BadRequest();
        }
        if (!usersDbService.DeleteMessageById(loggedUserId,id,msgId))
        {
            return NotFound();
        }
        await _messageHub.Clients.All.ReceiveUpdate(true);
        return NoContent();
    }
    [HttpPost("invitations")]
    public async Task<IActionResult> PostInvitation([FromBody] InvitationInput? input)
    {
        if (input == null)
        {
            return BadRequest();
        }
        //post contact - id name server
        var postInput = new ContactPostInput();
        postInput.id = input.from;
        postInput.name = input.from;
        postInput.server = input.server;
        return await AddContact(input.to, postInput);
    }
    [HttpPost("transfer")]
    public async Task<IActionResult> PostTransfer([FromBody] TransferInput? input)
    {
        if (input == null)
        {
            return BadRequest();
        }
        //post message - content
        var postInput = new MessageInput();
        postInput.content = input.content;
        var msgObj = usersDbService.AddMessage(input.to, input.from, input.content, false);
        if (msgObj == null)
        {
            return BadRequest();
        }
        await _messageHub.Clients.All.ReceiveUpdate(true);
        return Created(serverPath+"/api/contacts/" +input.from+"/?loggedUserId="+input.to,msgObj);
    }
    
}