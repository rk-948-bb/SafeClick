using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PurchaseImplDTO2
    {
        public int Id { get; set; }
        public int PurchaseId { get; set; }
        public DateTime Date { get; set; }
        public int UseMinute { get; set; }
        public int UsePrint { get; set; }
        public int ProductId { get; set; }
        public virtual ProductDTO? Product { get; set; }

    }
}
