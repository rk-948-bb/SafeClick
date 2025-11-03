using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace DAL
{
    public class Users
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Tz { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchase>? Purchase { get; set; }  
    }
}