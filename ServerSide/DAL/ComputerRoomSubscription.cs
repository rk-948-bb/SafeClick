using DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace DAL

{
    public class ComputerRoomSubscription : DbContext
    {
        public ComputerRoomSubscription(DbContextOptions<ComputerRoomSubscription> options) : base(options)
        {
            //יתכן שצריך להוסיף את הבנאי הזה
        }
        public DbSet<Users>Users { get; set; }
        public DbSet<Package> Packege { get; set; }
        public DbSet<PurchasesImpl> PurchasesImpl { get; set; }
        public DbSet<Purchase>Purchase { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Category> Category { get; set; }

    }
}
