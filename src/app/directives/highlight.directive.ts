import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[highlight]'
})
export class HighlightDirective implements OnChanges {

  defaultColor = 'yellow';
  @Input('highlight') bgColor: string;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
