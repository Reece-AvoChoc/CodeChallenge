import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-in-touch-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './get-in-touch-popup.component.html',
  styleUrl: './get-in-touch-popup.component.css',
})
export class GetInTouchPopupComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
