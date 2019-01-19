using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using HelloWebApi2018.Models;

namespace HelloWebApi2018.Data {
    public class ToDoContext :DbContext {
        public ToDoContext() : base("name=ToDoConnection") {

        }

        public DbSet<ToDo> ToDos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Entity<ToDo>().ToTable("Todos");
            base.OnModelCreating(modelBuilder);
        }
    }
}