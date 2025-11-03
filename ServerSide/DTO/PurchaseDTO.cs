using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PurchaseDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int UsersID { get; set; }
        public UserDTO? User { get; set; }   
        public int PackagesID { get; set; }
        public PackageDTO? Package { get; set; }
    }
}
