import { Component } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
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
}
