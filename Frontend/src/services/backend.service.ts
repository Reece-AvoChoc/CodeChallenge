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

  getBody(): Observable<string> {
    return this.http.get(`${this.apiUrl}/api/abouttext/getoverviewbody`, {
      responseType: 'text',
    });
  }

  getHeading(): Observable<string> {
    return this.http.get(`${this.apiUrl}/api/abouttext/getoverviewheading`, {
      responseType: 'text',
    });
  }

  getMissionHeading(): Observable<string> {
    return this.http.get(`${this.apiUrl}/api/abouttext/getmissionheading`, {
      responseType: 'text',
    });
  }

  getMissionBody(): Observable<string> {
    return this.http.get(`${this.apiUrl}/api/abouttext/getmissionbody`, {
      responseType: 'text',
    });
  }

  getTeamHeading(): Observable<string> {
    return this.http.get(`${this.apiUrl}/api/abouttext/getteamheading`, {
      responseType: 'text',
    });
  }

  getTeamBody(): Observable<string> {
    return this.http.get(`${this.apiUrl}/api/abouttext/getteambody`, {
      responseType: 'text',
    });
  }
}
