import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  message: any;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe((t) => (this.todos = t));
  }

  add(): void {
    const newTodo = { title: '... ' };

    this.todoService.add(newTodo)
      .subscribe(
        (data) => this.todos.push(data),
        (err) => (this.message = err)
      );
  }

  delete(id: string): void {
    if (confirm('Are you sure?')) {
      this.todoService.delete(id)
        .subscribe();
    }
  }

  getTodosFromPromise(): void {
    this.todoService.getTodosPromise()
      .then((t) => {
        console.log('THEN WAS CALLED');
        this.todos = t;
      });
  }

}
