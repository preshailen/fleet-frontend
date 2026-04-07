import { Component, input } from '@angular/core';

@Component({
  selector: 'app-display-specifications',
  imports: [],
  templateUrl: './display-specifications.html',
  styleUrl: './display-specifications.scss',
})
export class DisplaySpecifications {
  requisition = input<any>();
}
