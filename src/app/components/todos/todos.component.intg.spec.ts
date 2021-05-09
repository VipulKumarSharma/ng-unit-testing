import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

import { TodoService } from '../../services/todo.service';
import { TodosComponent } from './todos.component';

describe('TodoComponent - [ INTEGRATION TEST CASES ]', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  /* TodoService is used in TodosComponent
     HttpClientModule is used in TodoService

     If you provide some service in providers [],
     only single instance of that service will be used
     across all components (i.e. Singleton)

     TestBed.inject(TodoService) will only return the dependencies
     which are registered at module level.

     If you add providers: [ TodoService ] in @Component decorator
     it will create a new instance of those providers.
     So, in this case TestBed.inject(TodoService) won't returnanything
  */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    });

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the server', () => {
    const items = [1, 2, 3];
    // const service = fixture.debugElement.injector.get(TodoService);
    const service = TestBed.inject(TodoService);
    spyOn(service, 'getTodos').and.returnValue(from([ items ]));

    /* When we call detectChanges, angular calls ngOnInit() */
    fixture.detectChanges();

    expect(component.todos).toBe(items);
  });

});
