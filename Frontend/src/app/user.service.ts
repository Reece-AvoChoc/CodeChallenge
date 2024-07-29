import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:5198/api/user';
  private registerUrl = `${this.userUrl}/register`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${userId}`);
  }

  registerUser(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const body = {
      Username: username,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
    };
    return this.http.post<any>(this.registerUrl, body);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, {
      Username: user.name,
      Email: user.email,
      Password: user.password,
    });
  }
}
