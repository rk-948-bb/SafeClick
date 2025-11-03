using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PurchasesImpl
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int UseMinute { get; set; }
        public int UsePrint { get; set; }
        public int PurchaseId { get; set; }
        public virtual Purchase Purchase { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

    }
}
