import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.css']
})
export class SpinButtonComponent {

  constructor() { }
  
  @Input()
  color: string = "primary";
  
  @Input()
  disabled: boolean = false;

  @Input()
  loading: boolean = false;

  @Input()
  raised: boolean = true;

  @Input()
  type: string = "button";

}
