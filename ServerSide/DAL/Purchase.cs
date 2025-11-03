using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL
{
    public class Purchase
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Minute { get; set; }
        public int Print { get; set; }
        public int UsersID { get; set; }
        public virtual Users Users { get; set; }
        public int PackagesID { get; set; }
        public virtual Package Packages { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual List<PurchasesImpl>? PurchasesImpl { get; set; }
      

    }

}
