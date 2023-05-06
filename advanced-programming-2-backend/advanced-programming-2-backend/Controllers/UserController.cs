using advanced_programming_2_backend.Models;
using advanced_programming_2_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace advanced_programming_2_backend.Controllers
{
    public class UserController : Controller
    {
        private readonly MongoUserService service;

        public UserController(MongoUserService serviceArg)
        {
            service = serviceArg;
        }
        
        [HttpGet]
        public ActionResult<List<User>> Get() =>
            service.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = service.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            service.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, User userIn)
        {
            var user = service.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            service.Update(id, userIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var user = service.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            service.Delete(user.Id);

            return NoContent();
        }


    }

}