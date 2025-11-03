using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PackageDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Minute { get; set; }
        public int Print { get; set; }
        public double Price { get; set; }
        public IFormFile? ImageFile { get; set; }
        public string? Image { get; set; }
      

    }
}
