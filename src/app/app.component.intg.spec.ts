import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

describe('AppComponent - [ INTEGRATION TEST CASES ]', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavComponent
      ],
      schemas: [
        /* (DON'T USE) Tells angular to ignore any elements which it doesn't recognize */
        // NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: FormBuilder }
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ng-unit-testing'`, () => {
    expect(component.title).toEqual('ng-unit-testing');
  });

  it('should render title', () => {
    // fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const result = compiled.querySelector('.content span').textContent;
    expect(result).toContain('ng-unit-testing app is running!');
  });

  it('should have router outlet', () => {
    const el = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(el).not.toBeNull();
  });

});
