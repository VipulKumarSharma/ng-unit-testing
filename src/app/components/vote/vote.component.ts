import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vote'
})
export class VoteComponent {

  totalVotes = 0;
  voteChanged = new EventEmitter();

  constructor() {}

  upVote(): void {
    this.totalVotes++;
    this.voteChanged.emit(this.totalVotes);
  }

  downVote(): void {
    this.totalVotes--;
  }

}
