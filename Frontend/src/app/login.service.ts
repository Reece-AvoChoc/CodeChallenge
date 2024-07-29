import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:5198/api/user/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { Email: email, Password: password };
    return this.http.post<any>(this.loginUrl, body);
  }
}
