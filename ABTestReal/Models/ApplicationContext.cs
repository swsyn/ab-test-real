using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ABTestReal.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public ApplicationContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=abtestrealdb;Trusted_Connection=True;");
            optionsBuilder.UseSqlServer("workstation id=abtestrealdb.mssql.somee.com;packet size=4096;user id=swsyn_SQLLogin_1;pwd=8jou2yrxdo;data source=abtestrealdb.mssql.somee.com;persist security info=False;initial catalog=abtestrealdb");
        }
    }
}
