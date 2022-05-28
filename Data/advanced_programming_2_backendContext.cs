using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using advanced_programming_2_backend.Models;

namespace advanced_programming_2_backend.Data
{
    public class advanced_programming_2_backendContext : DbContext
    {
        public advanced_programming_2_backendContext (DbContextOptions<advanced_programming_2_backendContext> options)
            : base(options)
        {
        }

        public DbSet<advanced_programming_2_backend.Models.Rating>? Rating { get; set; }
    }
}
