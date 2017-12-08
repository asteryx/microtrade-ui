import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.css']
})
export class SpinButtonComponent {

  constructor() { }
  
  @Input()
  disabled: boolean = false;

  @Input()
  loading: boolean = false;

  @Input()
  type: string = "button";

  @Input()
  class: string = "btn";

}
