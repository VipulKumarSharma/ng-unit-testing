import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';

import { UserDetailsComponent } from './user-details.component';

/* Instead of using AppRoutingModule as imports,
   use fake Router implementation & override the functions which you are using in component
   { provide: Router, useClass: RouterStub }
*/
class RouterStub {
  navigate(params: any): any {}
}
class Test {
  private subject = new Subject();

  push(value: any): void {
    this.subject.next(value);
  }
}
class ActivatedRouteStub {
  get params(): Observable<any> {
    return of({ id: 0 });
  }
}

describe('UserDetailsComponent - [ INTEGRATION TEST CASES ]', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    });

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate the user to users page after saving', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should navigate the user to not found page when an invalid userid is passed', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });

});
