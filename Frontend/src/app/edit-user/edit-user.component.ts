import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserModalComponent {
  @Input() user: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit(this.user);
    this.closeModal();
  }
}
