import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EMPTY, from, throwError } from 'rxjs';

import { TodoService } from '../../services/todo.service';
import { TodosComponent } from './todos.component';

describe('TodoComponent - [ UNIT TEST CASES ]', () => {
  let service: TodoService;
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService, HttpClient ]
    });

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(TodoService);
  });

  it('should set todos property with the items returned from server', () => {
    const items = [1, 2, 3];
    // Watch & Mock getTodos() output
    spyOn(service, 'getTodos').and.callFake(() => {
      return from([ items ]);
    });

    // getTodos() will  be called internally
    component.ngOnInit();

    // Match the items
    expect(component.todos).toBe(items);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    const spy = spyOn(service, 'add').and.callFake((t) => {
      return EMPTY;
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from server', () => {
    const todo = { id: 1 };
    spyOn(service, 'add').and.returnValue(from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message if server returns an error when adding a new todo', () => {
    const errorMessage = 'Error from the server';
    spyOn(service, 'add').and.returnValue(throwError(errorMessage));

    component.add();

    expect(component.message).toBe(errorMessage);
  });

  it('should call the server to delete todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete('1');

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should NOT call the server to delete todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete('1');

    expect(spy).not.toHaveBeenCalled();
  });

  it('should load todos from server asyncronously', async () => {
    const items = [1, 2, 3];
    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve(items));

    component.getTodosFromPromise();

    fixture.whenStable().then(() => {
      expect(component.todos).toBe(items);
      console.log('EXPECT WAS CALLED');
    });
  });

  it('should load todos from server linerly using fakeAsync(tick())', fakeAsync(() => {
    const items = [1, 2, 3];
    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve(items));

    component.getTodosFromPromise();

    tick();
    expect(component.todos).toBe(items);
    console.log('EXPECT WAS CALLED');
  }));

});
