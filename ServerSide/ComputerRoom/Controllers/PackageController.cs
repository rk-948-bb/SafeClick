using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL;
using BLL;
using Microsoft.AspNetCore.Cors;
using DTO;
using AutoMapper;

namespace ComputerRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class PackageController : ControllerBase
    { 
       private IPackageRepository packageRepository;
       private IMapper mapper;
        
        public PackageController(IPackageRepository packageRepository, IMapper mapper)
        {
            this.packageRepository = packageRepository;
            this.mapper = mapper;
        }

        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            PackageDTO p = packageRepository.GetPackage(id);
            if (p == null)
                return NotFound("Package not found");
            return Ok(p);
        }
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<PackageDTO> p = packageRepository.GetAllPackage();
            if (p == null)
                return NotFound("no Packages");
            return Ok(p);
        }

        [HttpPost("add")]
        public ActionResult<Package> AddPackage( [FromForm] PackageDTO p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var path = Path.Combine(Environment.CurrentDirectory, "Images\\", p.ImageFile.FileName);
            using(FileStream fs=new FileStream(path, FileMode.Create))
            {
                p.ImageFile.CopyTo(fs);
                fs.Close();
            }
            p.Image = path.ToString();
            if (packageRepository.GetPackage(p.Id) != null)
                return Conflict();
            packageRepository.AddPackage(mapper.Map<Package>(p));

            return CreatedAtAction(nameof(AddPackage), new { id = p.Id }, p);
        }

        [HttpPost("update-image")]
        public IActionResult UpdatePackageImage([FromForm] PackageImageUpdateDTO upImage)
        {
            if (upImage == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var path = Path.Combine(Environment.CurrentDirectory, "Images\\", upImage.ImageFile.FileName);
            using (FileStream fs = new FileStream(path, FileMode.Create))
            {
                upImage.ImageFile.CopyTo(fs);
                fs.Close();
            }

            upImage.Image = path.ToString();
            //if (packageRepository.GetPackageUp(upImage.Id) != null)
            //    return Conflict();/
            

            packageRepository.UpdatePackage(mapper.Map<Package>(upImage));

            return NoContent(); // מחזיר תשובה ללא תוכן לאחר הצלחה

        }

        //    [HttpPut("update/{id}")]
        //public IActionResult Update(int id,PackageDTO p)
        //{
        //    if(p==null|| !ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    if (id != p.Id)
        //    {
        //        return Conflict();
        //    }
        //   packageRepository.UpdatePackage(p);
        //    return Ok(p);
        //}

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            PackageDTO p = packageRepository.GetPackage(id);
            if (p == null)
                return NotFound("No Package found");
            packageRepository.DeletePackageById(id);
            return NoContent();
        }
    }
}
