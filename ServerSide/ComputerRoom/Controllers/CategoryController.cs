using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL;
using BLL;

using DTO;
using Microsoft.AspNetCore.Cors;

namespace ComputerRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    
    public class CategoryController : ControllerBase
    {
        private ICategoryRepository categoryRepository;
        
        public CategoryController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            CategoryDTO p = categoryRepository.GetCategory(id);
            if (p == null)
                return NotFound("Category not found");
            return Ok(p);
        }
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<CategoryDTO> p = categoryRepository.GetAllCategory();
            if (p == null)
                return NotFound("no Categories");
            return Ok(p);
        }

        [HttpPost("add")]
        public ActionResult<Category> AddCategory(CategoryDTO p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (categoryRepository.GetCategory(p.Id) != null)
                return Conflict();
            categoryRepository.AddCategory(p);

            return CreatedAtAction(nameof(AddCategory), new { id = p.Id }, p);
        }
        [HttpPut("update/{id}")]
        public IActionResult Update(int id,CategoryDTO p)
        {
            if(p==null|| !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != p.Id)
            {
                return Conflict();
            }
           categoryRepository.UpdateCategory(p);
            return Ok(p);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            CategoryDTO p = categoryRepository.GetCategory(id);
            if (p == null)
                return NotFound("No Category found");
            categoryRepository.DeleteCategoryById(id);
            return NoContent();
        }
    }
}
