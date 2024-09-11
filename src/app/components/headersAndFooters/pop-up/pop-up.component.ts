import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  @Input() isVisible: boolean = false;
  @Input() messageTitle: string = '';
  @Input() messageBody: string = '';

  constructor(private location: Location) {

  }

  closePopup() {
    if (this.messageTitle.toLowerCase() === 'error!') {
      this.isVisible = false;
    }
    else {
      this.isVisible = false;
      this.location.back()
    }
  }
}
