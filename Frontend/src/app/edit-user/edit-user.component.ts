import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/user';

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

  constructor(private userService: UserService) {}

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.userService.updateUser(this.user).subscribe(
      (updatedUser) => {
        this.save.emit(updatedUser);
        this.closeModal();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
