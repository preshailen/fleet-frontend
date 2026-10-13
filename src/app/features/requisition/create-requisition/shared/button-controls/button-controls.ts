import { Component, output } from '@angular/core';

@Component({
  selector: 'app-button-controls',
  imports: [],
  templateUrl: './button-controls.html',
  styleUrl: './button-controls.scss',
})
export class ButtonControls {
  goBack = output<any>();
  goForward = output<any>();

  previous() {
    this.goBack.emit(true);
  }
  
  next() {
    this.goForward.emit(true);
  }
}
