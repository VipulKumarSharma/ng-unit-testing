import { EMPTY, from, throwError } from 'rxjs';

import { TodoService } from 'src/app/services/todo.service';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let todoService: TodoService;
  let component: TodoComponent;

  beforeEach(() => {
    todoService = new TodoService(null);
    component = new TodoComponent(todoService);
  });

  it('should set todos property with the items returned from server', () => {
    const items = [1, 2, 3];
    // Watch & Mock getTodos() output
    spyOn(todoService, 'getTodos').and.callFake(() => {
      return from([ items ]);
    });

    // getTodos() will  be called internally
    component.ngOnInit();

    // Match the items
    expect(component.todos).toBe(items);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    const spy = spyOn(todoService, 'add').and.callFake((t) => {
      return EMPTY;
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from server', () => {
    const todo = { id: 1 };
    spyOn(todoService, 'add').and.returnValue(from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message if server returns an error when adding a new todo', () => {
    const errorMessage = 'Error from the server';
    spyOn(todoService, 'add').and.returnValue(throwError(errorMessage));

    component.add();

    expect(component.message).toBe(errorMessage);
  });

  it('should call the server to delete todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(todoService, 'delete').and.returnValue(EMPTY);

    component.delete('1');

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should NOT call the server to delete todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(todoService, 'delete').and.returnValue(EMPTY);

    component.delete('1');

    expect(spy).not.toHaveBeenCalled();
  });

});
