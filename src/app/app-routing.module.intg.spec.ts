import { routes } from './app-routing.module';
import { TodosComponent } from './components/todos/todos.component';

describe('AppRoutingModule - [ INTEGRATION TEST CASES ]', () => {

  it('should contain a route for /todos', () => {
    expect(routes).toContain({ path: 'todos', component: TodosComponent });
  });

});
