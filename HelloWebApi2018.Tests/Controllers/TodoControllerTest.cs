using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using HelloWebApi2018;
using HelloWebApi2018.Controllers;
using HelloWebApi2018.Models;

namespace HelloWebApi2018.Tests.Controllers {
    [TestClass]
    public class TodoControllerTest {
        [TestMethod]
        public void Get() {
            // Arrange
            ToDosController controller = new ToDosController();

            // Act
            var result = controller.GetToDos() as OkNegotiatedContentResult<List<ToDo>>;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsNotNull(result.Content);
            Assert.IsTrue(result.Content.Count == 2);

        }

        [TestMethod]
        public void GetById() {
            // Arrange
            ValuesController controller = new ValuesController();

            // Act
            string result = controller.Get(5);

            // Assert
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post() {
            // Arrange
            ToDosController controller = new ToDosController();
            var todo = new ToDo {
                Title = "Learn Testing",
                DueDate = DateTime.Now,
                Priority = 2,
                MinutesSpent = 10,

            };
            // Act
            var createdTodo = controller.PostToDo(todo)
                as CreatedAtRouteNegotiatedContentResult<ToDo>;

            // Assert
            Assert.IsNotNull(createdTodo);
            Assert.IsNotNull(createdTodo.Content);
            Assert.IsTrue(createdTodo.Content.Id > 0);
            Assert.AreEqual(createdTodo.Content.Title, todo.Title);
        }

        //[TestMethod]
        //public void Put() {
        //    // Arrange
        //    ToDosController controller = new ToDosController();

        //    // Act
        //    // controller.Put(5, "value");

        //    // Assert
        //}

        //[TestMethod]
        //public void Delete() {
        //    // Arrange
        //    ValuesController controller = new ValuesController();

        //    // Act
        //    controller.Delete(5);

        //    // Assert
        //}
    }
}
