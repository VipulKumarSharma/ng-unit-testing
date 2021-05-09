import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss'],
})
export class VoterComponent {

  @Input() othersVote = 0;
  @Input() myVote = 0;

  @Output() vote = new EventEmitter();

  upVote(): void {
    if (this.myVote === 1) {
      return;
    }
    this.myVote++;

    this.vote.emit({ myVote: this.myVote });
  }

  downVote(): void {
    if (this.myVote === -1) {
      return;
    }

    this.myVote--;

    this.vote.emit({ myVote: this.myVote });
  }

  get totalVotes(): number {
    return this.othersVote + this.myVote;
  }
}
