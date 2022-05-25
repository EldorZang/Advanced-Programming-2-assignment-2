using System;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;

namespace WebApplication3.Controllers;

[ApiController]
[Route("[controller]")]
public class ApiController : ControllerBase
{
    private UsersDb usersDb = new UsersDb();
    [HttpGet("contacts")]
    public IActionResult GetContacts(string? loggedUserId)
    {
        if (loggedUserId == null)
        {
            return BadRequest();
        }
        var contacts = usersDb.GetAllContacts(loggedUserId);
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
        if (!usersDb.AddNewUser(bodyRequest.id,bodyRequest.nickName,bodyRequest.password)){
            return BadRequest();
        }
        return Ok();
    }
    [HttpGet("register/{id}")]
    public IActionResult RegisterNewUser(string id)
    {
        bool result = usersDb.IsUserExists(id);
        if (result)
        {
            return BadRequest();
        }
        return Ok();
    }
    [HttpPost("contacts")]
    public IActionResult AddContact(string? loggedUserId, [FromBody] ContactPostInput? bodyRequest)
    {
        if (loggedUserId == null || bodyRequest == null)
        {
            return BadRequest();
        }
        if (!usersDb.AddContact(loggedUserId, bodyRequest.id, bodyRequest.name, bodyRequest.server)){
            return NotFound();
        }
        return Ok();
    }

    [HttpGet("contacts/{id}")]
    public IActionResult GetContactById(string id, string? loggedUserId)
    {
        if (loggedUserId == null)
        {
            return BadRequest();
        }
        Contact? output = usersDb.GetOneContact(loggedUserId, id);
        if (output == null)
        {
            return NotFound();
        }
        return Ok(JsonSerializer.Serialize(output));
    }
    [HttpPut("contacts/{id}")]
    public IActionResult UpdateContact(string id, string? loggedUserId,[FromBody] ContactPutInput? input)
    {
        if (loggedUserId == null || input == null)
        {
            return BadRequest();
        }
        if (!usersDb.UpdateContactNameServer(loggedUserId,id,input.name,input.server))
        {
            return NotFound();
        }
        return Ok();
    }
    [HttpDelete("contacts/{id}")]
    public IActionResult DeleteContact(string id, string? loggedUserId)
    {
        if (loggedUserId == null)
        {
            return BadRequest();
        }
        if (!usersDb.DeleteContact(loggedUserId,id))
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpGet("contacts/{id}/messages")]
    public IActionResult GetMessages(string id, string? loggedUserId)
    {
        if (loggedUserId == null)
        {
            return BadRequest();
        }
        var output = usersDb.GetMessages(loggedUserId,id);
        if (output == null)
        {
            return NotFound();
        }
        return Ok(JsonSerializer.Serialize(output));
    }
    [HttpPost("contacts/{id}/messages")]
    public IActionResult PostMessage(string id, string? loggedUserId,[FromBody] MessageInput? input)
    {
        if (loggedUserId == null || input == null)
        {
            return BadRequest();
        }
        var output = usersDb.GetMessages(loggedUserId,id);
        if (!usersDb.AddMessage(loggedUserId,id,input.content))
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpGet("contacts/{id}/messages/{id2}")]
    public IActionResult GetMessageById(string id, string id2, string? loggedUserId)
    {
        int msgId;
        if (loggedUserId == null || !int.TryParse(id2, out msgId))
        {
            return BadRequest();
        }

        var output = usersDb.GetMessageById(loggedUserId, id, msgId);
        if (output == null)
        {
            return NotFound();
        }
        return Ok(JsonSerializer.Serialize(output));
    }
    [HttpPut("contacts/{id}/messages/{id2}")]
    public IActionResult UpdateMessageById(string id, string id2, string? loggedUserId, [FromBody] MessageInput? requestBody)
    {
        int msgId;
        if (loggedUserId == null ||requestBody==null|| !int.TryParse(id2, out msgId))
        {
            return BadRequest();
        }
        string content = requestBody.content;
        if (!usersDb.UpdateMessageContentById(loggedUserId,id,msgId,content))
        {
            return NotFound();
        }
        return Ok();
    }
    [HttpDelete("contacts/{id}/messages/{id2}")]
    public IActionResult DeleteMessageById(string id, string id2, string? loggedUserId)
    {
        int msgId;
        if (loggedUserId == null ||!int.TryParse(id2, out msgId))
        {
            return BadRequest();
        }
        if (!usersDb.DeleteMessageById(loggedUserId,id,msgId))
        {
            return NotFound();
        }
        return Ok();
    }
    [HttpPost("invitations")]
    public IActionResult PostInvitation([FromBody] InvitationInput? input)
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
        var result = AddContact(input.to, postInput);
        return result;
    }
    [HttpPost("transfer")]
    public IActionResult PostTransfer([FromBody] TransferInput? input)
    {
        if (input == null)
        {
            return BadRequest();
        }
        //post message - content
        var postInput = new MessageInput();
        postInput.content = input.content;
        var result = PostMessage(input.from, input.to, postInput);
        return result;
    }
}