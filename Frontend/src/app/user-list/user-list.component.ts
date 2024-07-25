import { Component } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { EditUserModalComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, EditUserModalComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  testUsers: User[] = [
    {
      id: 1,
      name: 'John',
      email: 'fake@email.com',
      password: 'password',
    },
    {
      id: 2,
      name: 'Jane',
      email: 'fake2@email.com',
      password: 'password',
    },
  ];

  selectedUser: User | null = null;

  openModal(user: User) {
    this.selectedUser = { ...user };
  }

  saveUser(user: User) {
    const index = this.testUsers.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.testUsers[index] = user;
    }
    this.closeModal();
  }

  closeModal() {
    this.selectedUser = null;
  }
}
