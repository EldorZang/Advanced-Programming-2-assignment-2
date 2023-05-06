using advanced_programming_2_backend.Models;
using advanced_programming_2_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace advanced_programming_2_backend.Controllers
{
    public class ShipmentController : Controller
    {
        private readonly MongoShipmentService service;

        public ShipmentController(MongoShipmentService serviceArg)
        {
            service = serviceArg;
        }
        
        [HttpGet]
        public ActionResult<List<Shipment>> Get() =>
            service.Get();

        [HttpGet("{id:length(24)}", Name = "GetShipment")]
        public ActionResult<Shipment> Get(string id)
        {
            var shipment = service.Get(id);

            if (shipment == null)
            {
                return NotFound();
            }

            return shipment;
        }

        [HttpPost]
        public ActionResult<Shipment> Create(Shipment shipment)
        {
            service.Create(shipment);

            return CreatedAtRoute("GetShipment", new { id = shipment.Id.ToString() }, shipment);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Shipment shipmentIn)
        {
            var shipment = service.Get(id);

            if (shipment == null)
            {
                return NotFound();
            }

            service.Update(id, shipmentIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var shipment = service.Get(id);

            if (shipment == null)
            {
                return NotFound();
            }

            service.Delete(shipment.Id);

            return NoContent();
        }


    }
}