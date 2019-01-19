/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
var app;
(function (app) {
    var Todo = /** @class */ (function () {
        function Todo() {
        }
        return Todo;
    }());
    var TodoApp = /** @class */ (function () {
        function TodoApp(applicationEl) {
            this.applicationEl = applicationEl;
            this.todoList = applicationEl.find("#todo-list");
            this.todoItemTemplate = $(".item-template").clone().removeClass("item-template");
            this.activeTodoCount = applicationEl.find("#activeTodoCount");
            this.newTodo = applicationEl.find("#new-todo");
        }
        TodoApp.prototype.init = function () {
            this.loadTodoData();
            this.initApplicationEvents();
        };
        TodoApp.prototype.loadTodoData = function () {
            var _this = this;
            $.ajax("/api/todos").done(function (data) {
                _this.render(data);
            });
        };
        TodoApp.prototype.initApplicationEvents = function () {
            var _this = this;
            this.newTodo.on("keypress", function (event) { return _this.onNewTodoKeyPress(event); });
        };
        TodoApp.prototype.onNewTodoKeyPress = function (event) {
            if (event.which === 13) {
                this.createTodo();
            }
        };
        TodoApp.prototype.createTodo = function () {
            var _this = this;
            var todo = new Todo();
            todo.title = this.newTodo.val();
            todo.priority = 1;
            //todo.dueDate = new Date();
            $.ajax("/api/todos/", {
                method: "POST",
                data: todo
            }).done(function () { return _this.loadTodoData(); });
        };
        TodoApp.prototype.render = function (todos) {
            this.todoList.empty();
            for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
                var todo = todos_1[_i];
                this.renderTodo(todo);
            }
            this.activeTodoCount.text(todos.length);
        };
        TodoApp.prototype.renderTodo = function (todo) {
            var divView = this.todoItemTemplate.clone();
            divView.find("label").text(todo.title);
            var li = $("<li/>");
            li.append(divView);
            li.appendTo(this.todoList);
        };
        return TodoApp;
    }());
    var todoApp = new TodoApp($("#todoapp"));
    todoApp.init();
})(app || (app = {}));
//# sourceMappingURL=todo.js.map