using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace DTO
{
    public class PackageImageUpdateDTO
    {
        public int Id { get; set; }
        public IFormFile? ImageFile { get; set; }
        public string? Image { get; set; }
    }
}
