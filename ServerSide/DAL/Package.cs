using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL
{
    public class Package
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Minute { get; set; }
        public int Print { get; set; }
        public double Price { get; set; }
        public string? Image { get; set; }

        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchase>? Purchase { get; set; }



    }
}
