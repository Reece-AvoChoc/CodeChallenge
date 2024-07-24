import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = 'http://localhost:5198';

  constructor(private http: HttpClient) { }

  getBackgroundImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api/home/backgroundimage`, {
      responseType: 'blob',
    });
  }

  getAppleImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api/home/appleimage`, {
      responseType: 'blob',
    });
  }

  getWindowsImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api/home/windowsimage`, {
      responseType: 'blob',
    });
  }

  getMac(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api/home/macbook`, {
      responseType: 'blob',
    });
  }

  getLaptop(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api/home/laptop`, {
      responseType: 'blob',
    });
  }
}
