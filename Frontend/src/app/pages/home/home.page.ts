import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: []
})
export class HomePage implements OnInit {
    backgroundImageUrl: string | ArrayBuffer | null = null;

    constructor(private backendService: BackendService) { }

    ngOnInit(): void {

    }

    getBackgroundImage(): void {
        this.backendService.getBackgroundImage().subscribe(
            (imageBlob: Blob) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.backgroundImageUrl = event.target?.result ?? null;
                };
                reader.readAsDataURL(imageBlob);
            },
            (error) => {
                console.error('Failed to load background image', error);
            }
        )
    }
}
