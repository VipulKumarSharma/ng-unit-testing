import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav,[app-nav]',
  templateUrl: './nav.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
