import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VoterComponent } from './voter.component';

describe('VoterComponent - [ INTEGRATION TEST CASES ]', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        VoterComponent
      ],
      providers: [],
    });

    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
  });

  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;

    fixture.detectChanges();

    /* Return 1st element which mathes By predicate */
    const de = fixture.debugElement.query(By.css('.vote-count'));
    // fixture.debugElement.queryAll(By.css('.vote-count'));
    const el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('21');
  });

  it('should highlight upvote button if I\'ve upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highlighted']).toBeTruthy();
  });

  it('should increase total votes when upvote button is clicked', () => {
    const buttonElement = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.totalVotes).toBe(1);
  });

});
