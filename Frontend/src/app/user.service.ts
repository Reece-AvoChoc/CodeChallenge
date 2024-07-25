import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:5198/api/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`${this.userUrl}/${userId}`).subscribe(
        () => {
          this.getAllUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
