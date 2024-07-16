import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private apiUrl = 'https://localhost:5189';

    constructor(private http: HttpClient) { }

    getWeatherForecast(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/weatherforecast`);
    }
}
