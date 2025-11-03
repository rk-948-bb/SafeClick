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
    public class ProductController : ControllerBase
    {
        private IProductRepository productRepository;
        public ProductController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            ProductDTO p = productRepository.GetProductById(id);
            if (p == null)
                return NotFound("Product not found");
            return Ok(p);
        }
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ProductDTO> p = productRepository.GetAllProduct();
            if (p == null)
                return NotFound("No Products");
            return Ok(p);
        }
        [HttpGet("getAllByCity/{categoryId}")]
        public IActionResult GetAllByCity(int categoryId)
        {
            List<ProductDTO> p = productRepository.GetAllProductByCity(categoryId);
            if (p.Count == 0)
                return NotFound("No Products in your city");
            return Ok(p);
        }
        [HttpPost("add")]
        public ActionResult<Product> AddProduct(ProductDTO p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (productRepository.GetProductById(p.Id) != null)
                return Conflict();
            productRepository.AddProduct(p);

            return CreatedAtAction(nameof(AddProduct), new { id = p.Id }, p);
        }
        [HttpPut("update/{id}")]
        public IActionResult Update(int id,ProductDTO p)
        {
            if(p==null|| !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != p.Id)
            {
                return Conflict();
            }
           productRepository.UpdateProduct(p);
            return Ok(p);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            ProductDTO p = productRepository.GetProductById(id);
            if (p == null)
                return NotFound("No Product found");
            productRepository.DeleteProduct(id);
            return NoContent();
        }
    }

}
