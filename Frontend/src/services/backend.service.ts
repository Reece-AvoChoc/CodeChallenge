import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = 'http://localhost:5198';

  constructor(private http: HttpClient) {}

  getWeatherForecast(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/weatherforecast`);
  }

  getBackgroundImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/api/hometext/getbackgroundimage`, {
      responseType: 'blob',
    });
  }

  getOverviewHeading(): Observable<string> {
    return this.http.get(`${this.apiUrl}/api/hometext/getheading`, {
      responseType: 'text',
    });
  }

  getOverviewSubHeading(): Observable<string> {
    return this.http.get(`${this.apiUrl}/api/hometext/getsubheading`, {
      responseType: 'text',
    });
  }
}
