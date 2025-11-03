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
    public class PurchasesImplController : ControllerBase
    {
        private IPurchasesImplRepository purchaseImplRepository;
        private IPurchaseRepository purchaseRepository;

        public PurchasesImplController(IPurchasesImplRepository purchasesImplRepository, IPurchaseRepository purchaseRepository) { 
            this.purchaseImplRepository = purchasesImplRepository;
            this.purchaseRepository = purchaseRepository;
        }



        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            PurchaseImplDTO p = purchaseImplRepository.GetPurchaseImpl(id);
            if (p == null)
                return NotFound("purchase implementation not found");
            return Ok(p);
        }
        [HttpGet("getByPurchaseId/{id}")]
        public IActionResult GetByPurchaseId(int id)
        {
           List<PurchaseImplDTO>  p = purchaseImplRepository.GetPurchaseImplByPurchaseId(id);
            if (p.Count() == 0)
                return NotFound("purchase implementation not found");
            return Ok(p);
        }
        [HttpGet("getByUserId/{id}")]
        public IActionResult GetByUserId(int id)
        {
            List<Purchase> l = purchaseRepository.GetAllPurchaseByUserId(id);
            List<PurchaseImplDTO2> p = purchaseImplRepository.GetPurchaseImplByUserId(l);
            if (p.Count() == 0)
                return NotFound("purchase implementation not found");
            return Ok(p);
        }
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<PurchaseImplDTO> p = purchaseImplRepository.GetAllPurchaseImpl();
            if (p == null)
                return NotFound("no purchase implementation");
            return Ok(p);
        }
        [HttpPost("add")]
        public ActionResult<PurchasesImpl> AddPurchasesImpl(PurchaseImplDTO p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (purchaseImplRepository.GetPurchaseImpl(p.Id) != null)
                return Conflict();
            Purchase pur = purchaseImplRepository.AddPurchaseImpl(p);
            if(pur!=null)
            {
                purchaseRepository.UpdatePurchase(pur);
            }
            return CreatedAtAction(nameof(AddPurchasesImpl), new { id = p.Id }, p);
        }
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, PurchaseImplDTO p)
        {
            if(p==null|| !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != p.Id)
            {
                return Conflict();
            }
           purchaseImplRepository.UpdatePurchaseImpl(p);
            return Ok(p);
        }

        [HttpDelete("delete/{id}")]

        public IActionResult Delete(int id)
        {
            PurchaseImplDTO p = purchaseImplRepository.GetPurchaseImpl(id);
            if (p == null)
                return NotFound("No Purchase impl found");
            purchaseImplRepository.DeletePurchaseImpl(id);
            return NoContent();
        }
    }
}
