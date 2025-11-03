using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Product
    {
        public int Id { get; set; }      
        public string IpAddress { get; set; }
        public string Model { get; set; }
        public int NumBranch { get; set; }
        public int NumComputer { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
