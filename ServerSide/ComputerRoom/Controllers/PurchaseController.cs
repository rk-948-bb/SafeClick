using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL;
using BLL;
using Microsoft.AspNetCore.Cors;
using DTO;

namespace ComputerRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class PurchaseController : ControllerBase
    {
        private IPurchaseRepository purchaseRepository;

        public PurchaseController(IPurchaseRepository purchasesRepository)
        {
            this.purchaseRepository = purchasesRepository;
        }

        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            Purchase p =purchaseRepository.GetPurchase(id);
            if (p == null)
                return NotFound("purchase not found");
            return Ok(p);
        }

        [HttpPost("add")]
        public ActionResult<Purchase> AddPurchase(PurchaseDTO p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (purchaseRepository.GetPurchase(p.Id) != null)
                return Conflict();
            purchaseRepository.AddPurchase(p);

            return CreatedAtAction(nameof(AddPurchase), new { id = p.Id }, p);
        }
        [HttpPut("update/{id}")]
        public IActionResult Update(int id,Purchase p)
        {
            if(p==null|| !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != p.Id)
            {
                return Conflict();
            }
           purchaseRepository.UpdatePurchase(p);
            return Ok(p);
        }

        [HttpDelete("delete/{id}")]

        public IActionResult Delete(int id)
        {
            Purchase p = purchaseRepository.GetPurchase(id);
            if (p == null)
                return NotFound("No Purchase found");
            purchaseRepository.DeletePurchase(id);
            return NoContent();
        }
        [HttpGet("getAll")]
        public IActionResult GetAll(int id)
        {
            List<Purchase> p = purchaseRepository.GetAllPurchaseByUserId(id);
            if (p == null)
                return NotFound("No purchase ");
            return Ok(p);
        }

    }
}
