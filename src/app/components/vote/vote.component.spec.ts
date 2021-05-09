import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        VoteComponent
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
    });

    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
  });

  // AAA - Arrange Act Assert

  it('should increment total votes when up voted', () => {
    component.upVote();
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement total votes when down voted', () => {
    component.downVote();
    expect(component.totalVotes).toBe(-1);
  });

  it('should emit voteChanged event when up voted', () => {
    let totalVotes = null;
    component.voteChanged.subscribe(tv => totalVotes = tv);
    component.upVote();

    expect(totalVotes).not.toBeNull();
  });

});
