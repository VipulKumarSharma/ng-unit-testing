import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <p highlight='cyan'>First</p>
    <p highlight>Second</p>
  `
})
class DirectiveHostComponent { }

describe('HighlightDirective - [ INTEGRATION TEST CASES ]', () => {
  let fixture: ComponentFixture<DirectiveHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DirectiveHostComponent,
        HighlightDirective
      ]
    });

    fixture = TestBed.createComponent(DirectiveHostComponent);

    fixture.detectChanges();
  });

  it('should highlight 1st element with cyan color', () => {
    const el = fixture.debugElement.queryAll(By.css('p'))[0];
    const htmlEl: HTMLElement = el.nativeElement;

    expect(htmlEl.style.backgroundColor).toEqual('cyan');
  });

  it('should highlight 2nd element with default color', () => {
    const el = fixture.debugElement.queryAll(By.css('p'))[1];
    const htmlEl: HTMLElement = el.nativeElement;

    const directive = el.injector.get(HighlightDirective);

    expect(htmlEl.style.backgroundColor).toEqual(directive.defaultColor);
  });

});
