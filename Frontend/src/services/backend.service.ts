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
        return this.http.get(`${this.apiUrl}/api/home/backgroundImage`, {
            responseType: 'blob',
        });
    }
}
