import { routes } from './app-routing.module';
import { UsersComponent } from './components/users/users.component';

describe('AppRoutingModule - [ INTEGRATION TEST CASES ]', () => {

  it('should contain a route for /users', () => {
    expect(routes).toContain({ path: 'users', component: UsersComponent });
  });

});
