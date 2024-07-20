import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AboutModel } from '../app/pages/about/about-us.model';
import { RequestModel } from '../app/models/request.model';
import { LoginRequest } from '../app/models/login-request.model';
import { LoginResponse } from '../app/models/login-response.model';
import { UserModel } from '../app/models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = 'https://localhost:5189';
  private baseUrl = 'https://localhost:7119/api';

  $user = new BehaviorSubject<UserModel | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getWeatherForecast(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/weatherforecast`);
  }

  getAbout(): Observable<AboutModel> {
    return this.http.get<AboutModel>(`${this.baseUrl}/about`);
  }

  getImage(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/home/image`, {
      params: { name },
    });
  }

  getHomePageMessage(): Observable<string> {
    return this.http.get(`${this.baseUrl}/home`, { responseType: 'text' });
  }

  createRequest(data: RequestModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/home/get-in-touch`, data, {
      responseType: 'text',
    });
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`, {
      email: data.email,
      password: data.password,
    });
  }

  register(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/sign-up`, data, {
      responseType: 'json',
    });
  }

  setUser(user: UserModel): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
  }

  user(): Observable<UserModel | undefined> {
    return this.$user.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.deleteAll('Authorization', '/login');
    this.$user.next(undefined);
  }

  getUser(): UserModel | undefined {
    const email = localStorage.getItem('user-email');

    if (email) {
      const user: UserModel = {
        email: email,
      };

      return user;
    }

    return undefined;
  }
}
