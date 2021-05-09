import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { TestService } from './services/test.service';

describe('AppComponent - [ UNIT TEST CASES ]', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let testService: TestService;
  let testServiceStub: Partial<TestService>;
  let getQuoteSpy: any;

  testServiceStub = {
    isLoggedIn: true,
    user: { name: 'Test User' },
    testQuote: 'Test Quote',
  };

  /* Configure Testing Module Asynchronously :=>
    We are telling angular to compile all the components defined here
    along with their templates & stylesheets. These files are external.
    Angular needs to access the file system as part of the compilation.
    Accessing of file system is little bit slow.
    That's why compileComponents() does this Asynchronously.

    Webpack automatically inlines all the component template & stylesheet
    in our JS bundle. HTML/CSS/JS all are in same JS file.
    So, while using Webpack we don't usually need to call compileComponents(),
    this is really unnecessary & adds extra complexity to our test setup.
  */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: FormBuilder },
        { provide: TestService, useValue: testServiceStub }
      ],
    }).compileComponents();
  });

  /* Create Instaces Synchronously */
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    testService = TestBed.inject(TestService);

    const asyncTestService = jasmine.createSpyObj('TestService', [
      'getUserInfo',
      'updateProfileData',
      'deleteProfileData',
      'getQuote',
    ]);

    getQuoteSpy = asyncTestService.getQuote.and.returnValue(of(testServiceStub.testQuote));
  });

  it('should return 0 if input is -ve', () => {
    const result = component.compute(-1);
    expect(result).toBe(0);
  });

  it('should increment if input is +ve', () => {
    const result = component.compute(5);
    expect(result).toBe(6);
  });

  it('should include the name in message', () => {
    const name = 'Vipul';
    const result = component.greet(name);
    expect(result).toContain(name);
  });

  it('should return supported currencies', () => {
    const result = component.getCurrencies();
    expect(result).toContain('INR');
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
  });

  it('should create a form with 2 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('should make name control required', () => {
    const nameControl = component.form.get('name');
    nameControl.setValue('');
    expect(nameControl.valid).toBeFalsy();
  });

  /* xit('should show quote after component initialized', () => {
    // fixture.detectChanges();
    expect(getQuoteSpy.calls.any()).toBe(false);
  }); */
});
