/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
module app {

    class Todo {
        id: number;
        title: string;
        isCompleted: boolean;
        dueDate: Date;
        minutesSpent: number;
        priority: number;
    }


    class TodoApp {
        todoList;
        todoItemTemplate: any;
        activeTodoCount;
        newTodo: any
        constructor(private applicationEl) {
            this.todoList = applicationEl.find("#todo-list");
            this.todoItemTemplate = $(".item-template").clone().removeClass("item-template");
            this.activeTodoCount = applicationEl.find("#activeTodoCount");
            this.newTodo = applicationEl.find("#new-todo");
        }

        init() {
            this.loadTodoData();
            this.initApplicationEvents();
        }

        loadTodoData() {
            $.ajax("/api/todos").done(data => {
                this.render(data);
            });

        }

        initApplicationEvents() {
            this.newTodo.on("keypress", (event) => this.onNewTodoKeyPress(event));
        }

        onNewTodoKeyPress(event) {

            if (event.which === 13) {
                this.createTodo();
            }
        }

        createTodo() {
            var todo = new Todo();
            todo.title = this.newTodo.val();
            todo.priority = 1;
            //todo.dueDate = new Date();

            $.ajax("/api/todos/",
                {
                    method: "POST",
                    data: todo
                }).done(() => this.loadTodoData());
        }

        render(todos): void {
            this.todoList.empty();
            for (var todo of todos) {
                this.renderTodo(todo);
            }
            this.activeTodoCount.text(todos.length);
        }

        renderTodo(todo) {
            var divView = this.todoItemTemplate.clone();
            divView.find("label").text(todo.title);
            var li = $("<li/>");
            li.append(divView);
            li.appendTo(this.todoList);
        }
    }

    var todoApp = new TodoApp($("#todoapp"));
    todoApp.init();

}