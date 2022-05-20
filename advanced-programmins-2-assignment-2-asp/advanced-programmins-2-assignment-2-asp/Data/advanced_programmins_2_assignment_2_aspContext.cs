using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using advanced_programmins_2_assignment_2_asp.Models;

namespace advanced_programmins_2_assignment_2_asp.Data
{
    public class advanced_programmins_2_assignment_2_aspContext : DbContext
    {
        public advanced_programmins_2_assignment_2_aspContext (DbContextOptions<advanced_programmins_2_assignment_2_aspContext> options)
            : base(options)
        {
        }

        public DbSet<advanced_programmins_2_assignment_2_asp.Models.Rating>? Rating { get; set; }

        public DbSet<advanced_programmins_2_assignment_2_asp.Models.User>? User { get; set; }

        public DbSet<advanced_programmins_2_assignment_2_asp.Models.Comment>? Comment { get; set; }
    }
}
