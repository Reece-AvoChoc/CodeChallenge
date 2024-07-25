import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://api-url.com'; //TODO KUNO
  private tokenKey = 'authToken';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.tokenKey);
    this.currentUserSubject = new BehaviorSubject<any>(token);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem(this.tokenKey, user.token);
            this.currentUserSubject.next(user.token);
          }
          return user;
        })
      );
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { email, password });
  }

  editUser(newEmail: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.currentUserValue}`
    );
    return this.http.put<any>(
      `${this.apiUrl}/edit-user`,
      { newEmail, newPassword },
      { headers }
    );
  }

  deleteUser(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.currentUserValue}`
    );
    return this.http
      .delete<any>(`${this.apiUrl}/delete-user`, { headers })
      .pipe(
        map((response) => {
          this.logout();
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
