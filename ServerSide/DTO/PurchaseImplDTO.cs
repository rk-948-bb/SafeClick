using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PurchaseImplDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public int UseMinute { get; set; }
        public int UsePrint { get; set; }
        public int ProductId { get; set; }
    }
}
