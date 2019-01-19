using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HelloWebApi2018.Data;
using HelloWebApi2018.Models;

namespace HelloWebApi2018.Controllers {
    public class HomeController :Controller {
        Person person = new Person {
            FirstName = "Vasya",
            LastName = "Looser",
            Dob = DateTime.Now.AddYears(-20)
        };

        public ActionResult Index() {
            using (var db = new ToDoContext()) {
                var todos = db.ToDos.ToList();
            }

            return View(person);
        }


        public ActionResult Index2() {


            if (Request.IsAjaxRequest()) {
                return PartialView("_Person", person);
            }

            return View(person);
        }

        public ActionResult IndexJson() {


            return Json(person, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Todos() {


            return View();
        }
    }


}
